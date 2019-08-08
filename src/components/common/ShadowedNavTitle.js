import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StatusBar } from 'react-native';

// Local Imports
import CustomIcon from './CustomIcon';

// References
import { grey, padding, fontSize, mainBaseColor } from '../../Constants';
import { headerText, StatusBarSize, Shadowed } from '../../StyleSheet';

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
    const { title, titleStyles, barStyle, backgroundColor, style, createRightButton } = this.props;
    return (
      <View style={[Shadowed, { backgroundColor: backgroundColor || mainBaseColor }, style]}>
        <StatusBar translucent backgroundColor={backgroundColor || 'transparent'} barStyle={barStyle || 'dark-content'} />
        <View style={{ height: StatusBarSize, backgroundColor: backgroundColor }} />

        {/* Mainbar Content */}
        <View style={[styles.headerContainer, { backgroundColor: backgroundColor || mainBaseColor }]}>
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
};

export default NavTitle;
