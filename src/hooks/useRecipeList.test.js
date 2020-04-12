import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { renderHook } from '@testing-library/react-hooks';
import useRecipeList from './useRecipeList';
import { getList } from '../services/recipeService';
// import * as recipeService from '../services/recipeService';
import recipes from '../__mocks__/recipesData';
import user from '../__mocks__/userData';

jest.mock('../services/recipeService');

const store = configureStore()({ recipes: [], user });

describe('useRecipesList hook', () => {
  afterAll(() => {
    jest.resetModules();
  });

  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  test('should fetch recipes from firestore', async () => {
    // Arrange
    getList.mockResolvedValue(recipes);

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useRecipeList(), { wrapper });

    // Assert
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();
    expect(getList).toHaveBeenCalled();
    expect(result.current.loading).toEqual(false);
    // expect(result.current.recipeList).toEqual(recipes);
  });

  // test('should fetch with error', async () => {
  //   // Arrange
  //   const expectedError = new Error('Some firestore error');
  //   const mockGetList = jest.fn(() => Promise.reject(expectedError));
  //   getList.mockImplementation(mockGetList);
  //   let actualError;

  //   // Act
  //   const { waitForNextUpdate } = renderHook(() => useRecipeList(), { wrapper });

  //   try {
  //     await waitForNextUpdate();
  //   } catch (e) {
  //     actualError = e;
  //     console.log('error');
  //   }
  //   // Assert
  //   expect(actualError).toEqual(expectedError);
  // });
});
