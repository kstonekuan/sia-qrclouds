import React, { Component } from 'react';
import { Animated, FlatList, View, Text, StyleSheet, Platform, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import Switch from 'react-native-switch-pro';

// Local Imports
import { Actions } from 'react-native-router-flux';
import { usersDB, mainColor, fontSize, padding, grey, mainBaseColor, lightGrey, midGrey } from '../Constants';
import { TextStyle } from '../StyleSheet';
import PageFrame from '../components/PageFrame';
import NavTitle from '../components/NavTitle';
import ModalCard from '../components/common/ModalCard';
import { FilledButton } from './buttons/Button';

const { height, width } = Dimensions.get('window');
class LocationSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: null,
      purpose: null
    };
  }

  renderLocationSelector() {
    <View style={[styles.categoryItem, containerPadding, { marginBottom: padding.L }]}>
      <Text style={[TextStyle.Regular, { fontSize: fontSize.ML }]}>Where were you visiting when you saw this QR code?</Text>
      <Picker
        selectedValue={this.state.location}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ location: itemValue })
        }>
        <Picker.Item label="Chanel" value="chanel" />
        <Picker.Item label="Burger King" value="bk" />
        <Picker.Item label="Camera Shop" value="camera" />
        <Picker.Item label="Others" value="others" />
      </Picker>
    </View>
  }

  renderPurposeSelector(){
    <View style={[styles.categoryItem, containerPadding, { marginBottom: padding.L }]}>
      <Text style={[TextStyle.Regular, { fontSize: fontSize.ML }]}>What as your purpose of visit?</Text>
      <Picker
        selectedValue={this.state.purpose}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ purpose: itemValue })
        }>
        <Picker.Item label="Shopping" value="shopping" />
        <Picker.Item label="Eating" value="eating" />
        <Picker.Item label="Browsing" value="browsing" />
        <Picker.Item label="Others" value="others" />
      </Picker>

    </View>
  }

  onSubmit = () => {
    //Add answers to database

    Alert.alert(
      'Thank you!',
      'You may now continue using the app.',
      [
        {
          text: 'Done',
          onPress: () => {
            Actions.Home();
          }
        },
      ],
    );
    Actions.pop();
  }

  render() {
    return (
      <PageFrame style={{ backgroundColor: mainBaseColor }}>
        <NavTitle title="Survey" onPress={() => Actions.pop()} />
        <Text>Please answer a few questions so we may serve you better</Text>
        {this.renderLocationSelector()}
        {this.renderPurposeSelector()}
        <FilledButton color={mainColor} text="Submit" onPress={() => this.onSubmit()} />
      </PageFrame>
    );
  }
}

const buttonSize = 60;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: lightGrey,
    paddingBottom: 5,

  },
  categoryText: {
    paddingBottom: padding.M,
  },
  categoryItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'baseline',
    backgroundColor: mainBaseColor,
  },
  categoryIcon: {
    height: fontSize.M,
    width: fontSize.M,
    backgroundColor: grey,
    marginRight: 5,
  },
  checkBox: {
    height: fontSize.S,
    width: fontSize.S,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: grey,
    marginLeft: 'auto',
  },
  squareTextStyle: {
    ...TextStyle.Regular,
    fontSize: fontSize.S,
    textAlign: 'center',
    color: grey,
  },
  containerPadding: {
    paddingHorizontal: padding.M,
    marginBottom: padding.M,
  },
});

const { containerPadding } = styles;

export default LocationSurvey;
