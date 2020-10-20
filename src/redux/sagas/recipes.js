import {
  all,
  call,
  fork,
  select,
  takeEvery,
  take,
  cancel,
  put,
} from "redux-saga/effects";

import { types, syncRecipes, selectRecipe } from "../actions/recipes";

import rsf from "../rsf";

function* saveNewRecipe() {
  const user = yield select((state) => state.login.user);
  const newRecipe = yield select((state) => state.recipes.new);

  yield call(rsf.database.create, "recipes_web", {
    creator: user ? user.uid : null,
    done: false,
    label: newRecipe,
  });
}

function* setRecipeStatus(action) {
  yield call(rsf.database.patch, `recipes_web/${action.recipeId}`, {
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

function* waitFor(selector) {
  if (yield select(selector)) return; // (1)

  while (true) {
    yield take("*"); // (1a)
    if (yield select(selector)) return; // (1b)
  }
}

function* selectRecipeSaga({ recipeId }) {
  yield call(waitFor, (state) => state.recipes.list[0]);

  const recipes = yield select((state) => state.recipes.list);

  // {
  //   console.log(recipeId, state.recipes);
  //   return state.recipes.list.find((item) => {
  //     console.log("#--->", item.id);
  //     return item.id === recipeId;
  //   });
  // });
  const recipe = recipes.find((item) => {
    console.log("@--->", item.id, recipeId);
    return item.id === recipeId;
  });
  console.log("# FOUND:", recipe);
  yield put(selectRecipe(recipe));
}

function* syncRecipesSaga() {
  console.log("@ syncRecipesSaga.. ");

  // Start the sync saga
  let task = yield fork(rsf.database.sync, "recipes_web", {
    successActionCreator: syncRecipes,
    transform: recipesTransformer,
  });

  // Wait for the logout action, then stop sync
  yield take("LOGOUT");
  yield cancel(task);
}

export default function* rootSaga() {
  // yield takeLatest("LOGIN.SUCCESS", syncRecipesSaga);
  console.log("@ recipes root SAga");
  yield all([
    fork(syncRecipesSaga),
    takeEvery(types.RECIPES.NEW.SAVE, saveNewRecipe),
    takeEvery(types.RECIPES.SET_STATUS, setRecipeStatus),
    takeEvery(types.RECIPES.FIND, selectRecipeSaga),
  ]);
}
