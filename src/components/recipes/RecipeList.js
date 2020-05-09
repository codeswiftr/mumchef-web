import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecipeList = ({ recipes, onDeleteClick }) => (
  <div className='card-columns'>
    {recipes.map((recipe) => {
      return (
        <div key={recipe.id} className='card'>
          <img className='card-img-top' src={recipe.photoUrl} alt='Recipe' />
          <div className='card-body'>
            <Link to={"/recipe/" + recipe.id} className='card-title'>
              <h5 className='card-title'>{recipe.name}</h5>
            </Link>

            <p className='card-text'>{recipe.description}</p>
            <button
              className='btn btn-outline-danger'
              onClick={() => onDeleteClick(recipe)}>
              Delete
            </button>
          </div>
        </div>
      );
    })}
  </div>
);

// RecipeList.propTypes = {
//     recipes = PropTypes.array.isRequired
// }

export default RecipeList;
