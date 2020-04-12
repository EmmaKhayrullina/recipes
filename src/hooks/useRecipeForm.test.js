import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import useRecipeForm, { initialRecipe } from './useRecipeForm';
import useRecipe from './useRecipe';
import store from '../store/store';

jest.mock('./useRecipe');
useRecipe.mockImplementation(() => ({
  addNewRecipe: jest.fn(),
  editRecipe: jest.fn(),
}));

describe('useRecipeForm hook', () => {
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('should return recipe fields', () => {
    const { result } = renderHook(() => useRecipeForm(), { wrapper });
    expect(result.current.recipeFields).toEqual(initialRecipe);
  });

  test('should change category field', () => {
    // Arrange
    const option = {
      label: 'Soups',
      value: 'soups',
    };
    const expectedValue = option.value;

    // Act
    const { result } = renderHook(() => useRecipeForm(), { wrapper });
    act(() => result.current.onChangeSelect(option));

    // Assert
    expect(result.current.recipeFields.category).toEqual(expectedValue);
  });

  test('should change recipe field', () => {
    // Arrange
    const actualField = 'title';
    const expectedValue = 'New recipe';

    // Act
    const { result } = renderHook(() => useRecipeForm(), { wrapper });
    act(() =>
      result.current.onChangeField({
        target: {
          name: actualField,
          value: expectedValue,
        },
      }),
    );

    // Assert
    expect(result.current.recipeFields[actualField]).toEqual(expectedValue);
  });

  test('should clear form fields', () => {
    // Arrange
    const expectedFields = initialRecipe;

    // Act
    const { result } = renderHook(() => useRecipeForm(), { wrapper });
    act(() => result.current.clearFields());

    // Assert
    expect(result.current.recipeFields).toEqual(expectedFields);
  });
});
