import React from 'react';
import { View, Dimensions } from 'react-native';
import { mainBaseColor } from '../../Constants';

const { width } = Dimensions.get('window');

const ModalCard = ({ children }) => (
  <View style={{ borderColor: mainBaseColor, borderRadius: 5, width: width * 0.9, backgroundColor: mainBaseColor, padding: 15, maxWidth: 400 }}>
    {children}
  </View>
);

export default ModalCard;
