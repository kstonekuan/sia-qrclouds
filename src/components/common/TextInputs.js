import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

// Local Imports
import { IconButton } from '../buttons/Button';
import Icon from './Icon';
import { Row, TouchableRow, TouchableView } from './StyledView';

// References
import { fontSize, padding, black, grey, lightGrey, midGrey, mainColor } from '../../Constants';
import { TextStyle, Rounded } from '../../StyleSheet';

// - - - - Components - - - - //


export const Input = props => (
  <TextInput
    {...props}
    underlineColorAndroid="transparent"
    placeholder={props.placeholder || 'text'}
    placeholderTextColor={lightGrey}
    style={[InputBaseStyle, { color: props.color || grey }, props.style]}
    // Value Related Props //
    onChangeText={props.onChangeText}
    value={props.value}
    // Additonal Props //
    autoCapitalize={props.autoCapitalize}
    autoFocus={props.autoFocus}
    editable={props.editable}
    keyboardType={props.keyboardType}
    maxLength={props.maxLength}
    multiline={props.multiline}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    secureTextEntry={props.secureTextEntry}
    pointerEvents={props.pointerEvents}
  />
);

export const BorderedInput = ({ placeholder, style, onChangeText, editable, keyboardType, multiline, onFocus, autoFocus, value, color, children, secureTextEntry, autoCapitalize, maxLength, textInputStyle, onBlur }) => (
  <Row style={[Rounded.Regular, { borderWidth: 1, padding: padding.M, borderColor: color || midGrey }, style]}>
    <Input
      placeholder={placeholder || 'text'}
      maxLength={maxLength || 50}
      style={[{ flex: 1, color: color || grey }, textInputStyle]}
      onChangeText={onChangeText}
      value={value}
      editable={editable}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    {children}
  </Row>
);

export const UnderlinedInput = ({ placeholder, style, onChangeText, editable, keyboardType, multiline, onFocus, value, color, containerStyle, children, secureTextEntry, autoCapitalize, autoFocus, maxLength, textInputStyle, label, icon, size, iconStyle, onBlur, onPress, disabled, marginNull }) => (
  <Row style={[UnderlinedContainerStyle, { marginLeft: marginNull ? 0 : padding.M }, style]}>
    <Input
      placeholder={placeholder || 'text'}
      style={[{ flex: 1, color: color || grey }, textInputStyle]}
      onChangeText={onChangeText}
      value={value}
      editable={editable}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      secureTextEntry={secureTextEntry}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    {children}
  </Row>
);

export const LabeledInput = ({ placeholder, style, onChangeText, editable, keyboardType, multiline, onFocus, onBlur, value, color, containerStyle, children, secureTextEntry, autoCapitalize, autoFocus, maxLength, textInputStyle, label, icon, size, iconStyle, onPress, disabled, borderless }) => (
  <Row style={[UnderlinedContainerStyle, { marginLeft: padding.M, borderBottomWidth: borderless ? 0 : 1 }, style]}>
    <Text style={[TextStyle.Regular, { marginRight: padding.S, color: color || black }]}>{label}</Text>
    <Input
      placeholder={placeholder}
      style={[{ flex: 1, textAlign: 'right', color: color || grey }, textInputStyle]}
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
      editable={editable}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      secureTextEntry={secureTextEntry}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    {children}
  </Row>
);

export const TouchableLabeledInput = ({ placeholder, style, onChangeText, editable, keyboardType, multiline, onFocus, onBlur, value, color, children, secureTextEntry, autoCapitalize, autoFocus, textInputStyle, label, onPress, marginNull }) => (
  <Row style={[UnderlinedContainerStyle, { marginLeft: marginNull ? 0 : padding.M }, style]}>
    <TouchableRow onPress={onPress} disabled={false}>
      <Text style={[TextStyle.Regular, { marginRight: padding.S, color: color || black }]}>{label || 'label'}</Text>
      <Input
        placeholder={placeholder}
        style={[{ flex: 1, textAlign: 'right', color: color || grey }, textInputStyle]}
        onChangeText={onChangeText}
        value={value}
        editable={editable || false}
        autoCapitalize={autoCapitalize}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        pointerEvents="none"
      />
      {children}
    </TouchableRow>
  </Row>
);

export const IconInput = ({ placeholder, style, onChangeText, editable, keyboardType, multiline, onFocus, onBlur, value, color, containerStyle, children, secureTextEntry, autoCapitalize, autoFocus, maxLength, textInputStyle, label, icon, size, iconStyle, onPress, disabled, borderless }) => (
  <Row style={[UnderlinedContainerStyle, { marginLeft: padding.M, borderBottomWidth: borderless ? 0 : 1 }, style]}>
    <Icon icon={icon} size={size} color={color} style={[{ marginRight: padding.S }, iconStyle]} />
    <Input
      placeholder={placeholder || 'text'}
      style={[{ flex: 1, textAlign: 'right', color: color || grey }, textInputStyle]}
      onChangeText={onChangeText}
      value={value}
      editable={editable}
      onFocus={onFocus}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoFocus={autoFocus}
      secureTextEntry={secureTextEntry}
    />
    {children}
  </Row>
);

// - - - - Specific Inputs - - - - //

export const LocationInput = ({ placeholder, style, editable, keyboardType, multiline, onFocus, onBlur, value, color, containerStyle, children, secureTextEntry, autoCapitalize, maxLength, textInputStyle, label, icon, autoFocus, size, iconStyle, gacHandle, formHandle, emptyHandle }) => (
  <Row style={style}>
    <Icon icon={icon || 'loc-ic'} size={size || fontSize.L} color={color} style={[{ marginRight: padding.S, width: fontSize.L, textAlign: 'center' }, iconStyle]} />
    <Input
      placeholder={placeholder || 'location'}
      onFocus={onFocus}
      multiline
      style={{ paddingRight: padding.S, flex: 1, color: color || grey }} // Padded end for linebreak
      editable={editable}
      value={value}
      autoFocus={autoFocus}

      // Location Auto fill related
      onChangeText={(inputValue) => {
        gacHandle(inputValue);
        formHandle(inputValue);
        if (inputValue === '' || inputValue == null) {
          emptyHandle();
        }
      }}
    />
  </Row>
);

export const BioInput = ({ label, placeholder, onChangeText, value, inputStyle, autoFocus, editable, onFocus, onBlur, color, onPress, multiline, style, textInputStyle, borderless }) => (
  <View style={[UnderlinedContainerStyle, { marginLeft: padding.M, borderBottomWidth: borderless ? 0 : 1 }, style]}>
    <TouchableView onPress={onPress} disabled={false}>
      <Row style={{ justifyContent: 'space-between', marginBottom: padding.S }}>
        <Text style={[TextStyle.Regular, { fontSize: fontSize.M, color: color || black }]}>{label || 'label'}</Text>
        <IconButton onPress={onPress} icon="edit-ic" size={fontSize.M} color={lightGrey} />
      </Row>
      <Input
        placeholder={placeholder || 'text here'}
        style={[{ textAlign: 'justify', color: color || grey }, textInputStyle]}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        value={value}
        editable={editable}
        multiline
        pointerEvents="none"
      />
    </TouchableView>
  </View>
);

const styles = StyleSheet.create({
  UnderlinedContainerStyle: {
    paddingVertical: padding.M,
    borderColor: lightGrey,
    borderBottomWidth: 1
  },
  InputBaseStyle: {
    ...TextStyle.Regular,
    margin: 0,
    padding: 0,
  },
});

const { UnderlinedContainerStyle, InputBaseStyle } = styles;
