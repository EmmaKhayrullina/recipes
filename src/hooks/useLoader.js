import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { showLoader, hideLoader } from '../store/actions/app';

const useLoader = () => {
  const loading = useSelector(state => state.app.loading, shallowEqual);
  const dispatch = useDispatch();

  const hideLoading = () => {
    dispatch(hideLoader());
  };

  const showLoading = () => {
    dispatch(showLoader());
  };

  return {
    loading,
    hideLoading,
    showLoading,
  };
};

export default useLoader;
