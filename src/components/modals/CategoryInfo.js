import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

// Local Imports
import Modal from './Modal';
import Icon from '../common/Icon';
import { Col } from '../common/StyledView';

// References
import { mainColor, white, padding, fontSize, grey, midGrey, mainBaseColor } from '../../Constants';
import { headerText, TextStyle, TestStyle, subText } from '../../StyleSheet';

const itemWidth = (Dimensions.get('screen').width * 0.9) - (padding.M * 2);

const CategoryIcon = ({ icon }) => (
  <View style={styles.iconBase}>
    <Icon icon={icon || 'general-ic-s'} color={mainBaseColor} size={size * 0.55} />
  </View>
);

const SectionItem = ({ style, onPress }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <View style={[{ height: 60, borderRadius: 30, width: itemWidth, backgroundColor: grey, marginBottom: padding.XS }, style]} />
  </TouchableOpacity>
);

const CategoryInfo = ({ header, body, onPressL, onPressR, icon }) => (
  <Modal
    headerless
    cardStyle={styles.modalStyle}
    buttonR="select"
    onPressR={onPressR}
    buttonL="close"
    onPressL={onPressL}
    closeAction={onPressL}
  >
    <CategoryIcon icon={icon} />
    <Text style={[styles.headerStyle]}>{header || 'general'}</Text>
    <Text style={[TextStyle.Regular, { fontSize: fontSize.M, textAlign: 'center', marginBottom: padding.M, color: midGrey }]}>{body || 'Everything, anything or nothing. Can\'t find a category catered to your task? Post it here.'}</Text>
    <Col>
      <Text style={[TextStyle.Regular, { fontSize: fontSize.ML, marginBottom: padding.S }]}>Task Examples:</Text>
      <SectionItem />
      <SectionItem />
      <SectionItem />
      <Text style={[subText, { textAlign: 'center' }]}>tap task to use as template</Text>
    </Col>
  </Modal>
);

const size = 130;
const iconDisplacement = 0.4;
const iconBorder = 7.5;

const styles = {
  headerStyle: {
    ...TextStyle.Regular,
    fontSize: fontSize.L,
    color: mainColor,
    marginTop: size * (1 - iconDisplacement) - padding.M - iconBorder,
    marginBottom: padding.S
  },
  iconBase: {
    height: size,
    width: size,
    borderRadius: size / 2,
    backgroundColor: mainColor,
    position: 'absolute',
    top: -(size * iconDisplacement + padding.M),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: iconBorder,
    borderColor: mainBaseColor,
  }
};

export default CategoryInfo;
