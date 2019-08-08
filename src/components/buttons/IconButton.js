import React from 'react';
import { TouchableOpacity, View } from 'react-native';

// Local Imports
import Icon from '../common/Icon';
import { fontSize, grey } from '../../Constants';

const IconButton = ({ onPress, icon, color, size, style, iconStyle, backSize, backColor }) => (
  <TouchableOpacity onPress={onPress} style={[{ justifyContent: 'center', alignItems: 'center', height: backSize, width: backSize, borderRadius: backSize / 2 || null, backgroundColor: backColor }, style]}>
    <Icon icon={icon || 'general-ic-s'} color={color || grey} size={size || fontSize.M} style={iconStyle} />
  </TouchableOpacity>
);

export default IconButton;
