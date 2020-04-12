import { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import fetchCategories from '../store/actions/categories';
import getCategories from '../services/categoriesService';

const useCategorySelect = filter => {
  const categories = useSelector(state => state.categories, shallowEqual);
  const defaultValue = filter
    ? categories.find(item => item.value.toLowerCase() === filter.toLowerCase())
    : categories[0];
  const [currentValue, setCurrentValue] = useState(defaultValue);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const categoriesList = await getCategories();
        if (categoriesList) {
          setCurrentValue(categoriesList[0]);
          dispatch(fetchCategories(categoriesList));
        }
      } catch (e) {
        throw new Error(e);
      }
    };

    if (!categories.length) {
      getCategoryList();
    }

    return () => categories;
  }, [dispatch, categories]);

  const handleChangeCategory = option => {
    setCurrentValue(option);
  };

  return {
    categories,
    currentValue,
    handleChangeCategory,
  };
};
export default useCategorySelect;
