import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Local Imports
import ModalCard from '../common/ModalCard';
import { TextButton } from '../buttons/Button';
import { TextStyle } from '../../StyleSheet';
import { mainColor, fontSize, midGrey } from '../../Constants';


class RegistrationCancel extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Actions.pop()} accessible={false}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity activeOpacity={1}>
            <ModalCard>

              {/* modal head */}
              <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L }]}>Cancel registration?</Text>

              {/* Buttons */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TextButton text="no" color={midGrey} onPress={() => Actions.pop()} />
                <TextButton text="yes" color={mainColor} onPress={null} />
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

export default RegistrationCancel;
