import React, { useState } from 'react';
import Form from '../atoms/Form';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';
import useImageFile from '../../hooks/useImageFile';
import useRecipe from '../../hooks/useRecipe';

const RecipeForm = ({ recipe, closeModal }) => {
  const initialRecipe = {
    id: '',
    title: '',
    ingredients: '',
    description: '',
    image: null,
    isEdit: false,
  };
  const [recipeFields, setRecipeFields] = useState(recipe || initialRecipe);
  const { id, title, ingredients, description, image, isEdit } = recipeFields;
  const { handleFileChange, progress, loading, uploadData, deleteOldImage } = useImageFile(image);
  const { addNewRecipe, editRecipe } = useRecipe();

  const onChangeField = event => {
    const { name, value } = event.target;

    if (name === 'image') {
      handleFileChange(event);
      const file = event.target.files[0];

      if (file) {
        return setRecipeFields(fields => ({ ...fields, [name]: { fileName: file.name } }));
      }
    }

    return setRecipeFields(fields => ({ ...fields, [name]: value }));
  };

  const cancelSaving = () => {
    if (id) {
      return editRecipe({ id, isEdit: false });
    }
    return closeModal();
  };

  const clearFields = () => {
    setRecipeFields(fields => {
      const emptyFields = {};

      Object.keys(fields).map(key => {
        switch (key) {
          case 'image':
            emptyFields[key] = null;
            break;
          case 'isEdit':
            emptyFields[key] = false;
            break;
          default:
            emptyFields[key] = '';
        }
        return key;
      });

      return { ...fields, ...emptyFields };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let recipeData = recipeFields;

    if (image && !image.url) {
      const url = await uploadData();
      recipeData = {
        ...recipeFields,
        image: { ...recipeFields.image, url },
      };
    }

    if (id) {
      deleteOldImage();
      return editRecipe({ ...recipeData, isEdit: !isEdit });
    }

    addNewRecipe(recipeData);
    return clearFields();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input label="Title" name="title" value={title} onChange={onChangeField} />

      <div>
        <Textarea label="Ingredients" name="ingredients" value={ingredients} onChange={onChangeField} />

        <div>
          <Input label="Image" type="file" name="image" onChange={onChangeField} />
          {progress > 0 && <progress max="100" value={progress} />}
        </div>
        <Textarea label="Description" name="description" value={description} onChange={onChangeField} />

        <div>
          <Button type="submit" disabled={loading}>
            {id ? 'Update' : 'Save'}
          </Button>
          <Button onClick={cancelSaving} disabled={loading}>
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default RecipeForm;
