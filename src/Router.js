import React, { Component } from 'react';
import { Dimensions, View, Platform, Text, } from 'react-native';
import { Scene, Drawer, Router, Actions, Modal, Tabs, Lightbox } from 'react-native-router-flux';

// Pages
import SplashPage from './pages/Splash';
import PostNewTask from './pages/PostNew';
import Login from './pages/Login';
import AvailableTask from './pages/AvailableTask';
import UserProfile from './pages/UserProfile';
import EditProfile from './pages/EditProfile';
import OtherUserProfile from './pages/OtherUserProfile';
import TaskManager from './pages/TaskManager';
import Registration from './pages/Registration';
import ViewTask from './pages/ViewTask';
import CompletedViewChat from './pages/CompletedViewChat';
import Notification from './pages/Notifications';
import PhoneVerification from './pages/PhoneVerification';
import Wallet from './pages/Wallet';
import Landing from './pages/Landing';
import ImageViewer from './pages/ImageViewer';
import TransactionHistory from './pages/TransactionHistory';
import Settings from './pages/Settings';
import EditAccount from './pages/EditAccount';
import paymentProcessing from './pages/paymentProcessing';
import EditTask from './pages/EditTask';
import RepostTask from './pages/RepostTask';
import Authentication from './pages/Authentication';
import ListingPage from './pages/listingPage';
import ListingForm from './pages/ListingForm';
import FullListView from './pages/FullListView';
import LogOut from './pages/LogOut';
import ViewReward from'./pages/ViewReward';
import ScanReward from'./pages/ScanReward';
import ViewGame from './pages/ViewGame';
// import NavigationPage from './pages/NavigationPage';

// Components
import OverlayMenu from './components/OverlayMenu';
import ConfirmLogout from './components/modals/ConfirmLogout';
import TaskAlertPanel from './components/TaskAlertPanel';
import TabBar from './components/TabBar';

import OneMapSandbox from './OneMapSandbox';
import Styles from './Styles';
import DOTest from './OCBC_DBS_test';


class RouterComponent extends Component {
    postNewTask=(verified) => {
      if (verified) {
        Actions.PostNewTask();
      } else {
        Alert.alert(
          'You must be verified to proceed',
          'Continue to verification?',
          [
            { text: 'CANCEL', style: 'cancel' },
            { text: 'OK', onPress: () => Actions.PhoneVerification() }
          ],
        );
      }
    }

    render() {
      return (
        <Router gesturesEnabled={false}>
          <Scene key="root" hideNavBar>
            <Scene key="auth">
              <Scene key="Splash" component={SplashPage} hideNavBar />
              <Scene key="Login" component={Login} hideNavBar />
              <Scene key="Registration" component={Registration} hideNavBar />
              <Scene key="Authentication" component={Authentication} hideNavBar />
            </Scene>
            <Modal key="main">
              <Scene key="LandingDrawer" hideNavBar>

                <Scene key="tabNav" tabs tabBarComponent={TabBar} hideNavBar showLabel={false} activeTintColor={green} tabBarPosition>
                  <Tabs tabBarOnPress={() => Actions.UserProfile()} key="UserProfile" component={UserProfile} hideNavBar />
                  <Tabs key="TaskManager" component={TaskManager} hideNavBar />
                  <Tabs key="Home" component={Landing} initial hideNavBar />
                  <Tabs key="Notifications" component={Notification} hideNavBar />
                  <Tabs key="LogOut" component={LogOut} hideNavBar />
                  <Tabs key="TaskAlertPanel" component={TaskAlertPanel} hideNavBar />
                  <Tabs hideTabBar key="PostNewTask" component={PostNewTask} hideNavBar tabBarOnPress={() => this.postNewTask(this.props.verified)} />
                  <Scene key="AvailableTask" component={AvailableTask} hideNavBar />
                </Scene>

              </Scene>
              <Scene key="ConfirmLogout" component={ConfirmLogout} hideNavBar />
            </Modal>
            <Scene key="Wallet" component={Wallet} hideNavBar />
            <Scene key="RepostTask" component={RepostTask} hideNavBar />
            <Scene key="EditTask" component={EditTask} hideNavBar />
            <Scene key="PhoneVerification" component={PhoneVerification} hideNavBar />
            <Scene key="TransactionHistory" component={TransactionHistory} hideNavBar />
            <Scene key="EditProfile" component={EditProfile} hideNavBar />
            <Scene key="EditAccount" component={EditAccount} hideNavBar />
            <Scene key="ViewTask" component={ViewTask} hideNavBar />
            <Scene key="CompletedViewChat" component={CompletedViewChat} hideNavBar />
            <Scene key="ImageViewer" component={ImageViewer} hideNavBar />
            <Scene key="paymentProcessing" component={paymentProcessing} hideNavBar />
            <Scene key="ListingForm" component={ListingForm} hideNavBar />
            <Scene key="FullListView" component={FullListView} hideNavBar />
            <Scene key="OtherUserProfile" component={OtherUserProfile} hideNavBar />
            <Scene key="ViewReward" component={ViewReward} hideNavBar />
            <Scene key="ScanReward" component={ScanReward} hideNavBar />
            <Scene key="ViewGame" component={ViewGame} hideNavBar />
          </Scene>
        </Router>
      );
    }
}


const fontSize = 20;
const iconSize = 24;
const fontSizeC = fontSize * 0.8;
const fontSizeH = fontSize * 1.2;
const green = '#00a99d';
const grey = '#546e7a';

const styles = {
  postNewTaskBackground: {
    height: fontSizeC * 3.5,
    width: fontSizeC * 3.5,
    borderRadius: fontSizeC * 3.5 / 2,
    backgroundColor: green,
    alignItems: 'center',
    justifyContent: 'center',
  },
};


const { tabBarStyle, } = styles;

export default RouterComponent;
