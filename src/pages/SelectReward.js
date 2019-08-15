import React, { Component } from 'react';
import { Alert, Animated, FlatList, View, Text, StyleSheet, Platform, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';

// Local Imports
import { Actions } from 'react-native-router-flux';
import { usersDB, mainColor, fontSize, padding, grey, mainBaseColor, lightGrey, midGrey } from '../Constants';
import { TextStyle } from '../StyleSheet';
import PageFrame from '../components/PageFrame';
import NavTitle from '../components/NavTitle';
import ModalCard from '../components/common/ModalCard';
import { FilledButton } from '../components/buttons/Button';

const { height, width } = Dimensions.get('window');
class SelectReward extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noShareRewardPrompt: this.props.noShareRewardPrompt,
      noShareTaskPrompt: this.props.noShareTaskPrompt,
    };
  }

  onSelect = () => {
    const { rewardID, promoName, rDescription, locationName, userID } = this.props;
    //Add selection to database

    Alert.alert(
      'Reward Selected!',
      'You can now find it under my rewards.',
      [
        {
          text: 'Done',
          onPress: () => {
            Actions.pop();
            Actions.LocationSurvey();
          }
        },
      ],
    );
  }

  render() {
    return (
      <PageFrame style={{ backgroundColor: mainBaseColor }}>
        <NavTitle title="Select Reward" onPress={() => Actions.pop()} />
        <View style={{ flexDirection: 'row', paddingTop: 3*padding.L }}>
          <View style={{ padding: padding.M }} />
          <ScrollView horizontal style={{ flex: 1 }}>
            <ModalCard style={[styles.categoryItem, containerPadding, { marginBottom: padding.L }]}>
              <Text style={[TextStyle.Regular, { fontSize: fontSize.ML, padding: padding.L }]}>Choice 1</Text>
              <Text style={[TextStyle.Regular, { fontSize: fontSize.M, padding: padding.L }]}>50% off T-shirt and shorts</Text>
              <FilledButton style={{ margin: padding.L }} color={mainColor} text="Select" onPress={() => this.onSelect()} />
            </ModalCard>
            <ModalCard style={[styles.categoryItem, containerPadding, { marginBottom: padding.L }]}>
              <Text style={[TextStyle.Regular, { fontSize: fontSize.ML, padding: padding.L }]}>Choice 2</Text>
              <Text style={[TextStyle.Regular, { fontSize: fontSize.M, padding: padding.L }]}>Free lotion with purchase of bag</Text>
              <FilledButton style={{ margin: padding.L }} color={mainColor} text="Select" onPress={() => this.onSelect()} />
            </ModalCard>
            <ModalCard style={[styles.categoryItem, containerPadding, { marginBottom: padding.L }]}>
              <Text style={[TextStyle.Regular, { fontSize: fontSize.ML, padding: padding.L }]}>Choice 3</Text>
              <Text style={[TextStyle.Regular, { fontSize: fontSize.M, padding: padding.L }]}>Buy 2 socks get one free</Text>
              <FilledButton style={{ margin: padding.L }} color={mainColor} text="Select" onPress={() => this.onSelect()} />
            </ModalCard>
          </ScrollView>
          <View style={{ padding: padding.M }} />
        </View>
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

export default SelectReward;
