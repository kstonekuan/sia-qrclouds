import React, { Component } from 'react';
import { Dimensions, View, Platform, Text, } from 'react-native';
import { Scene, Drawer, Router, Actions, Modal, Tabs, Lightbox, Stack } from 'react-native-router-flux';

// Pages
import ViewReward from'./pages/ViewReward';
import ScanReward from'./pages/ScanReward';
import App from '../App'

class RouterComponent extends Component {

    render() {
      return (
        <Router gesturesEnabled={false}>
          <Stack key="root" hideNavBar>
            <Scene key="ViewReward" component={ViewReward} hideNavBar />
            <Scene key="ScanReward" component={ScanReward} hideNavBar />
            <Scene key="Home" component={App} hideNavBar />
          </Stack>
        </Router>
      );
    }
}

export default RouterComponent;
