/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { mainColor, grey, fontSize, padding, mainBaseColor, lightGrey, black } from './src/Constants';

type Props = {};
export default class App extends Component<Props> {
  renderClaim() {
    return (
      <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
        <FilledButton color={mainColor} text="Scan QR" onPress={() => Actions.ScanReward()} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to KrisFlyer QR Surprise!</Text>
        <Text style={styles.instructions}>Made by Kingston Kuan</Text>
        <Text style={styles.instructions}>Click the button below to begin.</Text>
        {this.renderClaim()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
