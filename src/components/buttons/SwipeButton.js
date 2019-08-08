import React, { Component } from 'react';
import {
  View,
  Text,
  PanResponder,
  Dimensions,
} from 'react-native';
import CustomIcon from '../common/CustomIcon';
import { mainColor, mainBaseColor, black } from '../../Constants';

class SwipeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slide: false,
      slideX: 0,
    };
    const { type, triggerMin, transitionStart, triggerBGColorStart, triggerBGColorEnd, triggerTextColorStart, triggerTextColorEnd, sliderBGColor, sliderLabelColor } = this.props;
    this.device = Dimensions.get('window');
    const { width, height } = this.device;
    this.slideMax = width;
    this.triggerMin = triggerMin || 0.8;
    this.transitionStart = transitionStart || 0.20;
    this.transitionScale = 1 + this.transitionStart;
    if (!type) {
      if (triggerBGColorStart) {
        this.triggerBGColorStart = triggerBGColorStart;
      } else {
        this.triggerBGColorStart = { r: 255, g: 255, b: 255 };
      }
      if (triggerBGColorEnd) {
        this.triggerBGColorEnd = triggerBGColorEnd;
      } else {
        this.triggerBGColorEnd = { r: 55, g: 71, b: 79 };
      }
      if (triggerTextColorStart) {
        this.triggerTextColorStart = triggerTextColorStart;
      } else {
        this.triggerTextColorStart = { r: 0, g: 0, b: 0 };
      }
      if (triggerTextColorEnd) {
        this.triggerTextColorEnd = triggerTextColorEnd;
      } else {
        this.triggerTextColorEnd = { r: 255, g: 255, b: 255 };
      }

      this.triggerBGColorScale = {
        r: (this.triggerBGColorEnd.r - this.triggerBGColorStart.r),
        g: (this.triggerBGColorEnd.g - this.triggerBGColorStart.g),
        b: (this.triggerBGColorEnd.b - this.triggerBGColorStart.b),
      };
      this.triggerTextColorScale = {
        r: (this.triggerTextColorEnd.r - this.triggerTextColorStart.r),
        g: (this.triggerTextColorEnd.g - this.triggerTextColorStart.g),
        b: (this.triggerTextColorEnd.b - this.triggerTextColorStart.b),
      };
      this.sliderColorBG = sliderBGColor || mainColor;
      this.sliderColorText = sliderLabelColor || mainBaseColor;
    }

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ slide: true });
      },
      onPanResponderMove: (evt, gestureState) => {
        this.setState({ slideX: gestureState.dx });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > (this.slideMax * this.triggerMin)) {
          this.props.onSlide();
        }
        this.setState({ slideX: 0, slide: false });
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  renderSwipeType() {
    const { height, width } = this.device;
    const { slideX, slide } = this.state;
    const { type, sliderLabel, triggerLabel, sliderContainerStyle, textStyle } = this.props;
    sliderX = Math.min(slideX, this.slideMax);
    trigger = sliderX > this.slideMax * this.triggerMin;
    sliderRate = sliderX / this.slideMax;
    transitionRate = sliderRate > this.transitionStart ? (Math.min(this.transitionScale, (this.transitionScale * (1 / this.triggerMin) * sliderRate)) - this.transitionStart) : 0;
    switch (type) {
      case 'ongoing-page':
        sliderW = 255 * transitionRate;
        textColor = `rgb(${sliderW}, ${sliderW}, ${sliderW})`;
        return (
          <View style={[{ overflow: 'hidden' }, sliderContainerStyle]}>
            <View style={{ padding: 10, height: 50, width, backgroundColor: black, alignItems: 'center', flexDirection: 'row' }}>
              <Text style={[{ fontSize: 20, textAlign: 'center' }, textStyle, { color: textColor }]}>{triggerLabel}</Text>
            </View>
            <View style={{ padding: 10, height: 50, width, marginTop: -50, backgroundColor: `rgba(255, 255, 255, ${1 - transitionRate})` }} />
            <View
              style={{ flexDirection: 'row', padding: 10, height: 50, width: width + 10, marginTop: -50, marginLeft: Math.max(sliderX, -10), backgroundColor: mainColor, alignItems: 'center', justifyContent: 'center' }}
              {...this._panResponder.panHandlers}
            >
              <Text style={[textStyle, { fontSize: 20, color: mainBaseColor, textAlign: 'center' }]}>{sliderLabel}</Text>
              <CustomIcon name="start-ic" color={mainBaseColor} size={20} style={{ marginLeft: 15 }} />
            </View>
          </View>
        );
        break;
      default:
        triggerLabelColor = `rgb(${this.triggerTextColorStart.r + (this.triggerTextColorScale.r * transitionRate)}, ${this.triggerTextColorStart.g + (this.triggerTextColorScale.g * transitionRate)
        }, ${this.triggerTextColorStart.b + (this.triggerTextColorScale.b * transitionRate)})`;
        triggerLabelBG = `rgb(${this.triggerBGColorStart.r + (this.triggerBGColorScale.r * transitionRate)}, ${this.triggerBGColorStart.g + (this.triggerBGColorScale.g * transitionRate)
        }, ${this.triggerBGColorStart.b + (this.triggerBGColorScale.b * transitionRate)})`;
        return (
          <View style={[{ overflow: 'hidden' }, sliderContainerStyle]}>
            <View style={{ padding: 10, height: 50, width, backgroundColor: triggerLabelBG, alignItems: 'center', flexDirection: 'row' }}>
              <Text style={[{ fontSize: 20, textAlign: 'center' }, textStyle, { color: triggerLabelColor }]}>{triggerLabel}</Text>
            </View>
            <View
              style={{ flexDirection: 'row', padding: 10, height: 50, width: width + 10, marginTop: -50, marginLeft: Math.max(sliderX, -10), backgroundColor: this.sliderColorBG, alignItems: 'center', justifyContent: 'center' }}
              {...this._panResponder.panHandlers}
            >
              <Text style={[{ fontSize: 20, textAlign: 'center' }, textStyle, { color: this.sliderColorText }]}>{sliderLabel}</Text>
              <CustomIcon name="start-ic" color={this.sliderColorText} size={20} style={{ marginLeft: 15 }} />
            </View>
          </View>
        );
    }
  }

  render() {
    return this.renderSwipeType();
  }
}

export default SwipeButton;
