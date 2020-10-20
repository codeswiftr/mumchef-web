import { types } from "../actions/recipes";

const initialState = {
  list: [],
  new: "",
  selected: null,
  loading: true,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECIPES.SYNC:
      return {
        ...state,
        list: action.recipes,
        loading: false,
      };
    case types.RECIPES.SELECT:
      return {
        ...state,
        selected: action.recipe,
      };
    case types.RECIPES.NEW.CHANGE:
      return {
        ...state,
        new: action.recipe,
      };
    default:
      return state;
  }
}
