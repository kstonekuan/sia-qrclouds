import React from 'react';
import CustomIcon from './CustomIcon';

// References
import { grey, fontSize, mainColor } from '../../Constants';

const Icon = ({ icon, size, color, style }) => {
  const { defaultIconStyle } = styles;

  return (
    <CustomIcon name={icon} style={[defaultIconStyle, { fontSize: size || fontSize.M, color: color || grey }, style]} />
  );
};

const styles = {
  defaultIconStyle: {
  },
};

export default Icon;
