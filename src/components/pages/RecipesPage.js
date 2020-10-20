import React from "react";
import { connect } from "react-redux";
import RecipeList from "../recipes/RecipeList";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSnackbar } from "notistack";
const RecipesPage = ({ recipes, history, syncRecipes, ...props }) => {
  const { enqueueSnackbar } = useSnackbar();
  function handleDeleteRecipe(recipe) {
    enqueueSnackbar("Recipe deleted", { variant: "success" });
  }
  return (
    <>
      <h2>Baby Friendly Recipes</h2>
      {props.loading ? (
        <CircularProgress />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className='btn btn-primary add-recipe'>
            Add Recipe
          </button>

          <RecipeList
            recipes={recipes}
            onSelectRecipe={selectRecipe}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);
