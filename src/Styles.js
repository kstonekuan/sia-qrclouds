import { StyleSheet, Platform } from 'react-native';
import { fontSize, padding, green } from './Constants';

const text = '#546e7a';
const fontFamily = Platform.OS === 'ios' ? null : 'sans-serif-light';

export default StyleSheet.create({
  textStyle: {
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: text,
    fontWeight: '300',
  },
  textStyleThin: {
    fontFamily: Platform.OS === 'ios' ? null : 'sans-serif-thin',
    fontSize: fontSize,
    color: text,
    fontWeight: '100',
  },
  headerStyle: {
    fontFamily: fontFamily,
    fontWeight: '300',
    fontSize: fontSize * 1.2,
    color: green
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: padding,
  },
  flushedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  flushedTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  flushedBottomPadded: {
    position: 'absolute',
    bottom: padding,
    left: padding,
    right: padding,
  },
  flushedTopPadded: {
    position: 'absolute',
    top: padding,
    left: padding,
    right: padding,
  },
});
