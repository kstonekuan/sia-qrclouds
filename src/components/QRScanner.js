/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from 'react';
import { StyleSheet, Text, View, Linking, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Spinner } from './common';
import { usersDB, rewardsDB } from '../Constants';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Spinner fontSize="large" />
  </View>
);

class QRScanner extends Component {
  constructor(props) {
    super(props);
    this.camera = null;

    const { currentUser } = firebase.auth();
    if (currentUser) {
      this.state = {
        userID: currentUser.uid,
        camera: {
          type: RNCamera.Constants.Type.back,
          flashMode: RNCamera.Constants.FlashMode.auto,
        },
        read: false
      };
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { read } = this.state;
    if (prevState.read !== read) {
      switch (read) {
        case true:
          this.redeem();
          break;
        case -1:
          Alert.alert(
            'Wrong Reward',
            'Are you at the right store?',
            [
              { text: 'OK', onPress: () => this.setState({ read: false }) }
            ],
          );
          break;
        default:
      }
    }
  }

  onBarCodeRead(scanResult) {
    const { userID, read } = this.state;
    const { rewardID, redeemed } = this.props;

    if (redeemed) { // failsafe
      Alert.alert(
        'Already Redeemed!',
        'You have already redeemed this reward',
      );
      Actions.pop();
    } else {
      console.log('read');
      if (scanResult.data && !read) {
        if (scanResult.data.indexOf('https://outsideapp.co/Rewards/') !== -1) {
          const qrID = scanResult.data.slice(30);
          if (qrID === rewardID) {
            this.setState({ read: true });
          } else {
            this.setState({ read: -1 });
          }
        } else {
          console.log(scanResult.type);
          console.log(scanResult.data);
          this.setState({ read: -1 });
        }
      }
    }
    return null;
  }

  redeem() {
    const { userID, read } = this.state;
    const { location, rewardID, dateClaimedArr, locationArr } = this.props;

    if (read) {
      const redemptionsDB = rewardsDB.doc(rewardID).collection('redemptions');
      if (!dateClaimedArr) {
        const info = {
          dateClaimed: [new Date()],
          location: [location]
        };
        redemptionsDB.doc(userID).set(info).then(() => {
          redemptionsDB.get().then((query) => {
            let redemptionCount = 0;

            query.forEach((doc) => {
              redemptionCount += doc.data().dateClaimed.length;
            });

            rewardsDB.doc(rewardID).update({ redemptionCount: redemptionCount }).then(() => {
              Alert.alert(
                'Claim Successful!',
                'Please show this to your cashier.',
              );
              Actions.pop();
            });
          });
        });
      } else {
        // Add a new date to the "dateClaimed" array.
        dateClaimedArr.push(new Date());
        locationArr.push(location);

        redemptionsDB.doc(userID).update({
          dateClaimed: dateClaimedArr,
          location: locationArr
        }).then(() => {
          redemptionsDB.get().then((query) => {
            let redemptionCount = 0;

            query.forEach((doc) => {
              redemptionCount += doc.data().dateClaimed.length;
            });

            rewardsDB.doc(rewardID).update({ redemptionCount: redemptionCount }).then(() => {
              Alert.alert(
                'Claim Successful!',
                'Please show this to your cashier.',
              );
              Actions.pop();
            });
          });
        });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          defaultTouchToFocus
          mirrorImage={false}
          style={styles.preview}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
          onBarCodeRead={this.state.read ? null : this.onBarCodeRead.bind(this)}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        >
          {({ status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={styles.overlay}>
                {this.props.children}
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default QRScanner;
