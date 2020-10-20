import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: "rgba(255, 0, 0, 0.54)",
  },
}));
const RecipeList = ({ recipes, onDeleteClick, onSelectRecipe }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={3}>
        {recipes.map((recipe) => (
          <GridListTile key={recipe.photoUrl}>
            <img
              src={recipe.photoUrl}
              alt={recipe.name}
              onClick={() => onSelectRecipe(recipe)}
            />

            <GridListTileBar
              title={recipe.name}
              actionIcon={
                <IconButton
                  aria-label={`info about ${recipe.name}`}
                  className={classes.icon}
                  onClick={() => onDeleteClick(recipe)}>
                  <DeleteIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};
//  <div className='card-columns'>
//     {recipes.map((recipe) => {
//       return (
//         <div key={recipe.id} className='card p-3'>
//           <Link to={"/recipe/" + recipe.id} className='card-title'>
//             <img className='card-img-top' src={recipe.photoUrl} alt='Recipe' />
//           </Link>

//           <div className='card-body'>
//             <Link to={"/recipe/" + recipe.id} className='card-title'>
//               <h5 className='card-title'>{recipe.name}</h5>
//             </Link>

//             <p className='card-text'>{recipe.description}</p>
//             <button
//               className='btn btn-outline-danger'
//               onClick={() => onDeleteClick(recipe)}>
//               Delete
//             </button>
//           </div>
//         </div>
//       );
//     })}
//   </div>
// );

export default RecipeList;
