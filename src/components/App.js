import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, Switch } from "react-router-dom";
import Header from "./common/Header";

import RecipesPage from "./pages/RecipesPage";
import EditRecipePage from "./pages/EditRecipePage";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
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
