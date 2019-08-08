import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import ModalCard from '../common/ModalCard';
import { TextButton } from '../buttons/Button';
import { TextStyle } from '../../StyleSheet';
import { mainColor, fontSize, midGrey } from '../../Constants';

class ConfirmForfeit extends Component {
  render() {
    const { closeAction, forfeitAction } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => closeAction()} accessible={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity activeOpacity={1}>
            <ModalCard>

              {/* modal head */}
              <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L, fontWeight: 'bold' }]}>Forfeit task?</Text>
              <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L }]}>You will be penalised with a negative review.</Text>

              {/* Buttons */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TextButton text="no" color={midGrey} onPress={() => closeAction()} />
                <TextButton text="yes" color={mainColor} onPress={() => forfeitAction()} />
              </View>

            </ModalCard>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  sectionEnd: {
    marginBottom: 25,
  }
});

const { sectionEnd } = styles;

export default ConfirmForfeit;
