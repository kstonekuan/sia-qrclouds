import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';

import styles from './SideDrawerStyles';
import { mainBaseColor } from '../../Constants';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class SideDrawer extends Component {
  static propTypes = {
    /**
     * Height of the drawer.
     */
    containerWidth: PropTypes.number.isRequired,

    /**
     * The amount of offset to apply to the drawer's position.
     * If the app uses a header and tab navigation, offset should equal
     * the sum of those two components' heights.
     */
    offset: PropTypes.number,

    /**
     * Set to true to have the drawer start in up position.
     */
    startUp: PropTypes.bool,

    /**
     * How much the drawer's down display falls beneath the up display.
     * Ex: if set to 20, the down display will be 20 points underneath the up display.
     */
    downDisplay: PropTypes.number,

    /**
     * The background color of the drawer.
     */
    backgroundColor: PropTypes.string,

    /**
     * Set to true to give the top of the drawer rounded edges.
     */
    roundedEdges: PropTypes.bool,

    /**
     * Set to true to give the drawer a shadow.
     */
    shadow: PropTypes.bool,
  }

  static defaultProps = {
    offset: 0,
    startUp: true,
    backgroundColor: mainBaseColor,
    roundedEdges: true,
    shadow: true,
  }

  constructor(props) {
    super(props);

    /**
       * TOGGLE_THRESHOLD is how much the user has to swipe the drawer
       * before its position changes between up / down.
       */
    this.TOGGLE_THRESHOLD = this.props.containerWidth / 11;
    this.DOWN_DISPLAY = this.props.downDisplay || this.props.containerWidth / 1.5;

    /**
       * UP_POSITION and DOWN_POSITION calculate the two (x,y) values for when
       * the drawer is swiped into up position and down position.
       */
    this.UP_POSITION = {
      x: SCREEN_WIDTH - (this.props.containerWidth + this.props.offset),
      y: 0
    };
    this.DOWN_POSITION = {
      x: this.UP_POSITION.x + this.DOWN_DISPLAY,
      y: 0
    };

    this.state = { currentPosition: this.props.startUp ? this.UP_POSITION : this.DOWN_POSITION };

    this.position = new Animated.ValueXY(this.state.currentPosition);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderRelease
    });
  }

  render() {
    const view = (
      <Animated.View
        style={[
          this.position.getLayout(),
          styles.animationContainer,
          this.props.roundedEdges ? styles.roundedEdges : null,
          this.props.shadow ? styles.shadow : null,
          { width: this.props.containerWidth + Math.sqrt(SCREEN_WIDTH),
            height: SCREEN_HEIGHT,
            backgroundColor: this.props.backgroundColor }
        ]}
        {...this._panResponder.panHandlers}
      >
        {this.props.children}

        <View style={{ width: Math.sqrt(SCREEN_WIDTH), backgroundColor: this.props.backgroundColor }} />
      </Animated.View>
    );
    return this.props.displayTaskPanel ? view : null;
  }

  _handlePanResponderMove = (e, gesture) => {
    if (this.swipeInBounds(gesture)) {
      this.position.setValue({ x: this.state.currentPosition.x + gesture.dx });
    } else {
      this.position.setValue({ x: this.UP_POSITION.x - this.calculateEase(gesture) });
    }
  }

  _handlePanResponderRelease = (e, gesture) => {
    const { currentPosition } = this.state;
    if (gesture.dx > this.TOGGLE_THRESHOLD && currentPosition === this.UP_POSITION) {
      this.transitionTo(this.DOWN_POSITION);
    } else if (gesture.dx < -this.TOGGLE_THRESHOLD && currentPosition === this.DOWN_POSITION) {
      this.transitionTo(this.UP_POSITION);
    } else {
      this.resetPosition();
    }
  }

  // returns true if the swipe is within the height of the drawer.
  swipeInBounds(gesture) {
    return this.state.currentPosition.x + gesture.dx > this.UP_POSITION.x;
  }

  // when the user swipes the drawer above its height, this calculates
  // the drawer's slowing upward ease.
  calculateEase(gesture) {
    return Math.min(Math.sqrt(gesture.dx * -1), Math.sqrt(SCREEN_HEIGHT));
  }

  transitionTo(position) {
    Animated.spring(this.position, {
      toValue: position
    }).start();
    this.setState({ currentPosition: position });
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: this.state.currentPosition
    }).start();
  }
}
