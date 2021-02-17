import firebase from "firebase/app";

import "firebase/database";
import "firebase/storage";
import "firebase/auth";

import ReduxSagaFirebase from "redux-saga-firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTeW3LH8TrY1G3ml_mTUQf65jE8D1pWE8",
  authDomain: "mumchef-io.firebaseapp.com",
  databaseURL: "https://mumchef-io.firebaseio.com",
  projectId: "mumchef-io",
  storageBucket: "mumchef-io.appspot.com",
  messagingSenderId: "114193726314",
  appId: "1:114193726314:web:f5e4d5d2bad3ad759b0313",
  measurementId: "G-YPLG2QQXFW",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
