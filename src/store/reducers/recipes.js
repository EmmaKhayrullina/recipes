import { FETCH_RECIPES, REMOVE_ALL_RECIPES, ADD_RECIPE, REMOVE_RECIPE, UPDATE_RECIPE } from '../actions/actionTypes';

const initialState = {
  // categories: [
  //   { value: 'salad', label: 'Salad' },
  //   { value: 'soup', label: 'Soup' },
  //   { value: 'cake', label: 'Cake' },
  // ],
  recipeList: [],
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return { ...state, recipeList: action.payload };
    case REMOVE_ALL_RECIPES:
      return { ...state, recipeList: [] };
    case ADD_RECIPE:
      return { ...state, recipeList: [...state.recipeList, action.payload] };
    case UPDATE_RECIPE:
      return {
        ...state,
        recipeList: state.recipeList.map(recipe => {
          return recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe;
        }),
      };
    case REMOVE_RECIPE:
      return { ...state, recipeList: state.recipeList.filter(recipe => recipe.id !== action.payload) };
    default:
      return state;
  }
};

export default recipesReducer;
