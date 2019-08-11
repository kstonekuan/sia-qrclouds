import React, { Component } from 'react';
import { Button, Text, View, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

class CameraOverlay extends Component {
  render() {
    const { height, width } = Dimensions.get('window');
    const maskRowHeight = Math.round((height - 300) / 20);
    const maskColWidth = (width - 300) / 2;

    return (
      <View style={styles.maskOutter}>
        <View style={[{ flex: maskRowHeight  }, styles.maskRow, styles.maskFrame]} />
        <View style={[{ flex: 30 }, styles.maskCenter]}>
          <View style={[{ width: maskColWidth }, styles.maskFrame]} />
          <View style={styles.maskInner} />
          <View style={[{ width: maskColWidth }, styles.maskFrame]} />
        </View>
        <View style={[{ flex: maskRowHeight }, styles.maskRow, styles.maskFrame]} />
      </View>
    );
  }
}

const styles = {
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  maskInner: {
    width: 300,
    backgroundColor: 'transparent',
    borderColor: 'rgba(1,1,1,0.6)',
    borderWidth: 1,
  },
  maskFrame: {
    backgroundColor: 'rgba(1,1,1,0.6)',
  },
  maskRow: {
    width: '100%',
  },
  maskCenter: { flexDirection: 'row' },
};

export default CameraOverlay;