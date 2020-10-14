import * as ActionTypes from "./actionTypes";
export function beginApiCall(params) {
  return { type: ActionTypes.BEGIN_API_CALL, params };
}
export function apiCallError(params) {
  return { type: ActionTypes.API_CALL_ERROR, params };
}
