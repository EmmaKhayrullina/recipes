import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { addRecipe, updateRecipe, removeRecipe } from '../store/actions/recipes';
import useAlert from './useAlert';
import fb from '../services/firebase';

const useRecipe = () => {
  const userId = useSelector(state => state.user.uid, shallowEqual);
  const dispatch = useDispatch();
  const { showAlertMessage } = useAlert();

  const userDoc = fb.db.collection('users').doc(`${userId}`);

  const addNewRecipe = async recipe => {
    const newId = Date.now().toString(32);
    const newRecipe = { ...recipe, id: newId };
    const newData = { recipes: { [newId]: newRecipe } };

    await userDoc.set(newData, { merge: true });
    dispatch(addRecipe(newRecipe));
    return showAlertMessage({ text: 'Recipe has been saved' });
  };

  const editRecipe = async updatedData => {
    const data = { recipes: { [updatedData.id]: updatedData } };

    await userDoc.set(data, { merge: true });
    dispatch(updateRecipe(updatedData));

    if (Object.keys(updatedData).length > 2) {
      showAlertMessage({ text: 'Recipe has been edited' });
    }
  };

  const deleteRecipe = async id => {
    await userDoc.update({
      [`recipes.${id}`]: fb.fieldValue.delete(),
    });

    dispatch(removeRecipe(id));
    return showAlertMessage({ text: 'Recipe has been deleted' });
  };

  return {
    addNewRecipe,
    deleteRecipe,
    editRecipe,
  };
};

export default useRecipe;
