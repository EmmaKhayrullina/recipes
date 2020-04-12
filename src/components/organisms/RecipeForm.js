import React from 'react';
import Form from '../atoms/Form';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import CategorySelect from '../molecules/CategorySelect';
import useRecipeForm from '../../hooks/useRecipeForm';
import useImageFile from '../../hooks/useImageFile';
import useModal from '../../hooks/useModal';
import useRecipe from '../../hooks/useRecipe';

const RecipeForm = ({ recipe }) => {
  const { recipeFields, onChangeField, onChangeSelect, clearFields } = useRecipeForm(recipe);
  const { id, isEdit, title, ingredients, category, description, image } = recipeFields;
  const { handleFileChange, uploadData, deleteOldImage, uploadProgress, imageLoading } = useImageFile(image);
  const { editRecipe, addNewRecipe } = useRecipe();
  const { closeModal } = useModal();

  const onChangeImage = e => {
    handleFileChange(e);
    onChangeField(e);
  };

  const cancelSaving = () => {
    if (id) {
      editRecipe({ ...recipe, isEdit: false });
      return;
    }
    closeModal();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let recipeData = recipeFields;

    if (image && !image.url) {
      const url = await uploadData();
      recipeData = {
        ...recipeFields,
        image: { ...image, url },
      };
    }

    if (recipeFields.id) {
      deleteOldImage();
      return editRecipe({ ...recipeData, isEdit: !isEdit });
    }

    addNewRecipe(recipeData);
    clearFields();
    return closeModal();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input label="Title" name="title" value={title} onChange={onChangeField} maxLength="100" required />

      <div>
        <Textarea label="Ingredients" name="ingredients" value={ingredients} onChange={onChangeField} required />

        <div>
          <Input label="Image" type="file" name="image" accept="image/*" onChange={onChangeImage} />
          {uploadProgress > 0 && <progress max="80" value={uploadProgress} />}
        </div>

        <CategorySelect label="Category" name="category" filter={category} onChange={onChangeSelect} />
        <Textarea label="Description" name="description" value={description} onChange={onChangeField} />

        <div>
          <Button type="submit" disabled={imageLoading}>
            {id ? 'Update' : 'Save'}
          </Button>
          <Button onClick={cancelSaving} disabled={imageLoading}>
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default RecipeForm;
