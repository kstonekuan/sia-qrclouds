import React, { Component } from 'react';
import { View, Alert, Share, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import QRScanner from '../components/QRScanner';
import CameraOverlay from '../components/CameraOverlay';
import NavTitle from '../components/NavTitle';
import { usersDB, rewardsDB, mainBaseColor } from '../Constants';
import linkSharing from '../components/functions/linkSharing';

class ScanReward extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      docType: 'Rewards',
      displayOptions: false,
    };
  }

  componentWillMount() {
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({ location: new firebase.firestore.GeoPoint(position.coords.latitude, position.coords.longitude) });
      });
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  }

  onShare = async (type, taskID, taskTitle, taskDescription, taskLocation) => {
    try {
      await linkSharing.createSharingLink(type, taskID, taskTitle, taskDescription, taskLocation).then((url) => {
        const result = Share.share({
          title: `Title: ${taskTitle}`,
          message: Platform.OS === 'ios' ? `Description: ${taskDescription}.` : `Description: ${taskDescription}. Find out more at ${url}`,
          url: url,
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
            console.log('shared');
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
          console.log('dismissed');
        }
      });
    } catch (error) {
      console.warn(error.message);
    }
  };

  onPromptOff = (userID) => {
    usersDB.doc(userID).update({ noShareRewardPrompt: true }).then(() => {
      Alert.alert(
        'Got it',
        'You can always turn Quick Share back on in the settings.'
      );
    });
  }

  onFinishClaim = () => {
    const { rewardID, promoName, rDescription, locationName, userID } = this.props;
    Alert.alert(
      'Claim Successful!',
      'Please show this to your cashier.',
      [
        {
          text: 'Done',
          onPress: () => {
            usersDB.doc(userID).get().then((doc) => {
              if (!doc.data().noShareRewardPrompt) {
                Alert.alert(
                  'Share this reward?',
                  'Let others enjoy exclusive rewards by Outside too!',
                  [
                    { text: 'Never', onPress: () => this.onPromptOff(userID) },
                    { text: 'No', style: 'cancel' },
                    { text: 'Yes', onPress: () => this.onShare('Rewards', rewardID, promoName, rDescription, locationName) }
                  ]
                );
              }
            });
          }
        },
      ],
    );
    Actions.pop();
  }

  onQRScan = () => {
    const { location } = this.state;
    const { rewardID, dateClaimedArr, locationArr, redemptionCount, userID } = this.props;

    const redemptionsDB = rewardsDB.doc(rewardID).collection('redemptions');
    const newCount = redemptionCount + 1;
    if (!dateClaimedArr) {
      const info = {
        dateClaimed: [new Date()],
        location: [location]
      };
        // first add the dateClaimed and location regardless of the db
      redemptionsDB.doc(userID).set(info).then(() => {
        // increase the count for the snapshot for rewards
        rewardsDB.doc(rewardID).update({ redemptionCount: newCount }).then(() => {
          this.onFinishClaim();
        });
      });
    } else {
      // Add a new date to the "dateClaimed" array.
      // use arrayUnion in future after updating react-native
      dateClaimedArr.push(new Date());
      locationArr.push(location);

      redemptionsDB.doc(userID).update({
        dateClaimed: dateClaimedArr,
        location: locationArr
      }).then(() => {
        rewardsDB.doc(rewardID).update({ redemptionCount: newCount }).then(() => {
          this.onFinishClaim();
        });
      });
    }
  }

  render() {
    const { docType, location } = this.state;
    const { rewardID, redeemed } = this.props;

    return (
      <QRScanner onQRScan={this.onQRScan} qrDocID={rewardID} docType={docType} redeemed={redeemed} location={location}>
        <NavTitle title="Scan to Claim Reward" onPress={() => Actions.pop()} style={{ top: 0, left: 0, right: 0, position: 'absolute', zIndex: 5 }} titleStyles={{ color: mainBaseColor }} backArrowColor={{ color: mainBaseColor }} />
        <CameraOverlay />
      </QRScanner>
    );
  }
}

export default ScanReward;
