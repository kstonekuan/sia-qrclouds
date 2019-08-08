import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Local Components
import ModalCard from '../common/ModalCard';
import { TextButton } from '../buttons/Button';
import { TextStyle } from '../../StyleSheet';
import { mainColor, fontSize } from '../../Constants';


class CancelTask extends Component {
  render() {
    const { closeAction, taskCancel } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ModalCard>

          {/* modal head */}
          <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L }]}>Cancel this task?</Text>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextButton text="no" onPress={closeAction} />
            <TextButton text="yes" color={mainColor} onPress={taskCancel} />
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
