import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';

// Local Imports
import Row from '../common/Row';
import { Spinner } from '../common';
import { TextButton } from '../buttons/Button';

// References
import { Absolute, TextStyle } from '../../StyleSheet';
import { fontSize, padding, mainColor, grey, mainBaseColor, midGrey } from '../../Constants';

const { width } = Dimensions.get('window');

// - - - - - Local Components - - - - - //
const ModalCard = ({ children, style }) => (
  <TouchableWithoutFeedback style={{ zIndex: 1 }}>
    <View style={[{ borderColor: mainBaseColor, borderRadius: 15, maxWidth: width * 0.9, backgroundColor: mainBaseColor, padding: 15, width: 400 }, style]}>
      {children}
    </View>
  </TouchableWithoutFeedback>
);

const ModalBase = ({ children, style, closeAction, cardStyle }) => (
  <TouchableWithoutFeedback onPress={closeAction}>
    <View style={[Absolute.CenteredContent, { backgroundColor: '#37474f33', zIndex: 1 }, style]}>
      <ModalCard style={[{ zIndex: 2 }, cardStyle]}>
        {children}
      </ModalCard>
    </View>
  </TouchableWithoutFeedback>
);


// - - - - - - - Modal - - - - - - - //
export default class Modal extends Component {
  leftButton() {
    const { singleButton, buttonL, onPressL } = this.props;
    if (!singleButton) {
      return (
        <TextButton style={{ minWidth: 150 }} text={buttonL} onPress={onPressL} color={midGrey} />
      );
    }
    return null;
  }

  modalBody() {
    const { children, titleOnly, bodyAlignment } = this.props;
    if (!titleOnly) {
      return (
        <View style={[{ alignItems: bodyAlignment || 'center' }, sectionEnd]}>
          {children}
        </View>
      );
    }
    return null;
  }

  render() {
    const { baseStyle, header, headerStyle, buttonR, onPressR, buttonColor, closeAction, cardStyle, bodyAlignment, headerless, loading } = this.props;

    return (
      <ModalBase style={baseStyle} cardStyle={cardStyle} closeAction={closeAction}>
        {/* modal head */}
        <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L, display: headerless ? 'none' : 'flex' }, headerStyle]}>{header}</Text>
        {/* body */}
        {this.modalBody(bodyAlignment)}
        {/* Buttons */}
        {(loading == false || loading == undefined)
        && (
        <Row style={{ justifyContent: 'space-around' }}>
          {this.leftButton()}
          <TextButton style={{ minWidth: 150 }} text={buttonR} onPress={onPressR} color={buttonColor || mainColor} />
        </Row>
        )}
        {loading == true && <Spinner />}
      </ModalBase>
    );
  }
}

const styles = StyleSheet.create({
  sectionEnd: {
    marginBottom: padding.M,
  }
});

const { sectionEnd } = styles;
