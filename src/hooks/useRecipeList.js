import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchRecipes } from '../store/actions/recipes';
import fb from '../services/firebase';
import useLoader from './useLoader';

const useRecipeList = () => {
  const recipeList = useSelector(state => state.recipes.recipeList, shallowEqual);
  const dispatch = useDispatch();
  const userId = fb.getUserUid();
  const { showLoading, hideLoading } = useLoader();

  useEffect(() => {
    // const lsRecipes = localStorage.getItem('recipes');
    // if (lsRecipes) {
    //   return dispatch(fetchRecipes(JSON.parse(lsRecipes)));
    // }

    if (!userId) return;

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
            // localStorage.setItem('recipes', JSON.stringify(userRecipes));
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
