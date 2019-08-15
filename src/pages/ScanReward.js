import React, { Component } from 'react';
import { View, Alert, Share, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import QRScanner from '../components/QRScanner';
import CameraOverlay from '../components/CameraOverlay';
import NavTitle from '../components/NavTitle';
import { usersDB, rewardsDB, mainBaseColor } from '../Constants';

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
    this.getRewardData();
  }

  getRewardData() {
    //get user rewards from database
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

  onFinishClaim = () => {
    Alert.alert(
      'Scan Successful!',
      'Please select your reward!',
    );
    Actions.pop();
    Actions.Select();
  }

  onQRScan = (scannedCode) => {
    const {location} = this.state;
    //Add claim and location to database with scannedCode

    //Continue
    this.onFinishClaim();
  }

  render() {
    const { location } = this.state;
    const { redeemed } = this.props;

    return (
      <QRScanner onQRScan={this.onQRScan} redeemed={false}>
        <NavTitle title="Scan to Claim Reward" onPress={() => Actions.pop()} style={{ top: 0, left: 0, right: 0, position: 'absolute', zIndex: 5 }} titleStyles={{ color: mainBaseColor }} backArrowColor={{ color: mainBaseColor }} />
        <CameraOverlay />
      </QRScanner>
    );
  }
}

export default ScanReward;
