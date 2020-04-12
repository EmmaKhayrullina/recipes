import getCategories from './categoriesService';
import firebase from './firebase';
import categories from '../__mocks__/categoriesData';

describe('Categories api', () => {
  const categoriesDoc = firebase
    .firestore()
    .collection('recipes')
    .doc('categories');

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should return categories from firestore', async () => {
    // Arrange
    const spyFirestoreGet = jest.spyOn(categoriesDoc, 'get');

    // Act
    const actualResult = await getCategories();

    // Assert
    expect(spyFirestoreGet).toHaveBeenCalled();
    expect(actualResult).toEqual(categories);
  });
});
