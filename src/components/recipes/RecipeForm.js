import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import SelectInput from "../common/SelectInput";
import ImageInput from "../common/ImageInput";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const RecipeForm = ({
  recipe,
  onChange,
  onSave,
  saving = false,
  errors = {},
}) => {
  const classes = useStyles();
  const theme = useTheme();

  // console.log(recipe);
  let allergens = recipe.allergens || [];
  allergens = allergens.filter((n) => n);
  return (
    <form onSubmit={onSave} className='col-5'>
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
      <TextArea
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

      <ImageInput
        className='img-thumbnail'
        name='photoUrl'
        label='Photo'
        value={recipe.photoUrl}
        onChange={onChange}
        error={errors.photoUrl}></ImageInput>

      <FormControl className={classes.formControl}>
        <InputLabel id='demo-mutiple-checkbox-label'>Tag</InputLabel>
        <Select
          name='allergens'
          labelId='demo-mutiple-checkbox-label'
          id='demo-mutiple-checkbox'
          multiple
          value={allergens}
          onChange={onChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}>
          {names.map((name, index) => (
            <MenuItem key={index} value={`${index}`}>
              <Checkbox checked={allergens.indexOf(index) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <button class='btn btn-primary' type='submit' onClick={onSave}>
        Submit Recipe
      </button>
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
