import { UPDATE_RECIPE, ADD_RECIPE, REMOVE_RECIPE, FETCH_RECIPES, REMOVE_ALL_RECIPES } from './actionTypes';
import recipes from '../../__mocks__/recipesData';
import { fetchRecipes, addRecipe, updateRecipeFields, removeRecipe, removeAllRecipes } from './recipes';

describe('Recipes actions', () => {
  test('should fetch recipes', () => {
    // Arrange
    const expectedAction = {
      type: FETCH_RECIPES,
      payload: recipes,
    };

    // Act
    const actualResult = fetchRecipes(recipes);

    // Assert
    expect(actualResult).toEqual(expectedAction);
  });

  test('should remove all recipes', () => {
    // Arrange
    const expectedAction = {
      type: REMOVE_ALL_RECIPES,
    };
    // Act
    const actualResult = removeAllRecipes();

    // Assert
    expect(actualResult).toEqual(expectedAction);
  });

  test('should add recipe', () => {
    // Arrange
    const newRecipe = {
      id: '1e576evof',
      title: 'Avocado salad',
      ingredients: 'avocado pepper tomato salad leaf lemon oil',
      description: 'Mix',
      image: null,
      isEdit: false,
    };
    const expectedAction = {
      type: ADD_RECIPE,
      payload: newRecipe,
    };
    // Act
    const actualResult = addRecipe(newRecipe);

    // Assert
    expect(actualResult).toEqual(expectedAction);
  });

  test('should update recipe', () => {
    // Arrange
    const updatedData = {
      id: '1e576evof',
      description: 'Mix',
      isEdit: false,
    };
    const expectedAction = {
      type: UPDATE_RECIPE,
      payload: updatedData,
    };
    // Act
    const actualResult = updateRecipeFields(updatedData);

    // Assert
    expect(actualResult).toEqual(expectedAction);
  });

  test('should remove recipe', () => {
    // Arrange
    const id = '1e576evof';
    const expectedAction = {
      type: REMOVE_RECIPE,
      payload: id,
    };
    // Act
    const actualResult = removeRecipe(id);
    // Assert
    expect(actualResult).toEqual(expectedAction);
  });
});
