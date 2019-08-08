import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ImageAttachmentView from './ImageAttachmentView';
import CustomIcon from './common/CustomIcon';
import StaticMap from './StaticMapImage';
import NavTitle from './NavTitle';
import { getSimpleDateTime, getMidnight, getDayCountdown } from './functions/getRelativeTime';
import { getComingDayOfTheWeek } from './functions/rewardChecks';
import { FilledButton } from './buttons/Button';
import { mainColor, grey, fontSize, padding, mainBaseColor, lightGrey, black } from '../Constants';
import { TextStyle, headerText } from '../StyleSheet';
import ShareSocial from './ShareSocial';

const detailWidth = Dimensions.get('screen').width / 4 - 10;

class RewardInfo extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth();
    if (currentUser) {
      this.state = {
        userID: currentUser.uid,
        attachments: this.props.attachments ? this.props.attachments : [null, null, null],
        displayOptions: false
      };
    }
  }

  renderMapImage() {
    const { endTaskLocation, expand, markers } = this.props;
    if (markers) {
      return (
        <View style={styles.mapImage}>
          <StaticMap
            expand={expand}
            marker={markers}
            taskLocation={this.props.locationName}
            endTaskLocation={endTaskLocation || ''}
            latitude={markers[0].startLatLng.latitude}
            longitude={markers[0].startLatLng.longitude}
          />
        </View>
      );
    }
  }

  renderAttachments() {
    const { attachments } = this.props;
    if (attachments) {
      return (
        <View style={{ flexDirection: 'row', marginBottom: padding.S }}>
          {
            attachments.map((path, index) => (
              path ? (
                <ImageAttachmentView
                  key={index}
                  image={path}
                />
              ) : null
            ))
        }
        </View>
      );
    }
    return null;
  }

  renderRewardLocation() {
    const { locationName } = this.props;
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: padding.M }]}>
        <CustomIcon name="loc-ic" color={grey} style={styles.locIconStyle} />
        <Text style={[TextStyle.Regular]}>{locationName}</Text>
      </View>
    );
  }

  renderMerchantDetails() {
    const { merchantName } = this.props;
    return (
      <View style={styles.detailItem}>
        <CustomIcon name="store-ic" color={grey} style={styles.iconStyle} />
        <Text style={styles.detailText}>{merchantName}</Text>
      </View>
    );
  }

  renderRewardDescription() {
    const { rDescription } = this.props;
    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: padding.M }]}>
        <Text style={[styles.descriptionStyle]}>{rDescription}</Text>
      </View>
    );
  }

  renderClaim() {
    const { redeemed, rewardID, dateClaimedArr, locationArr, scraped, redemptionCount, locationName, rDescription, promoName } = this.props;
    const { userID } = this.state;
    if (!redeemed && !scraped) {
      return (
        <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
          <FilledButton color={mainColor} text="Scan to Claim" onPress={() => Actions.ScanReward({ rewardID: rewardID, dateClaimedArr: dateClaimedArr, locationArr: locationArr, redeemed: redeemed, redemptionCount: redemptionCount, userID: userID, locationName: locationName, rDescription: rDescription, promoName: promoName })} />
        </View>
      );
    }
    return null;
  }

  renderRedeemed() {
    const { redeemed, dateLastClaimed, scraped } = this.props;
    if (redeemed && !scraped) {
      return (
        <View style={{ paddingBottom: padding.S, alignItems: 'center', paddingHorizontal: padding.M }}>
          <CustomIcon name="completed-ic" color={mainColor} style={styles.redeemedIconStyle} />
          <Text style={[TextStyle.Regular, styles.redeemedStyle]}>Claimed on:</Text>
          <Text style={[TextStyle.Regular, styles.redeemedStyle, { color: mainColor, fontSize: fontSize.XL }]}>{getSimpleDateTime(dateLastClaimed)}</Text>
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
        <View style={styles.detailItem}>
          <CustomIcon name="pendingstart-ic" color={grey} style={styles.iconStyle} />
          <Text style={styles.detailText}>
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
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Text style={[TextStyle.Regular, styles.descriptionStyle, { textAlign: 'center' }]}>
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

  toggleOptionsMenu = () => {
    const displayOptions = !this.state.displayOptions;
    this.setState({ displayOptions });
  }

  renderMoreOptions() {
    const { displayOptions } = this.state;
    const { rewardID, promoName, rDescription, locationName } = this.props;
    if (displayOptions) {
      return (
        <View style={{ position: 'absolute', elevation: 1, right: 20, top: Platform.OS === 'ios' ? 100 : 80, minWidth: 120, backgroundColor: mainBaseColor, zIndex: 1, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.6, shadowRadius: 2 }}>
          <ShareSocial onPress={() => this.setState({ displayOptions: false })} type="Rewards" taskID={rewardID} taskTitle={promoName} taskDescription={rDescription} taskLocation={locationName} />
        </View>
      );
    }
    return null;
  }

  render() {
    const { promoName } = this.props;

    return (
      <View style={{ backgroundColor: mainBaseColor, flex: 1, }}>
        {/* header section */}

        <NavTitle onPress={() => Actions.pop()} additionalButton="opt-ic" additionalAction={this.toggleOptionsMenu} style={{ top: 0, left: 0, right: 0, position: 'absolute', zIndex: 10 }} />
        {this.renderMapImage()}
        {this.renderMoreOptions()}

        {/* Detail Section */}
        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
          {/* Reward Title */}
          <View style={[{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }]}>
            <Text style={[TextStyle.Regular, styles.taskTitleText]}>{promoName}</Text>
          </View>

          {/* Reward Location */}
          {this.renderRewardLocation()}

          <View style={[{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-around', paddingBottom: 15 }]}>
            {/* Merchant Detail */}
            {this.renderMerchantDetails()}

            {this.renderExpiry()}
          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
            <Text style={[TextStyle.Regular, { color: mainColor }]}>Reward Description</Text>
            <View style={{ height: 1, backgroundColor: lightGrey, alignSelf: 'center', marginHorizontal: 10, flex: 1 }} />
          </View>

          {this.renderRewardDescription()}
          {this.renderAttachments()}

          <View style={{ alignItems: 'center', paddingBottom: 5 }}>
            {this.renderRedeemed()}
            {this.renderReset()}
          </View>

        </ScrollView>

        {/* Button section */}
        {this.renderClaim()}
      </View>
    );
  }
}

const styles = {
  userPicStyle: {
    height: fontSize.XL,
    width: fontSize.XL,
    marginBottom: 5,
  },
  iconStyle: {
    fontSize: fontSize.XL,
    marginBottom: 5,
  },
  locIconStyle: {
    fontSize: fontSize.M,
    marginRight: 5,
  },
  redeemedIconStyle: {
    fontSize: fontSize.M * 4,
    marginTop: 10,
    marginBottom: 5
  },
  detailItem: {
    flexDirection: 'column',
    alignItems: 'center',
    width: detailWidth * 1.5,
  },
  // Text Styles
  detailText: {
    ...TextStyle.Regular,
    fontSize: fontSize.S,
    textAlign: 'center',
  },
  taskTitleText: {
    ...headerText,
    color: mainColor,
  },
  titleStyle: {
    color: black,
    fontSize: fontSize.L,
  },
  marginBottom: { marginBottom: 5 },

  userPic: {
    height: fontSize.M,
    width: fontSize.M,
    borderRadius: fontSize.M / 2,
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
    fontStyle: 'italic',
    alignSelf: 'flex-start',
    paddingRight: 7.5,
  },
  descriptionStyle: {
    ...TextStyle.Regular,
    fontSize: fontSize.SM,
  },
  redeemedStyle: {
    textAlign: 'center',
  }
};

export default RewardInfo;
