import { useDispatch } from 'react-redux';
import { createItem, updateItem, deleteItem } from '../services/recipeService';
import { addRecipe, updateRecipeFields, removeRecipe } from '../store/actions/recipes';
import useAlert from './useAlert';

const useRecipe = () => {
  const dispatch = useDispatch();
  const { showAlertMessage } = useAlert();

  const addNewRecipe = async recipe => {
    const newId = Date.now().toString(32);
    const newRecipe = { ...recipe, id: newId };
    const newData = { recipes: { [newId]: newRecipe } };

    await createItem(newData).then(() => {
      dispatch(addRecipe(newRecipe));
      showAlertMessage({ text: 'Recipe has been saved' });
    });
  };

  const editRecipe = async updatedData => {
    await updateItem(updatedData).then(() => {
      dispatch(updateRecipeFields(updatedData));
    });

    if (Object.keys(updatedData).length > 2) {
      showAlertMessage({ text: 'Recipe has been edited' });
    }
  };

  const deleteRecipe = async id => {
    await deleteItem(id).then(() => {
      dispatch(removeRecipe(id));
      showAlertMessage({ text: 'Recipe has been deleted' });
    });
  };

  return {
    addNewRecipe,
    deleteRecipe,
    editRecipe,
  };
};

export default useRecipe;
