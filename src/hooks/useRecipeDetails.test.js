import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import useRecipeDetails from './useRecipeDetails';
import store from '../store/store';
import { getItem } from '../services/recipeService';
import recipes from '../__mocks__/recipesData';

jest.mock('../services/recipeService');

describe('useRecipeDetails hook', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should fetch recipe details from firestore', async () => {
    // Arrange
    getItem.mockImplementation(() => Promise.resolve(recipes[0]));
    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useRecipeDetails(), { wrapper });

    // Assert
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();
    expect(getItem).toHaveBeenCalled();
    expect(result.current.loading).toEqual(false);
    expect(result.current.recipe).toEqual(recipes[0]);
  });
});
