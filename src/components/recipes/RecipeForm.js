import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import SelectInput from "../common/SelectInput";
import ImageInput from "../common/ImageInput";
import TimeSlider from "../common/TimeSlider";
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
import Paper from "@material-ui/core/Paper";
import _ from "lodash";

import initialState from "../../redux/reducers/initialState";

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
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
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
  aggregate = initialState.aggregate,
  errors = {},
}) => {
  const classes = useStyles();
  const theme = useTheme();

  // console.log(recipe);
  let allergens = recipe.allergens || {};
  // allergens = { ...allergens, test: false, test2: true };
  allergens = _.keys(_.pickBy(allergens, (v) => v));

  console.log(aggregate.allergens);
  // Recipe name -- text
  // Photos

  // Yield --> slider
  // Ingredients --> text array
  // Instructions --> text array
  // Allergens --> multiple select
  // Categories -. multiple select

  // Short description (if possible, not mandatory) -text area
  // Preparation time (if possible, not mandatory) - slider\
  // Cook time (if possible, not mandatory) --> slider
  // Difficulty (if possible, not mandatory) ---> slect box
  // Tips for making it tasty for adults as well (where possible, not mandatory) --> text array

  return (
    <form onSubmit={onSave} className='col-5'>
      <h2>{recipe.id ? "Edit" : "Add"} Recipe</h2>
      {errors.onSave && (
        <div className='alert alert-danger' role='alert'>
          {errors.onSave}
        </div>
      )}

      <Paper elevation={0}>
        <TextInput
          name='name'
          label='Recipe Name'
          value={recipe.name}
          onChange={onChange}
          error={errors.name}
        />

        <ImageInput
          className='img-thumbnail'
          name='photoUrl'
          label='Photo'
          value={recipe.photoUrl}
          onChange={onChange}
          error={errors.photoUrl}></ImageInput>

        <TextInput
          name='yield'
          label='Yield'
          value={recipe.yield}
          onChange={onChange}
          error={errors.yield}
        />

        <TimeSlider></TimeSlider>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-checkbox-label'>Allergens</InputLabel>
          <Select
            name='allergens'
            labelId='demo-mutiple-checkbox-label'
            id='demo-mutiple-checkbox'
            multiple
            value={allergens}
            onChange={onChange}
            input={<Input />}
            renderValue={(selected) => {
              selected = selected.allergens || selected;
              // console.log(selected);
              return selected.join(", ");
            }}
            MenuProps={MenuProps}>
            {Object.entries(aggregate.allergens).map((item) => {
              const [name, index] = item;
              // debugger;
              return (
                <MenuItem key={name} value={`${name}`}>
                  <Checkbox checked={allergens.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Paper>

      <div>
        <TextArea
          name='description'
          label='Short description'
          value={recipe.description}
          onChange={onChange}
          error={errors.description}
        />
      </div>

      <button className='btn btn-primary' type='submit' onClick={onSave}>
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
