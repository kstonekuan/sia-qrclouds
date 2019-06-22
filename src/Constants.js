import firebase from 'react-native-firebase';

const currentVersion = 0;
const TESTING = false;
const t = TESTING ? 'test_' : '';

const usersDB = firebase.firestore().collection(`${t}users`);
const tasksDB = firebase.firestore().collection(`${t}tasks`);
const offersDB = firebase.firestore().collection(`${t}offers`);
const taskAlertDB = firebase.firestore().collection(`${t}taskAlertPermission`);
const taskFilterDB = firebase.firestore().collection(`${t}taskFilter`);
const listingDB = firebase.firestore().collection(`${t}itemListings`);

const notifsDB = firebase.firestore().collection(`${t}notifications`);
const chatDB = firebase.firestore().collection(`${t}chat`);
const reportsDB = firebase.firestore().collection(`${t}reports`);
const rewardsDB = firebase.firestore().collection(`${t}rewards`);

const minPrice = 0; // Minimum offer amount

// Sizings
const fontSize = 20;
const padding = 15;

// Colors
const green = '#00a99d';
const black = '#37474f';
const grey = '#546e7a';
const lightGrey = '#b0bec5';
const fairyGrey = 'f2f1ff';
const mainColor = green;

export {
  usersDB,
  tasksDB,
  offersDB,
  notifsDB,
  chatDB,
  reportsDB,
  minPrice,
  currentVersion,
  taskAlertDB,
  t,
  taskFilterDB,
  listingDB,
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
