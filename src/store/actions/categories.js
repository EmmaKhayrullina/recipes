import { FETCH_CATEGORIES } from './actionTypes';

const fetchCategories = categories => {
  return {
    type: FETCH_CATEGORIES,
    categories,
  };
};

export default fetchCategories;
