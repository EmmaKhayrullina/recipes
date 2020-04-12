import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setUser, unsetUser } from '../store/actions/user';
import { removeAllRecipes } from '../store/actions/recipes';
import { register, logIn, signOut, initAuth } from '../services/authService';
import useAlert from './useAlert';

const useAuth = () => {
  const user = useSelector(state => state.user, shallowEqual);
  const dispatch = useDispatch();
  const { showAlertMessage } = useAlert();

  const signUpUser = async (email, password, redirectToHome) => {
    try {
      const data = await register(email, password);
      const { email: userEmail, uid: userUid } = data.user;

      dispatch(setUser(userEmail, userUid));
      redirectToHome();
      showAlertMessage({ text: `${userEmail} successfully registered!` });
    } catch (error) {
      showAlertMessage({ text: error.message, type: 'error' });
    }
  };

  const signInUser = async (email, password, redirectToHome) => {
    try {
      const data = await logIn(email, password);
      const { email: userEmail, uid: userUid } = data.user;

      dispatch(setUser(userEmail, userUid));
      redirectToHome();
      showAlertMessage({ text: `Hello ${userEmail}!` });
    } catch (error) {
      showAlertMessage({ text: error.message, type: 'error' });
    }
  };

  const signOutUser = async () => {
    await signOut();
    dispatch(unsetUser());
    dispatch(removeAllRecipes());
    showAlertMessage({ text: `See you soon!` });
  };

  useEffect(() => {
    const unsubscribe = initAuth(userData => {
      if (userData && !user.uid) {
        return dispatch(setUser(userData.email, userData.uid));
      }
      return false;
    });

    return () => (unsubscribe ? unsubscribe() : false);
  }, [user.uid, dispatch]);

  return {
    user,
    signUpUser,
    signInUser,
    signOutUser,
  };
};

export default useAuth;
