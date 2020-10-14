import firebase from "firebase";
import "@firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAahah3SiynmPSKMNkW455KgZPW5OXq-RA",
  authDomain: "babyledweaning-cb434.firebaseapp.com",
  databaseURL: "https://babyledweaning-cb434.firebaseio.com",
  projectId: "babyledweaning-cb434",
  storageBucket: "babyledweaning-cb434.appspot.com",
  messagingSenderId: "1096686494299",
  appId: "1:1096686494299:web:155f30e582b43015f1957e",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const rsf = new ReduxSagaFirebase(firebaseApp);

export default rsf;
