import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomIcon from '../common/CustomIcon';
import { mainColor, grey, fontSize, mainBaseColor } from '../../Constants';
import { TextStyle } from '../../StyleSheet';

const CircleButton = ({ text, color, onPress, addStyles, textStyles, disabled, activeOpacity, iconStyle, icon, size, textSize }) => {
  const { buttonStyle, containerStyle } = styles;

  return (
    <TouchableOpacity style={containerStyle} disabled={disabled} onPress={onPress} activeOpacity={activeOpacity}>
      <View style={[buttonStyle, { backgroundColor: color || mainColor, height: size || buttonSize, width: size || buttonSize, borderRadius: size / 2 || buttonSize / 2 }, addStyles]}>
        <CustomIcon name={icon} style={[{ fontSize: size - 30 || buttonSize - 30, color: mainBaseColor }, iconStyle]} />
      </View>
      <View style={{ paddingVertical: 2, paddingHorizontal: 6, borderRadius: 15, backgroundColor: mainBaseColor }}>
        <Text style={[TextStyle.Regular, { fontSize: textSize || fontSize.M * 0.5, textAlign: 'center' }, textStyles]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const buttonSize = 60;

const styles = {
  containerStyle: {
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  }
};

export default CircleButton;
