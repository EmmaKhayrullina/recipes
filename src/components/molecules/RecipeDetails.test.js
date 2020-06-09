import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipeDetails from './RecipeDetails';
import recipes from '../../__mocks__/recipesData';

describe('RecipeDetails component', () => {
  const recipe = recipes[1];

  test('render recipe details', () => {
    // Act
    render(<RecipeDetails recipe={recipe} />);

    // Assert
    expect(screen.getByTestId('test-recipe-details')).toMatchSnapshot();
  });
});
