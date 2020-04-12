import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchRecipes } from '../store/actions/recipes';
import { getList } from '../services/recipeService';

const useRecipeList = () => {
  const recipeList = useSelector(state => state.recipes, shallowEqual);
  const userId = useSelector(state => state.user.uid, shallowEqual);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const existedData = JSON.parse(localStorage.getItem('userData'));
  const isRecipesExists = existedData ? existedData.recipes.length : false;

  useEffect(() => {
    const getRecipes = async () => {
      try {
        setLoading(true);
        const userRecipes = await getList();

        if (userRecipes) {
          dispatch(fetchRecipes(userRecipes));
        }
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    };
    if (userId && !isRecipesExists) {
      getRecipes();
    }

    return () => isRecipesExists;
  }, [isRecipesExists, userId, dispatch]);

  return {
    loading,
    recipeList,
  };
};

export default useRecipeList;
