import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Dimensions
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImageAttachmentView from './ImageAttachmentView';
import CustomIcon from './common/CustomIcon';
import IconText from './common/IconText';
import CategoryIcon from './CategoryIcon';
import StaticMap from './StaticMapImage';
import NavTitle from './NavTitle';
import FilledButton from './buttons/FilledButton';
import { getSimpleDateTime, getSimpleRelativeTime, getMidnight, getDayCountdown } from './functions/getRelativeTime';
import { getComingDayOfTheWeek } from './functions/rewardChecks';

const detailWidth = Dimensions.get('screen').width / 4 - 10;

class RewardInfo extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth();
    if (currentUser) {
      this.state = {
        userID: currentUser.uid,
      };
    }
  }

  renderHeaderImage() {
    const { attachments } = this.props;

    return (
      <View style={styles.mapImage}>
        <Image style={{ flex: 1 }} source={{ uri: attachments }} />
      </View>
    );
  }


  renderRewardLocation() {
    const { locationName } = this.props;
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }]}>
        <CustomIcon name="loc-ic" color={grey} style={styles.locIconStyle} />
        <Text style={styles.locText}>{locationName}</Text>
      </View>
    );
  }

  renderMerchantDetails() {
    const { merchantName } = this.props;
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 }]}>
        <Text style={styles.merchantName}>{merchantName}</Text>
      </View>
    );
  }

  renderRewardDescription() {
    const { rDescription } = this.props;
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }]}>
        <Text style={styles.descriptionStyle}>{rDescription}</Text>
      </View>
    );
  }

  renderClaim() {
    const { redeemed, rewardID, dateClaimedArr, locationArr, scraped } = this.props;
    if (!redeemed && !scraped) {
      return (
        <View style={{ paddingBottom: 20, backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 20 }}>
          <FilledButton addStyles={{ flex: 1 }} color="#00a99d" text="Scan To Claim" onPress={() => Actions.ScanReward({ rewardID: rewardID, dateClaimedArr: dateClaimedArr, locationArr: locationArr })} />
        </View>
      );
    }
    return null;
  }

  renderRedeemed() {
    const { redeemed, dateLastClaimed, scraped } = this.props;
    if (redeemed && !scraped) {
      return (
        <View style={{ paddingBottom: 20, backgroundColor: 'white', alignItems: 'center', paddingHorizontal: 20 }}>
          <CustomIcon name="completed-ic" color={green} style={styles.redeemedIconStyle} />
          <Text style={styles.redeemedStyle}>Claimed on:</Text>
          <Text style={[styles.redeemedStyle, { color: green, fontSize: fontSize * 1.5 }]}>{getSimpleDateTime(dateLastClaimed)}</Text>
        </View>
      );
    }
    return null;
  }

  renderExpiry() {
    const { expiryDate } = this.props;

    if (expiryDate) {
      const expiryDateObj = new Date(expiryDate);
      return (
        <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }]}>
          <CustomIcon name="pendingstart-ic" color={grey} style={styles.locIconStyle} />
          <Text style={styles.locText}>
            Ending in
            {' '}
            {getDayCountdown(expiryDateObj)}
          </Text>
        </View>
      );
    }
    return null;
  }

  renderReset() {
    const { resetDayOfTheWeek, rewardType, redeemed, scraped, expiryDate } = this.props;

    if (redeemed && !scraped && expiryDate) {
      const expiryDateObj = new Date(expiryDate);
      let nextDate;

      switch (rewardType) {
        case 'daily':
          nextDate = getMidnight();
          nextDate.setDate(nextDate.getDate() + 1);
          break;
        case 'weekly':
          nextDate = getComingDayOfTheWeek(resetDayOfTheWeek);
          break;
        default:
          nextDate = expiryDateObj;
      }

      if (expiryDateObj > nextDate) {
        return (
          <View style={{ alignItems: 'center', marginBottom: 5 }}>
            <Text style={[styles.descriptionStyle, { textAlign: 'center' }]}>
              Next claim in
              {' '}
              {getDayCountdown(nextDate)}
            </Text>
          </View>
        );
      }
    }
    return null;
  }

  render() {
    const { promoName } = this.props;

    return (
      <View style={{ backgroundColor: 'white', flex: 1, }}>
        {/* header section */}
        <NavTitle onPress={() => Actions.pop()} style={{ top: 0, left: 0, right: 0, position: 'absolute', zIndex: 5 }} />
        {this.renderHeaderImage()}

        {/* Detail Section */}
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* Reward Title */}
          <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }]}>
            <Text style={styles.taskTitleText}>{promoName}</Text>
          </View>

          {/* Reward Location */}
          {this.renderRewardLocation()}

          {this.renderExpiry()}

          <View style={[{ flexDirection: 'row', alignItems: 'flex-start', paddingBottom: 15 }]}>

            {/* Merchant Detail */}
            {this.renderMerchantDetails()}

          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
            <Text style={[textStyle, { color: '#00a99d' }]}>Reward Description</Text>
            <View style={{ height: 1, backgroundColor: '#b0bec5', alignSelf: 'center', marginHorizontal: 10, flex: 1 }} />
          </View>

          {this.renderRewardDescription()}

          <View style={{ alignItems: 'center', paddingBottom: 5 }}>
            {this.renderRedeemed()}
            {this.renderReset()}
          </View>

        </View>

        {/* Button section */}
        {this.renderClaim()}
      </View>
    );
  }
}

const fontSize = 20;
const fontSizeC = fontSize * 0.8;
const fontSizeH = fontSize * 1.2;
const green = '#00a99d';
const grey = '#546e7a';
const fontFamily = Platform.OS === 'ios' ? 'system font' : 'sans-serif-light';

const styles = {
  userPicStyle: {
    height: fontSizeC * 2,
    width: fontSizeC * 2,
    marginBottom: 5,
  },
  iconStyle: {
    fontSize: fontSizeC * 2,
    marginBottom: 5,
  },
  locIconStyle: {
    fontSize: fontSize,
    marginRight: 5,
  },
  redeemedIconStyle: {
    fontSize: fontSize * 4,
    marginTop: 10,
    marginBottom: 5
  },
  detailItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: detailWidth,
  },
  // Text Styles
  detailText: {
    fontFamily: fontFamily,
    fontWeight: '300',
    fontSize: fontSizeC,
    color: grey,
    textAlign: 'center',
  },
  locText: {
    fontFamily: fontFamily,
    fontWeight: '100',
    fontSize: fontSize,
    color: grey,
  },
  textStyle: {
    fontFamily: fontFamily,
    fontWeight: '300',
    fontSize: fontSize,
    color: grey,
  },
  taskTitleText: {
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: green,
  },
  titleStyle: {
    color: '#37474f',
    fontSize: fontSize * 1.4,
  },
  marginBottom: { marginBottom: 5 },
  // descriptionStyle: {
  //   fontSize: fontSize * 1.1,
  //   color: '#546e7a',
  // },
  userPic: {
    height: fontSize,
    width: fontSize,
    // backgroundColor: 'grey',
    borderRadius: fontSize / 2,
    marginRight: 5,
  },
  mapImage: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    marginBottom: 10,
  },
  merchantName: {
    color: grey,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontStyle: 'italic',
    alignSelf: 'flex-start',
    paddingRight: 7.5,
  },
  descriptionStyle: {
    fontWeight: '100',
    color: grey,
    fontSize: fontSize * 0.8,
    fontFamily: fontFamily,
  },
  redeemedStyle: {
    color: grey,
    fontSize: fontSize,
    fontFamily: fontFamily,
    textAlign: 'center',
  }
};

const { textStyle, marginBottom, iconStyle, descriptionStyle, detailItem, detailText, userPicStyle } = styles;

export default RewardInfo;
