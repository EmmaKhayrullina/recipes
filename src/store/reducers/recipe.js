import { FETCH_RECIPE_DETAILS, RESET_APP } from '../actions/actionTypes';

const recipeReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_RECIPE_DETAILS:
      return action.payload;
    case RESET_APP:
      return null;
    default:
      return state;
  }
};

export default recipeReducer;
