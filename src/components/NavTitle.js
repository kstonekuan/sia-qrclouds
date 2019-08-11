import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions, Platform, StatusBar } from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

// Local Imports
import CustomIcon from './common/CustomIcon';

// References
import { grey, padding, mainColor, fontSize, mainBaseColor } from '../Constants';
import { headerText, TextStyle, StatusBarSize, Shadowed } from '../StyleSheet';

const device = Dimensions.get('window');
const headerHeight = 70;

class NavTitle extends Component {
  static defaultProps = {
    hideBackArrow: false,
  }

  renderMoreOptions() {
    const { enableMoreOptions, toggleAction } = this.props;
    if (enableMoreOptions) {
      return (
        <TouchableOpacity onPress={() => toggleAction()} style={{ marginLeft: padding.M }}>
          <CustomIcon name="opt-ic" size={fontSize.L} color={grey} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  renderBackArrow() {
    const { onPress, hideBackArrow, backArrowColor } = this.props;
    if (!hideBackArrow) {
      return (
        <TouchableOpacity onPress={onPress}>
          <CustomIcon name="backarr-ic" size={fontSize.L} color={backArrowColor || grey} />
        </TouchableOpacity>
      );
    }
  }

  renderAdditionalButton() {
    const { additionalButton, additionalAction } = this.props;
    if (additionalButton) {
      return (
        <TouchableOpacity onPress={() => additionalAction()}>
          <CustomIcon name={additionalButton} size={fontSize.L} color={grey} />
        </TouchableOpacity>
      );
    }
  }

  render() {
    const { title, titleStyles, statusBarStyle, backgroundColor, style, createRightButton, shadow } = this.props;
    return (
      <View style={[styles.headerContainer, { backgroundColor: backgroundColor || 'transparent', ...ifIphoneX({ marginTop: 40 }, { marginTop: Platform.OS === 'ios' ? 15 : StatusBar.currentHeight }), }, style]}>
        <StatusBar translucent={Platform.OS === 'android'} backgroundColor={backgroundColor || 'transparent'} barStyle={statusBarStyle || 'dark-content'} />
        <View style={[styles.buttonContainer]}>
          {this.renderBackArrow()}
        </View>
        <Text style={[headerText, { fontSize: fontSize.L, textAlign: 'center', flex: 1 }, titleStyles]} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
        <View style={[styles.buttonContainer]}>
          {this.renderAdditionalButton()}
          {this.renderMoreOptions()}
          {createRightButton}
        </View>
      </View>
    );
  }
}

const styles = {
  headerContainer: {
    paddingHorizontal: padding.M,
    flexDirection: 'row',
    alignItems: 'center',
    height: headerHeight,
  },
  buttonContainer: {
    minWidth: fontSize.L,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 1,
  },
  iconStyle: {
    fontSize: fontSize.L,
    textColor: grey
  }
};

export default NavTitle;
