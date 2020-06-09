import { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getItem } from '../services/recipeService';
import fetchRecipe from '../store/actions/recipe';

const useRecipeDetails = id => {
  const recipe = useSelector(state => state.recipe, shallowEqual);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRecipeDetails = async () => {
      try {
        setLoading(true);
        const recipeDetails = await getItem(id);
        setLoading(false);

        if (recipeDetails) {
          dispatch(fetchRecipe(recipeDetails));
        }
      } catch (e) {
        setLoading(false);
      }
    };

    if (!recipe || recipe.id !== id) {
      getRecipeDetails();
    }

    return () => recipe;
  }, [recipe, id, dispatch]);

  return {
    recipe,
    loading,
  };
};
export default useRecipeDetails;
