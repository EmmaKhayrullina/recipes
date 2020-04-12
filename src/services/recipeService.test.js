import * as recipeService from './recipeService';
import firebase from './firebase';
import recipes from '../__mocks__/recipesData';

describe('Recipe api', () => {
  const auth = firebase.auth();
  const currentUserDoc = firebase
    .firestore()
    .collection('users')
    .doc(auth.currentUser.uid);
  const fieldValue = firebase.firestore.FieldValue;

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should return recipes from firestore', async () => {
    // Arrange
    const spyFirestoreGet = jest.spyOn(currentUserDoc, 'get');

    // Act
    const actualResult = await recipeService.getList();

    // Assert
    expect(spyFirestoreGet).toHaveBeenCalled();
    expect(actualResult).toEqual(recipes);
  });

  test('should add new recipe to firestore', async () => {
    // Arrange
    const recipe = {
      id: '100fff007',
      title: 'Test recipe',
      ingredients: 'ingredients',
      category: 'all',
      description: 'description',
      image: null,
      isEdit: false,
    };
    const spyFirestoreSet = jest.spyOn(currentUserDoc, 'set');

    // Act
    await recipeService.createItem(recipe);

    // Assert
    expect(spyFirestoreSet).toHaveBeenCalledWith(recipe, { merge: true });
  });

  test('should update recipe in firestore', async () => {
    // Arrange
    const updatedData = {
      id: '100fff007',
      category: 'soups',
      isEdit: false,
    };
    const spyFirestoreSet = jest.spyOn(currentUserDoc, 'set');

    // Act
    await recipeService.updateItem(updatedData);

    // Assert
    expect(spyFirestoreSet).toHaveBeenCalled();
  });

  test('should delete recipe in firestore', async () => {
    // Arrange
    const spyFieldValueDelete = jest.spyOn(fieldValue, 'delete');

    // Act
    await recipeService.updateItem(recipes[0].id);

    // Assert
    expect(spyFieldValueDelete).toHaveBeenCalled();
  });
});
