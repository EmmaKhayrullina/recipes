import { FETCH_RECIPES, ADD_RECIPE, REMOVE_RECIPE, UPDATE_RECIPE, RESET_APP } from '../actions/actionTypes';

const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.payload;
    case ADD_RECIPE:
      return [...state, action.payload];
    case UPDATE_RECIPE:
      return state.map(recipe => {
        return recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe;
      });
    case REMOVE_RECIPE:
      return state.filter(recipe => recipe.id !== action.payload);
    case RESET_APP:
      return [];
    default:
      return state;
  }
};

export default recipesReducer;
