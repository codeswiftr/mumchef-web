import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import RecipeForm from "../recipes/RecipeForm";
import { findRecipe } from "../../redux/actions/recipes";
import CircularProgress from "@material-ui/core/CircularProgress";
function EditRecipePage({
  recipes = [],
  loadRecipes,
  saveRecipe,
  history,
  findRecipe,
  recipe,
  match: { params },
  ...props
}) {
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (recipes.length === 0) {
      console.warn("# no recipes available ..");
      findRecipe(params.id);
    }
  }, [props.recipes, recipes.length, props.recipe, findRecipe]);

  function handleChange(event) {
    const { name, value, files } = event.target;

    console.log(event.target);
    // TODO trigger action to alter the state
    // setRecipe((prevRecipe) => ({
    //   ...prevRecipe,
    //   [name]: name === "photoUrl" ? URL.createObjectURL(files[0]) : value,
    // }));
  }

  function formIsValid() {
    const { name, description } = recipe;
    const errors = {};

    if (!name) errors.title = "name is required.";
    if (!description) errors.author = "Desc is required";
    if (!recipe.yield) errors.category = "yield is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveRecipe(recipe);
  }

  console.log("# RENDER: ", props);
  return recipes === 0 ? (
    <CircularProgress />
  ) : (
    <RecipeForm
      selectedRecipe={recipe}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

function mapStateToProps(state) {
  return {
    recipe: state.recipes.selected,
    recipeId: state.recipes.recipeId,
    recipes: state.recipes.list,
    aggregate: state.aggregate,
  };
}

const mapDispatchToProps = {
  findRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipePage);
