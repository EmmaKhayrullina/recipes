import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import RecipeList from './RecipeList';
import recipes from '../../__mocks__/recipesData';
import categories from '../../__mocks__/categoriesData';

const store = configureStore()({ app: { filter: 'all' }, categories });
const renderWithStore = data => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <RecipeList recipes={data} />
      </BrowserRouter>
    </Provider>,
  );
};

describe('RecipeList component', () => {
  test('should render recipe list', () => {
    // Act
    renderWithStore(recipes);

    // Assert
    expect(screen.getByTestId('test-recipe-list')).toMatchSnapshot();
  });

  test('should render paragraph', () => {
    // Act
    renderWithStore([]);

    // Assert
    expect(screen.getByText('There are no recipes in this category')).toMatchSnapshot();
  });
});
