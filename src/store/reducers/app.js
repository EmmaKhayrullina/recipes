import { SHOW_MODAL, HIDE_MODAL, SHOW_ALERT, HIDE_ALERT, SHOW_LOADER, HIDE_LOADER } from '../actions/actionTypes';

const initialState = {
  isModalOpen: false,
  alert: null,
  loading: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, isModalOpen: true };
    case HIDE_MODAL:
      return { ...state, isModalOpen: false };
    case SHOW_ALERT:
      return { ...state, alert: action.payload };
    case HIDE_ALERT:
      return { ...state, alert: null };
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default appReducer;
