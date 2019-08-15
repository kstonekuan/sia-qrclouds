import React, { Component } from 'react';
import { Animated, FlatList, View, Text, StyleSheet, Platform, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
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
class RewardsManager extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  componentWillMount() {
    this.getRewardData();
  }

  getRewardData() {
    //get user rewards from database
  }

  render() {
    return (
      <PageFrame style={{ backgroundColor: mainBaseColor }}>
        <NavTitle title="My Rewards" onPress={() => Actions.pop()} />
        <ScrollView>
          <ModalCard style={[styles.categoryItem, containerPadding, { marginBottom: padding.L }]}>
            <Text style={[TextStyle.Regular, { fontSize: fontSize.ML }]}>Choice 1</Text>
          </ModalCard>
        </ScrollView>
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

export default RewardsManager;
