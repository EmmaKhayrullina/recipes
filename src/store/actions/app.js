import { SHOW_MODAL, HIDE_MODAL, HIDE_ALERT, SHOW_ALERT, SHOW_LOADER, HIDE_LOADER } from './actionTypes';

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

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};
