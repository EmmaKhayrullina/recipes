import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../../store/store';
import RecipeForm from './RecipeForm';
import useRecipeForm, { initialRecipe } from '../../hooks/useRecipeForm';
import useImageFile from '../../hooks/useImageFile';
import useModal from '../../hooks/useModal';
import useRecipe from '../../hooks/useRecipe';
import recipesData from '../../__mocks__/recipesData';

jest.mock('../../hooks/useRecipeForm');
jest.mock('../../hooks/useImageFile');
jest.mock('../../hooks/useModal');
jest.mock('../../hooks/useRecipe');

const renderRecipeForm = recipe => {
  return mount(
    <Provider store={store}>
      <div>
        <RecipeForm recipe={recipe} />
      </div>
    </Provider>,
  );
};

describe('RecipeForm component', () => {
  let container;

  const fileChange = jest.fn();
  const deleteImage = jest.fn();

  const mockUseImageFile = jest.fn(() => ({
    handleFileChange: fileChange,
    deleteOldImage: deleteImage,
    uploadProgress: null,
    imageLoading: false,
  }));
  useImageFile.mockImplementation(mockUseImageFile);

  const edit = jest.fn();
  const add = jest.fn();

  const mockUseRecipe = jest.fn(() => ({
    editRecipe: edit,
    addNewRecipe: add,
  }));
  useRecipe.mockImplementation(mockUseRecipe);

  const changeField = jest.fn();
  const changeSelect = jest.fn();
  const resetFields = jest.fn();

  const mockUseRecipeForm = jest.fn(data => ({
    recipeFields: data || initialRecipe,
    onChangeField: changeField,
    onChangeSelect: changeSelect,
    clearFields: resetFields,
  }));
  useRecipeForm.mockImplementation(mockUseRecipeForm);

  const close = jest.fn();

  const mockUseModal = jest.fn(() => ({ closeModal: close }));
  useModal.mockImplementation(mockUseModal);

  beforeEach(() => {
    container = renderRecipeForm();
  });

  test('should add recipe', () => {
    // Arrange
    const { clearFields } = useRecipeForm();
    const { addNewRecipe } = useRecipe();
    const { closeModal } = useModal();

    // Act
    container.find('form').simulate('submit');

    // Assert
    expect(addNewRecipe).toHaveBeenCalled();
    expect(clearFields).toHaveBeenCalled();
    expect(closeModal).toHaveBeenCalled();
  });

  test('should edit recipe', () => {
    // Arrange
    const recipe = recipesData[0];
    const { recipeFields } = useRecipeForm(recipe);
    const { editRecipe } = useRecipe();
    const { deleteOldImage } = useImageFile();

    // Act
    container = renderRecipeForm(recipe);
    container.find('form').simulate('submit');

    // Assert
    expect(recipeFields).toEqual(recipe);
    expect(deleteOldImage).toHaveBeenCalled();
    expect(editRecipe).toHaveBeenCalled();
  });

  test('should cancel form', () => {
    // Arrange
    const { closeModal } = useModal();

    // Act
    container.find('button[type="button"]').simulate('click');

    // Assert
    expect(closeModal).toHaveBeenCalled();
  });

  test('should change image field', () => {
    // Arrange
    const { handleFileChange } = useImageFile();
    const { onChangeField } = useRecipeForm();

    // Act
    container.find('input[type="file"]').simulate('change');

    // Assert
    expect(handleFileChange).toHaveBeenCalled();
    expect(onChangeField).toHaveBeenCalled();
  });
});
