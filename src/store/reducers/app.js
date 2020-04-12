import { SHOW_MODAL, HIDE_MODAL, SHOW_ALERT, HIDE_ALERT, SET_FILTER } from '../actions/actionTypes';

export const initialState = {
  isModalOpen: false,
  alert: null,
  filter: 'all',
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
    case SET_FILTER:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default appReducer;
