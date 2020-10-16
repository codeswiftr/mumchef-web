import {
  all,
  call,
  fork,
  select,
  takeEvery,
  take,
  cancel,
  takeLatest,
} from "redux-saga/effects";

import { types, syncRecipes } from "../actions/recipes";

import rsf from "../rsf";

function* saveNewRecipe() {
  const user = yield select((state) => state.login.user);
  const newRecipe = yield select((state) => state.recipes.new);

  yield call(rsf.database.create, "recipes_patthy", {
    creator: user ? user.uid : null,
    done: false,
    label: newRecipe,
  });
}

function* setRecipeStatus(action) {
  yield call(rsf.database.patch, `recipes_patthy/${action.recipeId}`, {
    done: action.done,
  });
}

const recipesTransformer = ({ value }) => {
  console.log("# recipe transfromer: ", value);
  return Object.keys(value).map((key) => ({
    ...value[key],
    id: key,
  }));
};

function* syncRecipesSaga() {
  console.log("@ syncRecipesSaga.. ");

  // Start the sync saga
  let task = yield fork(rsf.database.sync, "recipes_patthy", {
    successActionCreator: syncRecipes,
    transform: recipesTransformer,
  });

  // Wait for the logout action, then stop sync
  yield take("LOGOUT");
  yield cancel(task);
}

export default function* rootSaga() {
  yield takeLatest("LOGIN.SUCCESS", syncRecipesSaga);
  console.log("@ recipes root SAga");
  yield all([
    fork(syncRecipesSaga),
    takeEvery(types.RECIPES.NEW.SAVE, saveNewRecipe),
    takeEvery(types.RECIPES.SET_STATUS, setRecipeStatus),
  ]);
}
