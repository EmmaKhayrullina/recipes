import { FETCH_CATEGORIES } from '../actions/actionTypes';

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
};

export default categoriesReducer;
