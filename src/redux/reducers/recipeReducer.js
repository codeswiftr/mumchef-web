import { types } from "../actions/recipes";

const initialState = {
  list: [],
  new: "",
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.RECIPES.SYNC:
      return {
        ...state,
        list: action.recipes,
      };
    case types.RECIPES.NEW.CHANGE:
      return {
        ...state,
        new: action.todo,
      };
    default:
      return state;
  }
}
