import initialState from "./initialState";

export default function aggregateReducer(
  state = initialState.aggregate,
  action = {}
) {
  switch (action.type) {
    default:
      return state;
  }
}
