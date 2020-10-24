import React from "react";
import { connect } from "react-redux";
import RecipeList from "../recipes/RecipeList";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import { selectRecipe, resetRecipe } from "../../redux/actions/recipes";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useHistory } from "react-router-dom";
const RecipesPage = ({
  recipes,
  syncRecipes,
  selectRecipe,
  resetRecipe,
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
  };
}

const mapDispatchToProps = {
  // syncRecipes,
  selectRecipe,
  resetRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);
