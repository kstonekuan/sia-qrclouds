import React, { Component } from 'react';
import { Dimensions, View, Platform, Text, } from 'react-native';
import { Scene, Drawer, Router, Actions, Modal, Tabs, Lightbox, Stack } from 'react-native-router-flux';

// Pages
import ScanReward from './pages/ScanReward';
import SelectReward from './pages/SelectReward';
import RewardsManager from './pages/RewardsManager';
import LocationSurvey from './pages/LocationSurvey';
import Landing from './pages/Landing'

const RouterComponent = () => {
  return (
    <Router gesturesEnabled={false}>
      <Scene key="root" hideNavBar>
        <Scene key="Home" component={Landing} initial hideNavBar />
        <Scene key="SelectReward" component={SelectReward} hideNavBar />
        <Scene key="ScanReward" component={ScanReward} hideNavBar />
        <Scene key="RewardsManager" component={RewardsManager} hideNavBar />
        <Scene key="LocationSurvey" component={LocationSurvey} hideNavBar />
      </Scene>
    </Router>
  );
}

export default RouterComponent;
