import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import RecipeForm from "../recipes/RecipeForm";

function EditRecipePage({
  recipes = [],
  loadRecipes,
  saveRecipe,
  history,
  ...props
}) {
  const [recipe, setRecipe] = useState({ ...props.recipe });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (recipes.length === 0) {
      console.warn("# no recipes available ..");
    } else {
      setRecipe({ ...props.recipe });
    }
  }, [props.recipes, recipes.length, props.recipe]);

  function handleChange(event) {
    const { name, value, files } = event.target;

    console.log(event.target);
    // debugger;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: name === "photoUrl" ? URL.createObjectURL(files[0]) : value,
    }));
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
    saveRecipe(recipe)
      .then(() => {
        toast.success("Recipe saved.");
        history.push("/recipes");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return recipes === 0 ? (
    <Spinner />
  ) : (
    <RecipeForm
      recipe={recipe}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const recipe = state.recipes.list.find((recipe) => recipe.id === id) || null;
  return {
    recipe,
    recipes: state.recipes.list,
    aggregate: state.aggregate,
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipePage);
