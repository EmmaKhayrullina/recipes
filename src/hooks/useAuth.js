import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setUser, unsetUser } from '../store/actions/user';
import { removeAllRecipes } from '../store/actions/recipes';
import fb from '../services/firebase';
import useAlert from './useAlert';

const useAuth = () => {
  const user = useSelector(state => state.user, shallowEqual);
  const dispatch = useDispatch();
  const { showAlertMessage } = useAlert();

  const signUpUser = async (email, password, callback) => {
    try {
      const data = await fb.register(email, password);
      const { email: userEmail, uid: userUid } = data.user;

      dispatch(setUser(userEmail, userUid));
      callback();
      showAlertMessage({ text: `${userEmail} successfully registered!` });
    } catch (error) {
      showAlertMessage({ text: error.message, type: 'error' });
    }
  };

  const signInUser = async (email, password, callback) => {
    try {
      const data = await fb.login(email, password);
      const { email: userEmail, uid: userUid } = data.user;

      dispatch(setUser(userEmail, userUid));
      callback();
      showAlertMessage({ text: `Hello ${userEmail}!` });
    } catch (error) {
      showAlertMessage({ text: error.message, type: 'error' });
    }
  };

  const signOutUser = async () => {
    await fb.signOut();
    dispatch(unsetUser());
    dispatch(removeAllRecipes());
    showAlertMessage({ text: `See you soon!` });
  };

  useEffect(() => {
    const unsubscribe = fb.auth.onAuthStateChanged(userData => {
      if (userData && !user.uid) {
        return dispatch(setUser(userData.email, userData.uid));
      }
    });

    return () => unsubscribe();
  }, [user.uid, dispatch]);

  return {
    user,
    signUpUser,
    signInUser,
    signOutUser,
  };
};

export default useAuth;
