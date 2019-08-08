import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Local Imports
import ModalCard from '../common/ModalCard';
import { TextButton } from '../buttons/Button';
import { TextStyle } from '../../StyleSheet';
import { fontSize } from '../../Constants';


class InformationPopup extends Component {
  render() {
    const { header, closeAction } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
        <ModalCard>

          {/* modal head */}
          <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.L }]}>{header}</Text>

          {/* body */}
          <Text style={[TextStyle.Regular, sectionEnd, { textAlign: 'center', fontSize: fontSize.ML }]}>{this.props.Text}</Text>

          {/* Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TextButton text="close" onPress={closeAction} />
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

export default InformationPopup;
