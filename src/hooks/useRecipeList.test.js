import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import configureStore from 'redux-mock-store';
import useRecipeList from './useRecipeList';
import getList from '../services/recipeService';
// import * as recipeService from '../services/recipeService';
import recipes from '../__mocks__/recipesData';
import user from '../__mocks__/userData';
import store from '../store/store';

jest.mock('../services/recipeService');

//

describe('useRecipesList hook', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('should fetch recipes from firestore', async () => {
    // Arrange
    const mockDispath = jest.fn();
    const wrapper = ({ children }) => (
      <Provider store={store} dispath={mockDispath}>
        {children}
      </Provider>
    );
    getList.mockImplementation(() => Promise.resolve(recipes));

    // Act
    const { result, waitForNextUpdate } = renderHook(() => useRecipeList(), { wrapper });

    // Assert
    expect(result.current.loading).toEqual(true);
    await waitForNextUpdate();
    expect(getList).toHaveBeenCalled();
    expect(result.current.loading).toEqual(false);
    expect(result.current.recipeList).toEqual(recipes);
  });

  test('should fetch with error', async () => {
    // Arrange
    const mockStore = configureStore()({ recipes: [], user });
    const wrapper = ({ children }) => <Provider store={mockStore}>{children}</Provider>;
    const expectedError = new Error('Some firestore error');
    const mockGetList = jest.fn(() => Promise.reject(expectedError));
    getList.mockImplementation(mockGetList);

    // Act
    const { result } = renderHook(() => useRecipeList(), { wrapper });
    // Assert
    expect(result.current.loading).toEqual(false);
    expect(result.current.recipeList).toEqual([]);
  });
});
