export const CREATE_RECIPE = "CREATE_RECIPE";
export const LOAD_RECIPES_SUCCESS = "LOAD_RECIPES_SUCCESS";
export const CREATE_RECIPE_SUCCESS = "CREATE_RECIPE_SUCCESS";
export const UPDATE_RECIPE_SUCCESS = "UPDATE_RECIPE_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";
export const LOAD_AGREGATE_DATA_SUCCESS = "LOAD_AGREGATE_DATA_SUCCESS";
// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we're doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
export const DELETE_RECIPE_OPTIMISTIC = "DELETE_RECIPE_OPTIMISTIC";
