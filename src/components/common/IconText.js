import React from 'react';
import { View, Text } from 'react-native';
import CustomIcon from './CustomIcon';
import { TextStyle } from '../../StyleSheet';
import { grey } from '../../Constants';

const IconText = ({ text, icon, size, color, textStyle, iconStyle, rowStyle, ellipsizeMode, numberOfLines }) => {
  const { containerStyle, defaultIconStyle } = styles;

  return (
    <View style={[containerStyle, rowStyle]}>
      <CustomIcon name={icon} style={[defaultIconStyle, { fontSize: size, color: color || grey }, iconStyle]} />
      <Text style={[TextStyle.Regular, { fontSize: size, color: color || grey }, textStyle]} ellipsizeMode={ellipsizeMode} numberOfLines={numberOfLines}>{text}</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultIconStyle: {
    marginRight: 5,
  },
};

export default IconText;
