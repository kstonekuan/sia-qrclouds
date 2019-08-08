import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ModalCard from '../common/ModalCard';
import { TextButton } from '../buttons/Button';
import { TextStyle } from '../../StyleSheet';
import { mainColor, fontSize, midGrey } from '../../Constants';

class ConfirmLogout extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Actions.pop()} accessible={false}>
        <View style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute', backgroundColor: '#37474f33', justifyContent: 'center', alignItems: 'center', }}>
          <TouchableOpacity activeOpacity={1}>
            <ModalCard>

              {/* modal head */}
              <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L }]}>Logout of account?</Text>

              {/* Buttons */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TextButton text="no" color={midGrey} onPress={() => Actions.pop()} />
                <TextButton text="yes" color={mainColor} onPress={() => firebase.auth().signOut()} />
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

export default ConfirmLogout;
