import React from "react";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextInput from "../common/TextInput";
import TextArea from "../common/TextArea";
import SelectInput from "../common/SelectInput";
import ImageInput from "../common/ImageInput";
import TimeSlider from "../common/TimeSlider";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";

import initialState from "../../redux/reducers/initialState";

const PhotoInput = styled(ImageInput)`
  bacground: red;
  background-color: blue;
  width: 375px;
`;

const CustomPaper = styled(Paper)`
  bacground: cyan;
`;
const StyledButton = styled(Button)`
  background-color: #6772e5;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
  & .MuiButton-label {
    color: #fff;
  }
`;

const StyledForm = styled(FormControl)`
  ${({ theme }) => `
  min-width: 375px;
  margin-right: 8px;
`}
`;

const StyledDivider = styled(Divider)`
  margin: 80px 0 0 0;
`;
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

  console.log("#### RENDER:", recipe);
  return (
    // <form onSubmit={onSave}>
    //   <h2>{recipe.id ? "Edit" : "Add"} Recipe</h2>
    //   {errors.onSave && (
    //     <div className='alert alert-danger' role='alert'>
    //       {errors.onSave}
    //     </div>
    //   )}

    <StyledForm>
      <TextField
        required
        label='Recipe Name'
        variant='outlined'
        margin='dense'
        defaultValue={recipe.name}
      />

      <PhotoInput
        className='img-thumbnail'
        name='photoUrl'
        label='Photo'
        value={recipe.photoUrl}
        onChange={onChange}
        error={errors.photoUrl}></PhotoInput>

      <TimeSlider
        id='prepTime'
        label='Preparation Minutes'
        defaultValue={recipe.prepMinutes}
      />
      <TimeSlider
        id='cookTime'
        label='Cooking Minutes'
        defaultValue={recipe.cookMinutes}
      />
      <Typography id='discrete-slider-restrict' gutterBottom>
        Portions yielded
      </Typography>
      <Slider
        defaultValue={recipe.yield}
        max={20}
        marks={[
          {
            value: 1,
          },
          {
            value: 2,

            label: "2",
          },
          {
            value: 4,
            label: "4",
          },
          {
            value: 8,

            label: "8",
          },
          {
            value: 12,

            label: "12",
          },
          {
            value: 16,
          },
          {
            value: 20,
          },
        ]}
        step={null}
        aria-labelledby='discrete-slider-restrict'
        valueLabelDisplay='on'
      />
      <StyledDivider />
      <StyledForm>
        <InputLabel id='demo-mutiple-checkbox-label'>Allergens</InputLabel>
        {/* <Typography id='demo-mutiple-checkbox-label'>Allergens</Typography> */}
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
      </StyledForm>
      <StyledDivider />
      <StyledButton>Submit</StyledButton>
    </StyledForm>

    // </form>
  );
};

export default RecipeForm;
