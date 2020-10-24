import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";

import RecipesPage from "./pages/RecipesPage";
import EditRecipePage from "./pages/EditRecipePage";
import { SnackbarProvider } from "notistack";
import MuiAlert from "@material-ui/lab/Alert";
import styled from "styled-components";
function BaseAlert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}
export const Alert = styled(BaseAlert)`
  position: fixed;
  z-index: 999;
  bottom: 20px;
`;

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={6000}>
      <Header />
      <Switch>
        <Route exact path='/' component={RecipesPage} />
        <Route path='/about' component={HomePage} />
        <Route path='/recipes' component={RecipesPage} />
        <Route path='/recipe/:id' component={EditRecipePage} />
      </Switch>
    </SnackbarProvider>
  );
}

export default App;
