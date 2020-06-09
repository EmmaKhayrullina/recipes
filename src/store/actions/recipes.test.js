import { UPDATE_RECIPE, ADD_RECIPE, REMOVE_RECIPE, FETCH_RECIPES, RESET_APP } from './actionTypes';
import recipes from '../../__mocks__/recipesData';
import { fetchRecipes, addRecipe, updateRecipeFields, removeRecipe } from './recipes';
import { resetApp } from './app';

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
      description: 'description',
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

  test('should reset recipes', () => {
    // Arrange
    const expectedAction = { type: RESET_APP };
    // Act
    const actualResult = resetApp();
    // Assert
    expect(actualResult).toEqual(expectedAction);
  });
});
