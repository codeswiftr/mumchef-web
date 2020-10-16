import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import RecipeList from "../recipes/RecipeList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

const RecipesPage = ({ recipes, history, syncRecipes, ...props }) => {
  // useEffect(() => {
  //   syncRecipes();
  // }, []);

  function handleDeleteRecipe(recipe) {
    toast.success("Recipe deleted");
  }
  return (
    <>
      <h2>Baby Friendly Recipes</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <button
            style={{ marginBottom: 20 }}
            className='btn btn-primary add-recipe'>
            Add Recipe
          </button>

          <RecipeList recipes={recipes} onDeleteClick={handleDeleteRecipe} />
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
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipesPage);
