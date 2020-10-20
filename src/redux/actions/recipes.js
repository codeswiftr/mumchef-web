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
    },
    SET_ERROR: "RECIPE.ERROR",
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

export const saveNewRecipe = () => ({
  type: types.RECIPES.NEW.SAVE,
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
