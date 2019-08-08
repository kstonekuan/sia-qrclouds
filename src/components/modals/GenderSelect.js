import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Local Imports
import Modal from './Modal';
import Row from '../common/Row';
import Icon from '../common/Icon';

// References
import { TextStyle } from '../../StyleSheet';
import { fontSize, padding, lightGrey, mainBaseColor } from '../../Constants';

const SelectionItem = ({ label, icon, color, onPress }) => (
  <TouchableOpacity onPress={() => onPress()} style={{ justifyContent: 'center' }}>
    <View style={[circleBack, { backgroundColor: color || lightGrey, marginHorizontal: padding.L }]}>
      <Icon icon={icon} color={mainBaseColor} size={itemSize * 0.8} style={[styles.itemIcon]} />
    </View>
    <Text style={[TextStyle.Regular, styles.itemText]}>{label}</Text>
  </TouchableOpacity>
);

class GenderSelect extends Component {
  render() {
    const { Gender, closeModal, completeChange, changeToFemale, changeToMale, changeToOthers, closeAction } = this.props;
    return (
      <Modal
        header="Select"
        buttonL="cancel"
        closeAction={closeAction}
        onPressL={() => closeModal()}
        buttonR="confirm"
        onPressR={() => completeChange()}
      >
        {/* Selection */}
        <Row style={[styles.selectionContainer]}>
          <SelectionItem label="female" icon="gender-female-ic" color={Gender === 'F' && pink} onPress={() => changeToFemale()} />
          <SelectionItem label="male" icon="gender-male-ic" color={Gender === 'M' && blue} onPress={() => changeToMale()} />
          {/* <SelectionItem label="other" icon="gender-oth-ic" color={Gender === 'Others' && lightGreen} onPress={() => changeToOthers()} /> */}
        </Row>
      </Modal>
    );
  }
}

const pink = '#FF80AB';
const blue = '#82B1FF';
const lightGreen = '#B9F6CA';

const itemSize = 80;

const styles = StyleSheet.create({
  sectionEnd: {
    marginBottom: 25,
  },
  selectionContainer: {
    justifyContent: 'space-around',
  },
  circleBack: {
    height: itemSize,
    width: itemSize,
    borderRadius: itemSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: padding.S,
  },
  itemIcon: {},
  itemText: {
    fontSize: fontSize.S,
    textAlign: 'center',
  },
});

const { sectionEnd, circleBack } = styles;

export default GenderSelect;
