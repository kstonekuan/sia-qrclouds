import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Spinner } from '../components/common';
import { isClaimedToday, isClaimedThisWeek } from '../components/functions/rewardChecks';

import RewardInfo from '../components/RewardInfo';
import { usersDB, rewardsDB } from '../Constants';

class ViewReward extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth();
    if (currentUser) {
      this.state = {
        userID: currentUser.uid,
        redeemed: false,
        dateClaimedArr: null,
        locationArr: null,
        dateLastClaimed: null,
        scraped: false,
        verified: true
      };
    }
  }

  componentDidMount() {
    const { rewardID } = this.props;
    this.getRewardData(rewardID);
  }

  componentWillUnmount() {
    this.rewardSnapshot();
  }

  getRewardData(rewardID) {
    const { userID } = this.state;

    if (!rewardID) {
      alert('Reward no longer available');
      Actions.main();
    } else {
      this.rewardSnapshot = rewardsDB.doc(rewardID).onSnapshot((reward) => {
        const rewardData = reward.data();
        const stateUpdate = rewardData;
        stateUpdate.markers = [
          {
            startLatLng: {
              latitude: rewardData.coordinates.latitude,
              longitude: rewardData.coordinates.longitude
            },
            type: 'start',
            category: 'reward'
          },
          {
            endLatLng: {
              latitude: rewardData.endCoordinates ? rewardData.endCoordinates.latitude : 0,
              longitude: rewardData.endCoordinates ? rewardData.endCoordinates.longitude : 0
            },
            type: 'end',
            category: 'reward'
          }
        ];
        console.log(stateUpdate);

        rewardsDB.doc(rewardID).collection('redemptions').doc(userID).get()
          .then((doc) => {
            if (doc.exists) {
              const dateClaimedArr = doc.data().dateClaimed;
              const lastEntry = dateClaimedArr.length - 1;
              const dateLast = dateClaimedArr[lastEntry];
              switch (stateUpdate.rewardType) {
                case 'daily':
                  if (isClaimedToday(dateLast)) {
                    stateUpdate.redeemed = true;
                    stateUpdate.dateLastClaimed = dateLast;
                  } else {
                    stateUpdate.dateClaimedArr = dateClaimedArr;
                    stateUpdate.locationArr = doc.data().location;
                  }
                  break;

                case 'weekly':
                  if (isClaimedThisWeek(dateLast, stateUpdate.resetDayOfTheWeek)) {
                    stateUpdate.redeemed = true;
                    stateUpdate.dateLastClaimed = dateLast;
                  } else {
                    stateUpdate.dateClaimedArr = dateClaimedArr;
                    stateUpdate.locationArr = doc.data().location;
                  }
                  break;

                default: // for one time rewards
                  stateUpdate.redeemed = true;
                  stateUpdate.dateLastClaimed = dateLast;
              }
            }
            console.log(stateUpdate);
            this.setState(stateUpdate);
          })
          .catch((err) => {
            console.log('Error getting document', err);
          });
      });
    }
  }

  render() {
    const { redemptionCount, resetDayOfTheWeek, rewardType, expiryDate, locationName, merchantName, promoName, rDescription, attachments, redeemed, dateClaimedArr, dateLastClaimed, locationArr, scraped, markers } = this.state;
    const { rewardID } = this.props;
    return (
      <RewardInfo
        redemptionCount={redemptionCount}
        resetDayOfTheWeek={resetDayOfTheWeek}
        rewardType={rewardType}
        expiryDate={expiryDate}
        locationName={locationName}
        merchantName={merchantName}
        promoName={promoName}
        rDescription={rDescription}
        attachments={attachments}
        redeemed={redeemed}
        dateClaimedArr={dateClaimedArr}
        dateLastClaimed={dateLastClaimed}
        rewardID={rewardID}
        locationArr={locationArr}
        scraped={scraped}
        markers={markers}
      />
    );
  }
}

export default ViewReward;
