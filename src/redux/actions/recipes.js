export const types = {
  RECIPES: {
    SYNC: "RECIPES.SYNC",
    SET_STATUS: "RECIPES.SET_STATUS",
    NEW: {
      CHANGE: "RECIPES.NEW.CHANGE",
      SAVE: "RECIPES.NEW.SAVE",
    },
    SET_FIRESTORE: "RECIPES.SET_FIRESTORE",
    LOAD: {
      REQUEST: "RECIPES.LOAD.REQUEST",
      SUCCESS: "RECIPES.LOAD.REQUEST",
    },
  },
  RECIPE: {
    SELECT: "RECIPE.SELECT",
    FIND: "RECIPE.FIND",
    UPDATE: {
      NAME: "RECIPE.UPDATE.NAME",
      YIELD: "RECIPE.UPDATE.YIELD",
      PREP_MINUTES: "RECIPE.UPDATE.PREP_MINUTES",
      COOK_MINUTES: "RECIPE.UPDATE.COOK_MINUTES",
      PHOTO_URL: "RECIPE.UPDATE.PHOTO_URL",

      ALLERGENS: "RECIPE.UPDATE.ALLERGENS",
      CATEGORIES: "RECIPE.UPDATE.CATEGORIES",
      INGREDIENT: "RECIPE.UPDATE.INGREDIENTS",
      STEP: "RECIPE.UPDATE.STEP",
    },
    SAVE: "RECIPE.SAVE",
    ADD: {
      INGREDIENT: "RECIPE.ADD.INGREDIENTS",
      STEP: "RECIPE.ADD.STEP",
    },

    SET_ERROR: "RECIPE.ERROR",
    SET_FILE: "RECIPE.FILE",
    UPLOAD_FILE: "UPLOAD.FILE",
  },
};

export const syncRecipes = (recipes) => {
  return {
    type: types.RECIPES.SYNC,
    recipes,
  };
};

export const changeNewRecipe = (recipe) => ({
  type: types.RECIPES.NEW.CHANGE,
  recipe,
});

export const saveRecipe = () => ({
  type: types.RECIPE.SAVE,
});

export const findRecipe = (recipeId) => ({
  type: types.RECIPE.FIND,
  recipeId: recipeId,
});

export const selectRecipe = (recipe) => ({
  type: types.RECIPE.SELECT,
  recipe: recipe,
});
export const setName = (name) => ({
  type: types.RECIPE.UPDATE.NAME,
  name,
});
export const setYield = (portions) => ({
  type: types.RECIPE.UPDATE.YIELD,
  yield: portions,
});
export const setPrepMinutes = (prepMinutes) => ({
  type: types.RECIPE.UPDATE.PREP_MINUTES,
  prepMinutes,
});
export const setCookMinutes = (cookMinutes) => ({
  type: types.RECIPE.UPDATE.COOK_MINUTES,
  cookMinutes,
});

export const setError = (error) => ({
  type: types.RECIPE.SET_ERROR,
  error,
});

export const setAllergens = (allergens) => ({
  type: types.RECIPE.UPDATE.ALLERGENS,
  allergens,
});

export const setCategories = (categories) => ({
  type: types.RECIPE.UPDATE.CATEGORIES,
  categories,
});

export const setPhotoUrl = (photoUrl) => ({
  type: types.RECIPE.UPDATE.PHOTO_URL,
  photoUrl,
});

export const setPhotoFile = (file) => ({
  type: types.RECIPE.SET_FILE,
  file,
});

export const uploadPhoto = () => ({
  type: types.RECIPE.UPLOAD_FILE,
});

export const updateIngredient = (index, field, value) => ({
  type: types.RECIPE.UPDATE.INGREDIENT,
  index,
  item: { [field]: value },
});

export const updateStep = (index, step) => ({
  type: types.RECIPE.UPDATE.STEP,
  index,
  item: { description: step },
});

export const addStep = (step) => ({
  type: types.RECIPE.ADD.STEP,
  item: { description: step },
});

export const addIngredient = (ingredient, tag) => ({
  type: types.RECIPE.ADD.INGREDIENT,
  item: {
    fullDescription: ingredient,
    name: tag,
  },
});
