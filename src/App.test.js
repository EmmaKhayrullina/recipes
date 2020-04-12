import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import rootReducer from './store/reducers/rootReducer';
import App from './App';
import user from './__mocks__/userData';
import categories from './__mocks__/categoriesData';
import recipes from './__mocks__/recipesData';

const initialState = {
  app: {
    isModalOpen: false,
    alert: null,
    filter: 'All',
  },
  user: {
    email: '',
    uid: '',
  },
  categories: [],
  recipes: [],
};

function renderWithRouter(
  component,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    store = createStore(rootReducer, initialState),
    ...options
  } = {},
) {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>{component}</Router>
      </Provider>,
      options,
    ),
    history,
    store,
  };
}

describe('App component', () => {
  test('should render login form', () => {
    // Arrange
    const route = '/login';

    // Act
    renderWithRouter(<App />, { route });

    // Assert
    expect(screen.getByTestId('test-login-form')).toMatchSnapshot();
  });

  test('should render registration form', () => {
    // Arrange
    const route = '/registration';

    // Act
    renderWithRouter(<App />, { route });

    // Assert
    expect(screen.getByTestId('test-registration-form')).toMatchSnapshot();
  });

  test('should render info page', () => {
    // Arrange
    const route = '/info';

    // Act
    renderWithRouter(<App />, { route });

    // Assert
    expect(screen.getByTestId('test-info-page')).toMatchSnapshot();
  });

  test('should render recipes page', async () => {
    // Arrange
    initialState.user = user;
    initialState.categories = categories;
    const route = '/';

    // Act
    await wait(() => renderWithRouter(<App />, { route }));

    // Assert
    await wait(() => expect(screen.getByTestId('test-recipes-page')).toMatchSnapshot());
  });

  test('should render recipe details page', async () => {
    // Arrange
    initialState.recipes = recipes;
    const route = `/${recipes[0].id}`;

    // Act
    await wait(() => renderWithRouter(<App />, { route }));
    // Assert
    await wait(() => expect(screen.getByTestId('test-recipe-page')).toMatchSnapshot());
  });
});
