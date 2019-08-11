import firebase from 'react-native-firebase';

const currentVersion = 0;
const TESTING = false;
const t = TESTING ? 'test_' : '';

const usersDB = firebase.firestore().collection(`${t}users`);
const rewardsDB = firebase.firestore().collection(`${t}rewards`);

// Sizings
const fontSize = 20;
const padding = 15;

// Colors
const green = '#00a99d';
const black = '#37474f';
const grey = '#546e7a';
const lightGrey = '#b0bec5';
const fairyGrey = 'f2f1ff';
const mainColor = lightGrey;

export {
  usersDB,
  t,
  TESTING,
  rewardsDB,

  // Sizing
  padding,
  fontSize,

  // Colors
  mainColor,
  green,
  black,
  grey,
  lightGrey,
  fairyGrey,
};
