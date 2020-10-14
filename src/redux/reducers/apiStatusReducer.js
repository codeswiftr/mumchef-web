import * as ActionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function apiCallStatusReducer(
  state = initialState.apiCallsInProgress,
  action = { type: "" }
) {
  if (action.type === ActionTypes.BEGIN_API_CALL) {
    return state + 1;
  } else if (
    action.type === ActionTypes.API_CALL_ERROR ||
    action.type.endsWith(action.type)
  ) {
    return state - 1;
  }
  return state;
}
