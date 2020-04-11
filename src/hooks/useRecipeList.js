import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchRecipes } from '../store/actions/recipes';
import fb from '../services/firebase';
import useLoader from './useLoader';

const useRecipeList = () => {
  const recipeList = useSelector(state => state.recipes.recipeList, shallowEqual);
  const userId = useSelector(state => state.user.uid, shallowEqual);
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoader();
  const existedData = JSON.parse(localStorage.getItem('userData'));

  const isRecipesExists = existedData.recipes.recipeList.length;

  useEffect(() => {
    if (isRecipesExists || !userId) return;

    const userDoc = fb.db.collection('users').doc(`${userId}`);

    const fetchRecipeList = async () => {
      showLoading();

      await userDoc
        .get()
        .then(doc => {
          let userRecipes;

          if (doc.exists) {
            const { recipes } = doc.exists ? doc.data() : null;
            userRecipes = Object.keys(recipes).map(recipe => recipes[recipe]);
          }
          return userRecipes;
        })
        .then(userRecipes => {
          if (userRecipes && userRecipes.length) {
            hideLoading();
            return dispatch(fetchRecipes(userRecipes));
          }
          return false;
        });
    };

    fetchRecipeList();
  }, [userId, dispatch]);

  return {
    recipeList,
  };
};

export default useRecipeList;
