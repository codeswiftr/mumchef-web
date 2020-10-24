import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const enhancers = compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(routerMiddleware(history)),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

const store = createStore(createRootReducer(history), enhancers);

sagaMiddleware.run(rootSaga);

export default store;
