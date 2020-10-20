export const types = {
  RECIPES: {
    SYNC: "RECIPES.SYNC",
    FIND: "RECIPES.FIND",
    SELECT: "RECIPES.SELECT",
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
};

export const syncRecipes = (recipes) => {
  // console.log("# sync recipes: ", recipes);
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
  type: types.RECIPES.FIND,
  recipeId: recipeId,
});

export const selectRecipe = (recipe) => ({
  type: types.RECIPES.SELECT,
  recipe: recipe,
});
