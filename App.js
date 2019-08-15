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
import { Actions } from 'react-native-router-flux';
import { FilledButton } from './src/components/buttons/Button';
import Router from './src/Router';

type Props = {};
export default class App extends Component<Props> {

  render() {
    return (
      <Router/>
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
