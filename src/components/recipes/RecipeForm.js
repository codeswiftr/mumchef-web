import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

// Recipe name
// Photos
// Preparation time (if possible, not mandatory)
// Cook time (if possible, not mandatory)
// Difficulty (if possible, not mandatory)
// Yield
// Ingredients
// Instructions
// Allergens
// Categories
// Short description (if possible, not mandatory)
// Tips for making it tasty for adults as well (where possible, not mandatory)

const RecipeForm = ({
  recipe,
  onChange,
  onSave,
  saving = false,
  errors = {},
}) => {
  console.log(recipe);
  return (
    <form onSubmit={onSave}>
      <h2>{recipe.id ? "Edit" : "Add"} Recipe</h2>
      {errors.onSave && (
        <div className='alert alert-danger' role='alert'>
          {errors.onSave}
        </div>
      )}
      <TextInput
        name='name'
        label='Recipe Name'
        value={recipe.name}
        onChange={onChange}
        error={errors.name}
      />
      <TextInput
        name='description'
        label='Short description'
        value={recipe.description}
        onChange={onChange}
        error={errors.description}
      />
      <TextInput
        name='yield'
        label='Yield'
        value={recipe.yield}
        onChange={onChange}
        error={errors.yield}
      />

      <img className='img-thumbnail' src={recipe.photoUrl} alt='Recipe' />

      <div className='custom-file'>
        <input
          type='file'
          className='custom-file-input'
          id='inputGroupFile01'
          aria-describedby='inputGroupFileAddon01'
        />

        <label className='custom-file-label' htmlFor='inputGroupFile01'>
          Choose file
        </label>
      </div>
    </form>
  );
};

RecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
};
export default RecipeForm;
