import { FETCH_RECIPES, REMOVE_ALL_RECIPES, ADD_RECIPE, REMOVE_RECIPE, UPDATE_RECIPE } from '../actions/actionTypes';

const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.payload;
    case REMOVE_ALL_RECIPES:
      return [];
    case ADD_RECIPE:
      return [...state, action.payload];
    case UPDATE_RECIPE:
      return state.map(recipe => {
        return recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe;
      });
    case REMOVE_RECIPE:
      return state.filter(recipe => recipe.id !== action.payload);
    default:
      return state;
  }
};

export default recipesReducer;
