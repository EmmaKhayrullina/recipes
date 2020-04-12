import React from 'react';
import { Provider } from 'react-redux';
import { renderHook, act } from '@testing-library/react-hooks';
import store from '../store/store';
import recipes from '../__mocks__/recipesData';
import useRecipe from './useRecipe';
import * as recipeService from '../services/recipeService';

describe('useRecipe hook', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  const recipe = recipes[0];
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  const { result } = renderHook(() => useRecipe(), { wrapper });

  test('should add recipe', () => {
    // Arrange
    const spyCreateItem = jest.spyOn(recipeService, 'createItem');

    // Act
    act(() => {
      jest.advanceTimersByTime(100);
      result.current.addNewRecipe(recipe);
    });
    // Assert
    expect(spyCreateItem).toHaveBeenCalled();
  });

  test('should edit recipe', () => {
    // Arrange
    const updatedRecipeData = { description: '', isEdit: false };
    const spyUpdateItem = jest.spyOn(recipeService, 'updateItem');

    // Act
    act(() => {
      jest.advanceTimersByTime(100);
      result.current.editRecipe(updatedRecipeData);
    });
    // Assert
    expect(spyUpdateItem).toHaveBeenCalledWith(updatedRecipeData);
  });

  test('should delete recipe', () => {
    // Arrange
    const spyDeleteItem = jest.spyOn(recipeService, 'deleteItem');

    // Act
    act(() => {
      jest.advanceTimersByTime(100);
      result.current.deleteRecipe(recipe.id);
    });
    // Assert
    expect(spyDeleteItem).toHaveBeenCalledWith(recipe.id);
  });
});
