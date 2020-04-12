import { UPDATE_RECIPE, ADD_RECIPE, REMOVE_RECIPE, FETCH_RECIPES, REMOVE_ALL_RECIPES } from './actionTypes';

export const fetchRecipes = recipes => {
  return {
    type: FETCH_RECIPES,
    payload: recipes,
  };
};

export const removeAllRecipes = () => {
  return {
    type: REMOVE_ALL_RECIPES,
  };
};

export const addRecipe = recipe => {
  return {
    type: ADD_RECIPE,
    payload: recipe,
  };
};

export const updateRecipeFields = fields => {
  return {
    type: UPDATE_RECIPE,
    payload: fields,
  };
};

export const removeRecipe = id => {
  return {
    type: REMOVE_RECIPE,
    payload: id,
  };
};
