import React from "react";
import { connect } from "react-redux";
import RecipeList from "../recipes/RecipeList";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import {
  selectRecipe,
  resetRecipe,
  consumeSnack,
} from "../../redux/actions/recipes";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from "react-router-dom";
import { Alert } from "../App";
const RecipesPage = ({
  recipes,
  syncRecipes,
  selectRecipe,
  resetRecipe,
  snack,
  consumeSnack,
  ...props
}) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  function handleDeleteRecipe(recipe) {
    enqueueSnackbar("Recipe deleted", { variant: "success" });
  }

  function handleSelectRecipe(recipe) {
    selectRecipe(recipe);
    history.push(`/recipe/${recipe.id}`);
  }
  return (
    <>
      <h2>Baby Friendly Recipes</h2>

      {snack && (
        <Alert onClose={consumeSnack} severity={snack.severity}>
          {snack.message}
        </Alert>
      )}
      {props.loading ? (
        <CircularProgress />
      ) : (
        <>
          <Button
            variant='contained'
            color='primary'
            startIcon={<AddCircleIcon />}
            onClick={() => {
              resetRecipe();
              history.push(`/recipe/new`);
            }}>
            Add recipe
          </Button>

          <RecipeList
            recipes={recipes}
            onSelectRecipe={handleSelectRecipe}
            onDeleteClick={handleDeleteRecipe}
          />
        </>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    recipes: state.recipes.list,
    snack: state.recipes.snack,
  };
}

const mapDispatchToProps = {
  // syncRecipes,
  selectRecipe,
  resetRecipe,
  consumeSnack,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);
