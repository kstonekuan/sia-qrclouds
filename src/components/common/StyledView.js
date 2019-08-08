import React from 'react';
import { View, TouchableOpacity } from 'react-native';

// References
import { padding, grey } from '../../Constants';


// - - - - Orientations - - - - //
export const Row = ({ children, alignment, style }) => (
  <View style={[{ flexDirection: 'row', alignItems: alignment || 'center' }, style]}>{children}</View>
);

export const Col = ({ children, justify, style }) => (
  <View style={[{ flexDirection: 'column', justifyContent: justify || 'flex-start' }, style]}>{children}</View>
);


// - - - - Section Breaks - - - - //
const breakSize = padding.S;
export const VertBreak = ({ size, color, style }) => (
  <View style={[{ marginHorizontal: size || breakSize, width: 1, backgroundColor: color || grey }, style]} />
);

export const HorBreak = ({ size, color, style }) => (
  <View style={[{ marginVertical: size || breakSize, height: 1, backgroundColor: color || grey }, style]} />
);


// - - - - Sections - - - //
const endingSize = padding.XL;
export const Section = ({ endSize, borderless, color, style, children }) => (
  <View style={[{ marginBottom: endSize || endingSize, borderBottomWidth: borderless ? 0 : 1, borderColor: color || grey }, style]}>{children}</View>
);

export const SectionEnd = ({ size, borderless, color, style }) => (
  <View style={[{ marginBottom: size || endingSize, borderBottomWidth: borderless ? 0 : 1, borderColor: color || grey }, style]} />
);


// - - - Touchable Views - - - //
export const TouchableView = props => (
  <TouchableOpacity {...props} style={props.touchStyle}>
    <View style={props.style}>
      {props.children}
    </View>
  </TouchableOpacity>
);

export const TouchableRow = props => (
  <TouchableOpacity {...props} style={[{ flex: 1 }, props.touchStyle]}>
    <Row style={props.style}>
      {props.children}
    </Row>
  </TouchableOpacity>
);
