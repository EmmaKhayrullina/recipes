import { combineReducers } from 'redux';
import appReducer from './app';
import userReducer from './user';
import recipesReducer from './recipes';
import categoriesReducer from './categories';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  recipes: recipesReducer,
  categories: categoriesReducer,
});

export default rootReducer;
