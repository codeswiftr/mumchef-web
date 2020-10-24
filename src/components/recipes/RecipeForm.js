import React, { useState } from "react";

import styled from "styled-components";
import Button from "@material-ui/core/Button";
import MultipleSelect from "../common/MultipleSelect";

import ImageInput from "../common/ImageInput";
import TimeSlider from "../common/TimeSlider";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";

import initialState from "../../redux/reducers/initialState";

const PhotoInput = styled(ImageInput)`
  bacground: red;
  background-color: blue;
  width: 300px;
`;

const StyledPaper = styled(Paper)`
  min-width: 375px;
  padding: 16px;
  max-width: 100%;
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
  min-width: 300px;
  width: 100%;
`;

const AddButton = styled(StyledButton)`
  background-color: #4caf50;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  &:hover {
    background-color: #5469d4;
  }
  & .MuiButton-label {
    color: #fff;
  }
  min-width: 300px;
`;

const StyledForm = styled(FormControl)`
  min-width: 300px;
  padding: 8px;
  width: 100%;
`;

const StepField = styled(TextField)`
  width: 100%;
  margin: 8px 0;
`;

const IngredientField = styled(TextField)`
  width: 65%;
  margin: 8px 0;
  margin-right: 5%;
`;
const TagField = styled(TextField)`
  width: 30%;
  margin: 8px 0;
`;
const StyledDivider = styled(Divider)`
  margin: 80px 0 0 0;
`;

const RecipeForm = ({
  selectedRecipe = {
    allergens: {},
  },
  onSave,
  saving = false,
  aggregate = initialState.aggregate,
  setName,
  setError,
  setYield,
  setCookMinutes,
  setPrepMinutes,
  setAllergens,
  setCategories,
  setPhotoUrl,
  setPhotoFile,
  uploadPhoto,
  addIngredient,
  addStep,
  updateIngredient,
  updateStep,
  saveRecipe,
  errors = {},
  ...props
}) => {
  const newRecipe = {
    allergens: {},
    yield: 2,
    cookMinutes: 15,
    prepMinutes: 15,
  };
  const recipe = selectedRecipe || newRecipe;

  const [newIngredient, setNewIngredient] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newStep, setNewStep] = useState("");

  const handleChange = (event) => {
    const title = event.target.value;

    if (title.length === 0) {
      setError("Please enter title");
    } else {
      setError("");
      setName(title);
    }
  };

  const handleIngredientChange = (index, field, value) => {
    console.log("#handleIngredientChange:", { index, field, value });
    updateIngredient(index, field, value);
  };

  const handleStepChange = (index, value) => {
    console.log("#handleStepChange:", { index, value });

    updateStep(index, value);
  };

  const handleNewIngredient = () => {
    console.log("@ handleNewIngredient:", { newIngredient, newTag });
    addIngredient(newIngredient, newTag);
    setNewIngredient("");
    setNewTag("");
  };

  const handleNewStep = () => {
    console.log("@ handleNewStep:", newStep);
    addStep(newStep);
    setNewStep("");
  };

  const handleYieldChange = (event, newValue) => {
    setYield(newValue);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setPhotoFile(file);
    uploadPhoto();
  };
  return (
    <>
      <StyledPaper>
        <StyledForm>
          <Typography variant='h3' component='h4'>
            {recipe && recipe.id ? "Edit" : "Add"} Recipe
          </Typography>
          <TextField
            required
            label='Recipe Name'
            variant='outlined'
            margin='dense'
            value={recipe.name}
            onChange={handleChange}
          />

          <PhotoInput
            className='img-thumbnail'
            name='photoUrl'
            label='Photo'
            value={recipe.photoUrl}
            onChange={handleImageChange}
            error={errors.photoUrl}></PhotoInput>

          <TimeSlider
            id='prepTime'
            label='Preparation Minutes'
            value={recipe.prepMinutes}
            setValue={setPrepMinutes}
          />
          <TimeSlider
            id='cookTime'
            label='Cooking Minutes'
            value={recipe.cookMinutes}
            setValue={setCookMinutes}
          />
          <Typography id='discrete-slider-restrict' gutterBottom>
            Portions yielded
          </Typography>
          <Slider
            value={recipe.yield}
            max={20}
            marks={[
              {
                value: 1,

                label: "1",
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
                label: "16",
              },
              {
                value: 20,

                label: "20",
              },
            ]}
            step={null}
            aria-labelledby='discrete-slider-restrict'
            valueLabelDisplay='on'
            onChange={handleYieldChange}
          />
          <StyledDivider />
          <MultipleSelect
            options={aggregate.allergens}
            values={recipe.allergens}
            setValues={setAllergens}
            label='Allergens'></MultipleSelect>

          <StyledDivider />
          <MultipleSelect
            options={aggregate.categories}
            values={recipe.categories}
            setValues={setCategories}
            label='Categories'></MultipleSelect>
          <StyledDivider />
        </StyledForm>
      </StyledPaper>

      <StyledPaper>
        <Typography variant='h4' component='h5'>
          Ingredients
        </Typography>
        {recipe.ingredients &&
          recipe.ingredients.map((item, index) => {
            // console.log(`# ${item.fullDescription}:${index} `);
            return (
              <div key={item.fullDescription}>
                <Divider />
                <IngredientField
                  required
                  label='Ingredient'
                  variant='filled'
                  margin='dense'
                  value={item.fullDescription}
                  index={index}
                  onChange={(e) => {
                    handleIngredientChange(
                      index,
                      "fullDescription",
                      e.target.value
                    );
                  }}
                />
                <TagField
                  required
                  label='Tag'
                  variant='filled'
                  margin='dense'
                  value={item.name}
                  index={index}
                  onChange={(e) => {
                    handleIngredientChange(index, "name", e.target.value);
                  }}
                />
                <Divider />
              </div>
            );
          })}
        <Divider />
        <IngredientField
          required
          label='new ingredient'
          placeholder='ingredient and quantity'
          variant='filled'
          margin='dense'
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <TagField
          required
          label='new tag'
          placeholder='tag'
          variant='filled'
          margin='dense'
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <Divider />
        <AddButton onClick={handleNewIngredient}>Save Ingredient</AddButton>
        <StyledDivider />
      </StyledPaper>

      <StyledPaper>
        <Typography variant='h4' component='h5'>
          Steps
        </Typography>
        {recipe.instructions &&
          recipe.instructions.map((item, index) => {
            return (
              <StepField
                key={`step-${index}`}
                label='step'
                value={item.description}
                onChange={(e) => handleStepChange(index, e.target.value)}
                multiline
                variant='filled'
              />
            );
          })}
        <StepField
          id='new-step'
          label='new step'
          placeholder='instructions'
          variant='filled'
          multiline
          value={newStep}
          onChange={(e) => setNewStep(e.target.value)}
        />
        <AddButton onClick={handleNewStep} color='secondary'>
          Save Step
        </AddButton>
        <StyledDivider />

        <StyledButton onClick={onSave}>Submit</StyledButton>
      </StyledPaper>
    </>

    // </form>
  );
};

export default RecipeForm;
