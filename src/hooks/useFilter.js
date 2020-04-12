import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setFilter } from '../store/actions/app';

const useFilter = () => {
  const filter = useSelector(state => state.app.filter, shallowEqual);
  const dispatch = useDispatch();

  const filterByCategory = option => {
    dispatch(setFilter(option.value));
  };

  return {
    filter,
    filterByCategory,
  };
};
export default useFilter;
