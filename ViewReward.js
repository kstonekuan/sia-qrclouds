import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import { Spinner } from '../components/common';
import { isClaimedToday, isClaimedThisWeek } from '../components/functions/rewardChecks';

import RewardInfo from '../components/RewardInfo';
import { usersDB, rewardsDB } from '../Constants';

class ViewReward extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth();
    if (currentUser) {
      this.state = {
        userID: currentUser.uid,
        redeemed: false,
        dateClaimedArr: null,
        locationArr: null,
        dateLastClaimed: null,
        scraped: false,
        verified: true
      };
    }
  }

  componentDidMount() {
    const { rewardID } = this.props;
    this.getRewardData(rewardID);
  }

  componentWillUnmount() {
    this.rewardSnapshot();
  }

  getRewardData(rewardID) {
    const { userID } = this.state;
    this.rewardSnapshot = rewardsDB.doc(rewardID).onSnapshot((reward) => {
      const state = reward.data();

      rewardsDB.doc(rewardID).collection('redemptions').doc(userID).get()
        .then((doc) => {
          if (doc.exists) {
            const dateClaimedArr = doc.data().dateClaimed;
            const lastEntry = dateClaimedArr.length - 1;
            const dateLast = dateClaimedArr[lastEntry];
            switch (state.rewardType) {
              case 'daily':
                if (isClaimedToday(dateLast)) {
                  state.redeemed = true;
                  state.dateLastClaimed = dateLast;
                } else {
                  state.dateClaimedArr = dateClaimedArr;
                  state.locationArr = doc.data().location;
                }
                break;

              case 'weekly':
                if (isClaimedThisWeek(dateLast, state.resetDayOfTheWeek)) {
                  state.redeemed = true;
                  state.dateLastClaimed = dateLast;
                } else {
                  state.dateClaimedArr = dateClaimedArr;
                  state.locationArr = doc.data().location;
                }
                break;

              default: // for one time rewards
                state.redeemed = true;
                state.dateLastClaimed = dateLast;
            }
            this.setState(state);
          }
        })
        .catch((err) => {
          console.log('Error getting document', err);
        });
    });
  }

  render() {
    const { resetDayOfTheWeek, rewardType, expiryDate, locationName, merchantName, promoName, rDescription, attachments, redeemed, dateClaimedArr, dateLastClaimed, locationArr, scraped } = this.state;
    const { rewardID } = this.props;

    return (
      <RewardInfo
        resetDayOfTheWeek={resetDayOfTheWeek}
        rewardType={rewardType}
        expiryDate={expiryDate}
        locationName={locationName}
        merchantName={merchantName}
        promoName={promoName}
        rDescription={rDescription}
        attachments={attachments}
        redeemed={redeemed}
        dateClaimedArr={dateClaimedArr}
        dateLastClaimed={dateLastClaimed}
        rewardID={rewardID}
        locationArr={locationArr}
        scraped={scraped}
      />
    );
  }
}

export default ViewReward;
