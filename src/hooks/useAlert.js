import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { showAlert, hideAlert } from '../store/actions/app';

const useAlert = () => {
  const alert = useSelector(state => state.app.alert, shallowEqual);
  const dispatch = useDispatch();

  const hideAlertMessage = () => {
    dispatch(hideAlert());
  };

  const showAlertMessage = data => {
    dispatch(showAlert(data));

    setTimeout(() => {
      dispatch(hideAlert());
    }, 4000);
  };

  return {
    alert,
    hideAlertMessage,
    showAlertMessage,
  };
};

export default useAlert;
