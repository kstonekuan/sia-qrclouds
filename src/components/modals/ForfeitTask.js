import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ModalCard from '../common/ModalCard';
import { TextButton } from '../buttons/Button';
import { TextStyle } from '../../StyleSheet';
import { mainColor, fontSize, midGrey } from '../../Constants';


class CancelTask extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ModalCard>

          {/* modal head */}
          <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L }]}>Forfeit this task?</Text>

          {/* Sub Text */}
          <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', color: midGrey }]}>do note that forfeiting a task will lead to a negative hirer rating</Text>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextButton text="close" />
            <TextButton text="forfeit" color={mainColor} />
          </View>

        </ModalCard>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionEnd: {
    marginBottom: 25,
  }
});

const { sectionEnd } = styles;

export default CancelTask;
