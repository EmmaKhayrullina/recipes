import recipesReducer from './recipes';
import { FETCH_RECIPES, REMOVE_ALL_RECIPES, ADD_RECIPE, REMOVE_RECIPE, UPDATE_RECIPE } from '../actions/actionTypes';

describe('Recipes list reducer', () => {
  const initialState = [];

  test('should return the initial state', () => {
    expect(recipesReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle FETCH_RECIPES', () => {
    // Arrangе
    const action = {
      type: FETCH_RECIPES,
      payload: [1, 2],
    };
    const actualState = [1, 2];

    // Act
    const actualResult = recipesReducer(initialState, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });

  test('should handle REMOVE_ALL_RECIPES', () => {
    // Arrangе
    const stateBefore = [{ id: 1, isEdit: true }, 2];
    const action = {
      type: REMOVE_ALL_RECIPES,
    };
    const actualState = [];

    // Act
    const actualResult = recipesReducer(stateBefore, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });

  test('should handle ADD_RECIPE', () => {
    // Arrange
    const stateBefore = [{ id: 1, isEdit: false }, 2];
    const action = {
      type: ADD_RECIPE,
      payload: {},
    };
    const actualState = [{ id: 1, isEdit: false }, 2, {}];
    // Act
    const actualResult = recipesReducer(stateBefore, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });

  test('should handle REMOVE_RECIPE', () => {
    // Arrange
    const stateBefore = [
      { id: 1, isEdit: false },
      { id: 2, isEdit: false },
    ];
    const action = {
      type: REMOVE_RECIPE,
      payload: 2,
    };
    const actualState = [{ id: 1, isEdit: false }];

    // Act
    const actualResult = recipesReducer(stateBefore, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });

  test('should handle UPDATE_RECIPE', () => {
    // Arrange
    const stateBefore = [{ id: 1, isEdit: true }, 2];
    const action = {
      type: UPDATE_RECIPE,
      payload: {
        id: 1,
        isEdit: false,
      },
    };
    const actualState = [{ id: 1, isEdit: false }, 2];

    // Act
    const actualResult = recipesReducer(stateBefore, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });
});
