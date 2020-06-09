import { combineReducers } from 'redux';
import appReducer from './app';
import userReducer from './user';
import recipesReducer from './recipes';
import categoriesReducer from './categories';
import recipeReducer from './recipe';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  recipes: recipesReducer,
  categories: categoriesReducer,
  recipe: recipeReducer,
});

export default rootReducer;
