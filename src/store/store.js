import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

const saveToLocalStorage = state => {
  try {
    localStorage.setItem('userData', JSON.stringify(state));
  } catch (e) {
    throw new Error(e);
  }
};

const loadFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem('userData');
    if (userData === null) return undefined;
    return JSON.parse(userData);
  } catch (e) {
    throw new Error(e);
  }
};

const persistedState = loadFromLocalStorage();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable no-underscore-dangle */

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
