import { SHOW_MODAL, HIDE_MODAL, HIDE_ALERT, SHOW_ALERT, SET_FILTER, RESET_APP } from './actionTypes';

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};

export const showModal = () => {
  return {
    type: SHOW_MODAL,
  };
};

export const showAlert = alert => {
  return {
    type: SHOW_ALERT,
    payload: alert,
  };
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    payload: filter,
  };
};

export const resetApp = () => {
  return {
    type: RESET_APP,
  };
};
