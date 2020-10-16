import { all, fork } from "redux-saga/effects";

import login from "./login";
import recipes from "./recipes";

export default function* rootSaga() {
  yield all([fork(login), fork(recipes)]);
}
