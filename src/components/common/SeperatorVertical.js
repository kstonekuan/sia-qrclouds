import React from 'react';
import { View } from 'react-native';
import { midGrey } from '../../Constants';

const SeperatorVertical = () => (
        <View style={styles.SeperatorStyle}/>
    );

const styles = {
  SeperatorStyle: {
    width: 1,
    backgroundColor: midGrey,
  }
};

export default SeperatorVertical;
