import { createSelector } from "reselect";

import initialState from "./reducers/initialState";

const selectGlobal = (state) => state || initialState;
const makeSelectLoading = createSelector(
  selectGlobal,
  ({ loading }) => loading
);

const makeSelectUser = createSelector(selectGlobal, ({ user }) => user);

const makeSelectError = createSelector(selectGlobal, ({ error }) => error);
const makeSelectAggregate = createSelector(
  selectGlobal,
  ({ aggregate }) => aggregate
);

const makeSelectAvailableAllergens = createSelector(
  makeSelectAggregate,
  ({ allergens }) => allergens
);

const makeSelectAvailableCategories = createSelector(
  makeSelectAggregate,
  ({ categories }) => categories
);
