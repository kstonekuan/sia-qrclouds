// import firebase from 'react-native-firebase';

const currentVersion = 0;
const TESTING = false;
const t = TESTING ? 'test_' : '';

// export const usersDB = firebase.firestore().collection(`${t}users`);
// export const rewardsDB = firebase.firestore().collection(`${t}rewards`);

// - - - Sizings - - - //
const baseFontSize = 18;
export const fontSize = {
  XS: baseFontSize * 0.6, // subtext text
  S: baseFontSize * 0.8, // subtext text
  SM: baseFontSize * 0.9,
  M: baseFontSize, // body texts
  ML: baseFontSize * 1.125,
  L: baseFontSize * 1.375, // subhead text
  XL: baseFontSize * 1.625, // header text
};

const basePaddingSize = 15;
export const padding = {
  XS: basePaddingSize / 3,
  S: basePaddingSize * 0.5, // related component seperation
  M: basePaddingSize, // regular division
  L: basePaddingSize * 2,
  XL: basePaddingSize * 3, // section division
};

// - - - Colors - - - //
export const red = '#c1335e';
export const green = '#00a99d';
export const lightGreen = '#9cd8d5';
export const black = '#37474f';
export const grey = '#546e7a';
export const midGrey = '#78909c';
export const lightGrey = '#b0bec5';
export const fairyGrey = '#f1f2ff';
export const white = '#ffffff';

export const mainColor = grey;
export const mainColorLight = lightGrey;
export const mainBaseColor = white;
export const subBaseColor = fairyGrey;
