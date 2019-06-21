import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import QRScanner from '../components/QRScanner';
import CameraOverlay from '../components/CameraOverlay';
import NavTitle from '../components/NavTitle';

class ScanReward extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null
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

  render() {
    const { location } = this.state;
    const { rewardID, redeemed, dateClaimedArr, locationArr } = this.props;

    return (
      <QRScanner location={location} rewardID={rewardID} redeemed={redeemed} dateClaimedArr={dateClaimedArr} locationArr={locationArr}>
        <NavTitle title="Scan to Claim Reward" onPress={() => Actions.pop()} style={{ top: 0, left: 0, right: 0, position: 'absolute', zIndex: 5 }} titleStyles={{ color: '#fff' }} backArrowColor={{ color: '#fff' }} />
        <CameraOverlay />
      </QRScanner>
    );
  }
}

export default ScanReward;
