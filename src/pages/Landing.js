/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { mainColor, grey, fontSize, padding, mainBaseColor, lightGrey, black } from '../Constants';
import { Actions } from 'react-native-router-flux';
import { FilledButton } from '../components/buttons/Button';

export default class Landing extends Component {
  renderClaim() {
    return (
      <View style={{ paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
        <FilledButton color={mainColor} text="Scan QR" onPress={() => Actions.ScanReward()} />
      </View>
    );
  }

  renderRewards() {
    return (
      <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
        <FilledButton color={mainColor} text="My Rewards" onPress={() => Actions.RewardsManager()} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to KrisShop QR Clouds!</Text>
        <Text style={styles.instructions}>Made by Kingston Kuan</Text>
        <Text style={styles.instructions}>Click the button below to begin.</Text>
        {this.renderClaim()}
        {this.renderRewards()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
