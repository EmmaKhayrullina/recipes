import React from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import useRecipeList from './useRecipeList';
import { getList } from '../services/recipeService';
import recipes from '../__mocks__/recipesData';
import store from '../store/store';

jest.mock('../services/recipeService');

describe('useRecipesList hook', () => {
  afterAll(() => {
    jest.resetModules();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  test('should fetch with error', async () => {
    // Arrange
    const mockGet = jest.fn(() => Promise.reject(new Error('Some firestore error')));
    getList.mockImplementationOnce(mockGet);
    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useRecipeList(), { wrapper });
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();
    expect(getList).toHaveBeenCalled();

    // Assert
    expect(result.current.loading).toEqual(false);
    expect(result.current.recipeList).toEqual([]);
  });

  test('should fetch recipes from firestore', async () => {
    // Arrange
    const mockGet = jest.fn(() => Promise.resolve(recipes));
    getList.mockImplementationOnce(mockGet);
    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useRecipeList(), { wrapper });

    // Assert
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();
    expect(getList).toHaveBeenCalled();
    expect(result.current.loading).toEqual(false);
    expect(result.current.recipeList).toEqual(recipes);
  });
});
