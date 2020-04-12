import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Recipe from './Recipe';
import useImageFile from '../../hooks/useImageFile';
import useRecipe from '../../hooks/useRecipe';
import recipesData from '../../__mocks__/recipesData';

jest.mock('../../hooks/useImageFile');
jest.mock('../../hooks/useRecipe');

describe('Recipe component', () => {
  let container;
  const recipe = recipesData[1];

  const remove = jest.fn();
  const edit = jest.fn();

  const mockUseRecipe = jest.fn(() => ({
    deleteRecipe: remove,
    editRecipe: edit,
  }));

  useRecipe.mockImplementation(mockUseRecipe);

  const deleteImg = jest.fn();
  const mockUseImageFile = jest.fn(() => ({ deleteImage: deleteImg }));

  useImageFile.mockImplementation(mockUseImageFile);

  beforeEach(() => {
    container = mount(
      <Provider store={store}>
        <Recipe recipe={recipe} />
      </Provider>,
    );
  });

  test('should edit', () => {
    // Arrange
    const { editRecipe } = useRecipe();

    // Act
    container.find('button[title="edit"]').simulate('click');

    // Assert
    expect(editRecipe).toHaveBeenCalled();
  });

  test('should delete recipe', () => {
    // Arrange
    const { deleteRecipe } = useRecipe();
    const { deleteImage } = useImageFile(recipe.image);

    // Act
    container.find('button[title="delete"]').simulate('click');

    // Assert
    expect(deleteImage).toHaveBeenCalled();
    expect(deleteRecipe).toHaveBeenCalled();
  });
});
