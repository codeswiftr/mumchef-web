import firebase from "firebase/app";
import "firebase/auth";

import "firebase/database";
import { all, call, fork, put, take, takeEvery } from "redux-saga/effects";

import {
  types,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
} from "../actions/login";

import rsf from "../rsf";

const authProvider = new firebase.auth.GoogleAuthProvider();
authProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log("# onAuthStateChanged:", user);
  } else {
    // User is signed out.
    // ...
  }
});
function* loginSaga() {
  try {
    console.log("# login saga");
    const data = yield call(rsf.auth.signInWithRedirect, authProvider);
    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(function (result) {
        var user = result.user;
        loginSuccess(user);
      })
      .catch(function (error) {
        loginFailure(error);
      });

    console.log("# login saga:", data);
    // successful login will trigger the loginStatusWatcher, which will update the state
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* logoutSaga() {
  try {
    yield call(rsf.auth.signOut);
    // successful logout will trigger the loginStatusWatcher, which will update the state
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* loginStatusWatcher() {
  // events on this channel fire when the user logs in or logs out
  const channel = yield call(rsf.auth.channel);
  console.log("# loginStatusWatcher - waiting for login");
  while (true) {
    const { user } = yield take(channel);
    if (user) {
      console.log("# logged in as :", user);
      yield put(loginSuccess(user));
    } else yield put(logoutSuccess());
  }
}

export default function* loginRootSaga() {
  yield fork(loginStatusWatcher);
  yield all([
    takeEvery(types.LOGIN.REQUEST, loginSaga),
    takeEvery(types.LOGOUT.REQUEST, logoutSaga),
  ]);
}
