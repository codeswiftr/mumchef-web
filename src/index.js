import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./components/App";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./redux/store";
import { Provider as ReduxProvider } from "react-redux";
import "whatwg-fetch";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <ReduxProvider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </ReduxProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
