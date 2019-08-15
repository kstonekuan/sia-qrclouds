import { Platform, StyleSheet, StatusBar } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';

// References
import { fontSize, padding, grey, black, mainColor, mainBaseColor } from './Constants';

// Short Hands
const android = Platform.OS === 'android';
const ios = Platform.OS === 'ios';
const textColor = grey;


// - - - - - Font Stylings - - - - - //

export const TextStyle = {
  Regular: {
    fontSize: fontSize.M,
    color: textColor,
    fontFamily: android ? 'sans-serif-light' : null,
    fontWeight: '300',
  },
  // Text Variants
  Thin: {
    fontSize: fontSize.M,
    color: textColor,
    fontFamily: android ? 'sans-serif-thin' : null,
    fontWeight: '100',
  },
  Bold: {
    fontSize: fontSize.M,
    color: textColor,
    fontFamily: android ? 'sans-serif' : null,
    fontWeight: '400',
  },
  Bolder: {
    fontSize: fontSize.M,
    color: textColor,
    fontFamily: android ? 'sans-serif-medium' : null,
    fontWeight: '500',
  },
};

export const headerText = {
  ...TextStyle.Regular,
  color: mainColor,
  fontSize: fontSize.L,
};

export const subText = {
  ...TextStyle.Regular,
  fontSize: fontSize.S,
};


// - - - - - Container Stylings - - - - - //

export const FlexContainer = {
  Regular: {
    flex: 1
  },
  // Variants
  Centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  CenteredPadded: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: padding.M
  },
  Padded: {
    flex: 1,
    padding: padding.M,
  }
};

export const Container = {
  Padded: {
    backgroundColor: mainBaseColor,
    padding: padding.M,
  }
};

const borderRadiusSize = 10;
export const Rounded = {
  Regular: {
    borderRadius: borderRadiusSize,
  },
  Sharp: {
    borderRadius: 5
  },
  Full: {
    borderRadius: 1000,
  },
  // Variants - Top
  Top: {
    borderTopLeftRadius: borderRadiusSize,
    borderTopRightRadius: borderRadiusSize,
  },
  TopLeft: {
    borderTopLeftRadius: borderRadiusSize,
  },
  TopRight: {
    borderTopRightRadius: borderRadiusSize,
  },

  // Variants - Bottom
  Bottom: {
    borderBottomLeftRadius: borderRadiusSize,
    borderBottomRightRadius: borderRadiusSize,
  },
  BottomLeft: {
    borderBottomLeftRadius: borderRadiusSize,
  },
  BottomRight: {
    borderBottomRightRadius: borderRadiusSize,
  },
};

export const Shadowed = {
  // Android Settings
  elevation: 3,
  // iOS Settings
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.15,
  shadowRadius: 2,
};

export const SectionEnd = {
  S: { marginBottom: padding.XL / 2 },
  M: { marginBottom: padding.XL },
};


// - - - Position Stylings - - - //
export const Absolute = {
  Fill: {
    ...StyleSheet.absoluteFill,
  },

  // Centered
  CenteredContent: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Top
  Top: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  PaddedTop: {
    position: 'absolute',
    top: padding.M,
    left: padding.M,
    right: padding.M,
  },
  TopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  TopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  // Bottom
  Bottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  BottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  BottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  PaddedBottom: {
    position: 'absolute',
    bottom: padding.M,
    left: padding.M,
    right: padding.M,
  },

  // Sides
  Left: {
    position: 'absolute',
    left: 0,
    Padded: {
      position: 'absolute',
      left: padding.M,
    }
  },
  Right: {
    position: 'absolute',
    right: 0,
    Padded: {
      position: 'absolute',
      right: padding.M,
    }
  },
};

export const StatusBarSize = ios ? getStatusBarHeight(true) : StatusBar.currentHeight;
export const StatusBarAvoid = {
  Padding: {
    paddingTop: StatusBarSize
  },
  Margin: {
    marginTop: StatusBarSize
  }
};

export const BottomSpaceSize = getBottomSpace();
export const iphoneXBottomAvoid = {
  Padding: {
    paddingBottom: BottomSpaceSize
  },
  Margin: {
    marginBottom: BottomSpaceSize
  }
};

export const TestStyle = {
  Border: {
    borderWidth: 1,
    borderColor: 'orange',
  },
  Red: {
    backgroundColor: 'red',
  },
  Green: {
    backgroundColor: 'green',
  },
  Blue: {
    backgroundColor: 'blue',
  }
};
