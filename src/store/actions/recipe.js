import { FETCH_RECIPE_DETAILS } from './actionTypes';

const fetchRecipe = recipeDetails => {
  return {
    type: FETCH_RECIPE_DETAILS,
    payload: recipeDetails,
  };
};

export default fetchRecipe;
