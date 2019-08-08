import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { mainColor } from '../../Constants';


const Spinner = ({ size, color }) => (
  <View>
    <ActivityIndicator size={size || 'large'} color={color || mainColor} />
  </View>
);

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};


export { Spinner };
