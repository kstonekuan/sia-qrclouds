import React from 'react';
import { Text, TouchableOpacity, TouchableNativeFeedback, View, Platform } from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';

// Local Import
import Icon from '../common/Icon';

// References
import { grey, fontSize, padding, mainBaseColor } from '../../Constants';
import { TextStyle, Absolute, Rounded } from '../../StyleSheet';

const ButtonBase = ({ children, onPress, style, activeOpacity }) => (
  <TouchableOpacity onPress={onPress} style={style} activeOpacity={activeOpacity || buttonOpacity}>
    {children}
  </TouchableOpacity>
);

// Commented till able to fix behavior //

// const ButtonBase = ({ children, onPress, style, lightRipple, activeOpacity, rippleClipping, rippleColor, backgroundRipple }) => {
//   if (Platform.OS === 'ios') {
//     return (
//       <TouchableOpacity onPress={onPress} style={style} activeOpacity={activeOpacity || buttonOpacity}>
//         {children}
//       </TouchableOpacity>
//     );
//   }
//   return (
//     <View style={rippleClipping || Rounded.Sharp} overflow="hidden">
//       <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple(rippleColor || lightRipple ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.05)', backgroundRipple)}>
//         <View style={style}>
//           {children}
//         </View>
//       </TouchableNativeFeedback>
//     </View>
//   );
// };

// - - - - - - - - Components - - - - - - - - //

// Filled Button
export const FilledButton = ({ text, color, onPress, textStyles, disabled, activeOpacity, style }) => (
  <ButtonBase lightRipple style={[buttonStyle, { backgroundColor: color || grey }, style]} disabled={disabled} onPress={onPress} activeOpacity={activeOpacity}>
    <Text style={[buttonText, { color: mainBaseColor }, textStyles]}>{text}</Text>
  </ButtonBase>
);

// Text Button
export const TextButton = ({ text, color, onPress, textStyles, disabled, activeOpacity, style }) => (
  <ButtonBase style={[buttonStyle, style]} disabled={disabled} onPress={onPress} activeOpacity={activeOpacity}>
    <Text style={[buttonText, { color: color || grey }, textStyles]}>{text}</Text>
  </ButtonBase>
);

// Wire Button
export const WireButton = ({ text, color, onPress, textStyles, disabled, activeOpacity, style, transparent }) => (
  <ButtonBase style={[buttonStyle, { borderWidth: 1, borderColor: color || grey, backgroundColor: transparent ? 'transparent' : mainBaseColor }, style]} disabled={disabled} onPress={onPress} activeOpacity={activeOpacity}>
    <Text style={[buttonText, { color: color || grey }, textStyles]}>{text}</Text>
  </ButtonBase>
);

// Icon-Text Button
export const IconTextButton = ({ text, color, onPress, textStyles, disabled, activeOpacity, style, icon }) => (
  <ButtonBase lightRipple style={[buttonStyle, { backgroundColor: color || grey, flexDirection: 'row' }, style]} disabled={disabled} onPress={onPress} activeOpacity={activeOpacity}>
    <Icon icon={icon || 'placehold'} color={mainBaseColor} size={fontSize.L} style={[Absolute.Left, { left: 10 }]} />
    <Text style={[buttonText, { color: mainBaseColor }, textStyles]}>{text}</Text>
  </ButtonBase>
);

// Facebook Button
export const FacebookButton = ({ text, onPress, textStyles, disabled, activeOpacity, style }) => (
  <ButtonBase lightRipple style={[buttonStyle, { backgroundColor: '#3b5998', flexDirection: 'row' }, style]} disabled={disabled} onPress={onPress} activeOpacity={activeOpacity}>
    <EntypoIcon name="facebook" color={mainBaseColor} size={fontSize.M * 2} style={[Absolute.Left, { left: 5 }]} />
    <Text style={[buttonText, { color: mainBaseColor }, textStyles]}>{text}</Text>
  </ButtonBase>
);

// Icon Button
export const IconButton = ({ onPress, icon, color, size, style, iconStyle, backSize, backColor }) => (
  <ButtonBase backgroundRipple onPress={onPress} style={[{ justifyContent: 'center', alignItems: 'center', height: backSize, width: backSize, borderRadius: backSize / 2 || 100, backgroundColor: backColor }, style]}>
    <Icon icon={icon || 'general-ic-s'} color={color || grey} size={size || fontSize.ML} style={iconStyle} />
  </ButtonBase>
);

const buttonOpacity = 0.7;

const styles = {
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: (padding.M * 2) + (fontSize.M),
    ...Rounded.Sharp
  },
  buttonText: {
    ...TextStyle.Regular,
    textAlign: 'center',
  }
};

const { buttonStyle, buttonText } = styles;
