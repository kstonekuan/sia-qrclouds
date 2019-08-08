import React from 'react';
import { View } from 'react-native';

const Row = ({ rowStyles, children, style }) => (
  <View style={[styles.frameStyle, rowStyles, style]}>{children}</View>
);

const styles = {
  frameStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  }
};

export default Row;
