import recipesReducer from './recipes';
import { FETCH_RECIPES, ADD_RECIPE, REMOVE_RECIPE, UPDATE_RECIPE, RESET_APP } from '../actions/actionTypes';
import recipes from '../../__mocks__/recipesData';

describe('Recipes list reducer', () => {
  const initialState = [];

  test('should return the initial state', () => {
    expect(recipesReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle FETCH_RECIPES', () => {
    // Arrangе
    const action = {
      type: FETCH_RECIPES,
      payload: recipes,
    };
    const actualState = recipes;

    // Act
    const actualResult = recipesReducer(initialState, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });

  test('should handle ADD_RECIPE', () => {
    // Arrange
    const stateBefore = recipes;
    const newRecipe = {
      id: '1e57as123',
      title: 'Test recipe',
      ingredients: 'ingredients',
      description: 'description',
      image: null,
      isEdit: false,
    };
    const action = {
      type: ADD_RECIPE,
      payload: newRecipe,
    };
    const actualState = [...recipes, newRecipe];
    // Act
    const actualResult = recipesReducer(stateBefore, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });

  test('should handle REMOVE_RECIPE', () => {
    // Arrange
    const stateBefore = recipes;
    const action = {
      type: REMOVE_RECIPE,
      payload: recipes[0].id,
    };
    const actualState = recipes.slice(1);

    // Act
    const actualResult = recipesReducer(stateBefore, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });

  test('should handle UPDATE_RECIPE', () => {
    // Arrange
    const stateBefore = recipes;
    const updatedData = {
      id: recipes[0].id,
      description: 'Updated description',
      isEdit: false,
    };
    const action = {
      type: UPDATE_RECIPE,
      payload: updatedData,
    };
    const actualState = recipes.map(recipe =>
      recipe.id === recipes[0].id ? { ...recipes[0], ...updatedData } : recipe,
    );

    // Act
    const actualResult = recipesReducer(stateBefore, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });

  test('should handle RESET_APP', () => {
    // Arrange
    const stateBefore = recipes;
    const action = { type: RESET_APP };
    const actualState = [];

    // Act
    const actualResult = recipesReducer(stateBefore, action);

    // Assert
    expect(actualResult).toEqual(actualState);
  });
});
