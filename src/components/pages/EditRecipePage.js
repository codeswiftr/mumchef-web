import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import RecipeForm from "../recipes/RecipeForm";
import {
  findRecipe,
  setName,
  setCookMinutes,
  setPrepMinutes,
  setError,
  setAllergens,
  setCategories,
  setPhotoUrl,
  setPhotoFile,
  uploadPhoto,
  setYield,
  updateIngredient,
  updateStep,
  addStep,
  addIngredient,
  saveRecipe,
  resetRecipe,
} from "../../redux/actions/recipes";
import CircularProgress from "@material-ui/core/CircularProgress";
function EditRecipePage({
  recipes = [],
  loadRecipes,
  saveRecipe,
  history,
  findRecipe,
  setName,
  setCookMinutes,
  setPrepMinutes,
  setError,
  setYield,
  setAllergens,
  setCategories,
  setPhotoUrl,
  setPhotoFile,
  uploadPhoto,
  updateIngredient,
  updateStep,
  addIngredient,
  addStep,
  resetRecipe,
  recipe,
  match: { params },
  ...props
}) {
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (recipes.length === 0) {
      console.warn("# no recipes available ..");
      if (params.id !== "new") {
        findRecipe(params.id);
      } else {
        resetRecipe();
      }
    }
  }, [params.id, recipes.length, findRecipe, resetRecipe]);

  function formIsValid() {
    const { name } = recipe;
    const errors = {};

    if (!name) errors.title = "name is required.";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    console.log("@ handleSaveRecipe: ", recipe);
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveRecipe(recipe);
  }

  return recipes === 0 ? (
    <CircularProgress />
  ) : (
    <RecipeForm
      selectedRecipe={recipe}
      errors={errors}
      onSave={handleSave}
      saving={saving}
      setName={setName}
      setError={setError}
      setYield={setYield}
      setAllergens={setAllergens}
      setCategories={setCategories}
      setCookMinutes={setCookMinutes}
      setPrepMinutes={setPrepMinutes}
      setPhotoUrl={setPhotoUrl}
      setPhotoFile={setPhotoFile}
      uploadPhoto={uploadPhoto}
      updateIngredient={updateIngredient}
      updateStep={updateStep}
      addIngredient={addIngredient}
      addStep={addStep}
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
  setName,
  setCookMinutes,
  setPrepMinutes,
  setYield,
  setError,
  setAllergens,
  setCategories,
  setPhotoUrl,
  setPhotoFile,
  uploadPhoto,
  updateIngredient,
  updateStep,
  addIngredient,
  addStep,
  saveRecipe,
  resetRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipePage);
