import React from 'react';
import { View } from 'react-native';

const PageFrame = ({ children, style }) => (
  <View style={[{ flex: 1 }, style]}>
    {children}
  </View>
);

export default PageFrame;
