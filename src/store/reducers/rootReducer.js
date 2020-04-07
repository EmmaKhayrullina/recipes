import { combineReducers } from 'redux';
import appReducer from './app';
import userReducer from './user';
import recipesReducer from './recipes';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  recipes: recipesReducer,
});

export default rootReducer;
