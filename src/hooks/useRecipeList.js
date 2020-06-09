import { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { fetchRecipes } from '../store/actions/recipes';
import { getList } from '../services/recipeService';

const useRecipeList = () => {
  const recipeList = useSelector(state => state.recipes, shallowEqual);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

    if (!recipeList.length) {
      getRecipes();
    }

    return () => !!recipeList.length;
  }, [recipeList, dispatch]);

  return {
    loading,
    recipeList,
  };
};

export default useRecipeList;
