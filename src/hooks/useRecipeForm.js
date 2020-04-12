import { useState } from 'react';

export const initialRecipe = {
  id: '',
  title: '',
  ingredients: '',
  category: 'all',
  description: '',
  image: null,
  isEdit: false,
};

const useRecipeForm = recipe => {
  const [recipeFields, setRecipeFields] = useState(recipe || initialRecipe);

  const onChangeField = event => {
    const { name, value } = event.target;

    if (name === 'image') {
      const file = event.target.files[0];

      if (file) {
        return setRecipeFields(fields => ({ ...fields, [name]: { fileName: file.name } }));
      }
    }

    return setRecipeFields(fields => ({ ...fields, [name]: value }));
  };

  const onChangeSelect = option => setRecipeFields(fields => ({ ...fields, category: option.value }));

  const clearFields = () => {
    setRecipeFields(fields => {
      const emptyFields = {};

      Object.keys(fields).map(key => {
        emptyFields[key] = initialRecipe[key];
        return key;
      });

      return { ...fields, ...emptyFields };
    });
  };

  return {
    recipeFields,
    onChangeField,
    onChangeSelect,
    clearFields,
  };
};

export default useRecipeForm;
