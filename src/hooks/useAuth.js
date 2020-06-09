import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setUser, unsetUser } from '../store/actions/user';
import { register, logIn, signOut, initAuth } from '../services/authService';
import useAlert from './useAlert';
import { resetApp } from '../store/actions/app';

const useAuth = () => {
  const user = useSelector(state => state.user, shallowEqual);
  const dispatch = useDispatch();
  const { showAlertMessage } = useAlert();

  const signUpUser = async (email, password) => {
    try {
      const data = await register(email, password);
      const { email: userEmail, uid: userUid } = data.user;

      dispatch(setUser(userEmail, userUid));
      showAlertMessage({ text: `${userEmail} successfully registered!` });
    } catch (error) {
      showAlertMessage({ text: error.message, type: 'error' });
    }
  };

  const signInUser = async (email, password) => {
    try {
      const data = await logIn(email, password);
      const { email: userEmail, uid: userUid } = data.user;

      dispatch(setUser(userEmail, userUid));
      showAlertMessage({ text: `Hello ${userEmail}!` });
    } catch (error) {
      showAlertMessage({ text: error.message, type: 'error' });
    }
  };

  const checkUserSession = () => {
    return initAuth(userData => {
      if (userData && !user.uid) {
        dispatch(setUser(userData.email, userData.uid));
      }
    });
  };

  const signOutUser = async () => {
    await signOut().then(() => {
      dispatch(unsetUser());
      dispatch(resetApp());
      showAlertMessage({ text: `See you soon!` });
    });
  };

  return {
    user,
    signUpUser,
    signInUser,
    signOutUser,
    checkUserSession,
  };
};

export default useAuth;
