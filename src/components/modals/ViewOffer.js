import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Local Imports
import ModalCard from '../common/ModalCard';
import Row from '../common/Row';
import { TextButton } from '../buttons/Button';
import IconText from '../common/IconText';
import { TextStyle } from '../../StyleSheet';
import { mainColor, fontSize, grey, lightGrey, midGrey } from '../../Constants';

class ViewOffer extends Component {
  renderRating() {
    return (
      <IconText text={this.props.offerInfo.helperRating} icon="thumbup-wire-ic" color={mainColor} size={fontSize.M} />
    );
  }

  render() {
    // Destructuring
    const { offerInfo, selectAction, closeAction } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ModalCard>

          {/* Helper Information */}
          <View style={[sectionEnd, { flexDirection: 'row', alignItems: 'center' }]}>
            <TouchableOpacity style={{ flex: 1, flexDirection: 'row' }} onPress={() => Actions.OtherUserProfile({ userID: offerInfo.helperID })}>
              {/* User Pic */}
              <Image style={styles.userPic} source={offerInfo.helperPic ? { uri: offerInfo.helperPic.toString() } : require('../images/defaultuser.jpg')} />
              {/* User Info */}
              <View style={{ flex: 1 }}>
                {/* User Name */}
                <Text style={TextStyle.Regular}>{offerInfo.helperName}</Text>
                {/* User Rating */}
                <IconText text={offerInfo.helperRating == '-' ? offerInfo.helperRating : `${offerInfo.helperRating}%`} icon={offerInfo.helperRating == '-' ? 'thumbup-ic' : offerInfo.helperRating < 50 ? 'thumbdown-ic' : 'thumbup-ic'} color={offerInfo.helperRating == '-' ? grey : offerInfo.helperRating < 50 ? grey : mainColor} size={fontSize.S} />
              </View>
            </TouchableOpacity>
            {/* Offer Amount */}
            <Text style={[TextStyle.Regular, { textAlign: 'right', fontSize: fontSize.XL, color: mainColor, alignSelf: 'center' }]}>{`$${offerInfo.offerAmount}`}</Text>
          </View>

          {/* Offer Text */}
          <Text style={[TextStyle.Regular, sectionEnd, { color: midGrey }]}>{offerInfo.offerText}</Text>

          {/* Buttons */}
          <Row rowStyles={{ justifyContent: 'space-around' }}>
            <TextButton text="close" color={lightGrey} onPress={closeAction} />
            <TextButton text="select" color={mainColor} onPress={selectAction} />
          </Row>

        </ModalCard>
      </View>
    );
  }
}

const picSize = fontSize.M * 4;

const styles = StyleSheet.create({
  userPic: {
    height: picSize,
    width: picSize,
    borderRadius: picSize / 2,
    marginRight: 10,
  },
  sectionEnd: {
    marginBottom: 25,
  }
});

const { sectionEnd } = styles;

export default ViewOffer;
