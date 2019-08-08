import React, { Component } from 'react';
import { View } from 'react-native';
import { Spring, animated, config } from 'react-spring/renderprops-native';

const AnimatedView = animated(View);

export default class Animated extends Component {
  render() {
    const { from, to, children, style, setting, onLayout } = this.props;

    return (
      <Spring native from={from} to={to} config={setting || { clamp: true }}>
        {props => (<AnimatedView onLayout={onLayout} style={{ ...style, ...props }}>{children}</AnimatedView>)}
      </Spring>
    );
  }
}
