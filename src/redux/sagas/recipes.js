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

import {
  types,
  syncRecipes,
  selectRecipe,
  setPhotoUrl,
} from "../actions/recipes";

import rsf from "../rsf";

function* saveRecipe() {
  const user = yield select((state) => state.login.user);
  const newRecipe = yield select((state) => state.recipes.selected);
  const recipeId = newRecipe.id || stringToSlug(newRecipe.name);
  console.log("# SAGA saveRecipe:", user, newRecipe);

  yield call(rsf.database.patch, `recipes_web/${recipeId}`, {
    ...newRecipe,
    creator: user ? user.uid : null,
    approved: false,
  });
}

function* setRecipeStatus(action) {
  yield call(rsf.database.patch, `recipes_web/${action.recipeId}`, {
    done: action.done,
  });
}

const recipesTransformer = ({ value }) => {
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

  const recipe = recipes.find((item) => {
    return item.id === recipeId;
  });
  yield put(selectRecipe(recipe));
}

function* syncRecipesSaga() {
  // Start the sync saga
  let task = yield fork(rsf.database.sync, "recipes_web", {
    successActionCreator: syncRecipes,
    transform: recipesTransformer,
  });

  // Wait for the logout action, then stop sync
  yield take("LOGOUT");
  yield cancel(task);
}
function stringToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}

function* syncPhotoUrl(filePath) {
  try {
    const url = yield call(rsf.storage.getDownloadURL, filePath);
    yield put(setPhotoUrl(url));
  } catch (error) {
    console.error(error);
  }
}

function* uploadFileSaga(action) {
  const recipes = yield select((state) => state.recipes);
  const file = recipes.photoFile;
  console.log("### SAGA:", file.name, action.filename);
  const filePath = `recipes/${stringToSlug(recipes.selected.name)}-${
    file.name
  }`;
  const task = rsf.storage.uploadFile(filePath, file);

  task.on("state_changed", (snapshot) => {
    const percentage = (snapshot.bytesTransferred * 100) / snapshot.totalBytes;
    console.log(`${percentage}%`);
  });

  yield task;

  yield call(syncPhotoUrl, filePath);
}

export default function* rootSaga() {
  yield all([
    fork(syncRecipesSaga),
    takeEvery(types.RECIPE.SAVE, saveRecipe),
    takeEvery(types.RECIPES.SET_STATUS, setRecipeStatus),
    takeEvery(types.RECIPE.FIND, selectRecipeSaga),
    takeEvery(types.RECIPE.UPLOAD_FILE, uploadFileSaga),
  ]);
}
