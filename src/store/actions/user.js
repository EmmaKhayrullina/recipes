import { SET_USER, UNSET_USER } from './actionTypes';

export const setUser = (email, uid) => {
  return {
    type: SET_USER,
    email,
    uid,
  };
};

export const unsetUser = () => {
  return {
    type: UNSET_USER,
  };
};
