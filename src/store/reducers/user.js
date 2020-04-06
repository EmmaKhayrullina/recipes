import { SET_USER, UNSET_USER } from '../actions/actionTypes';

const initialState = {
  email: '',
  uid: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, email: action.email, uid: action.uid };
    case UNSET_USER:
      return { ...state, email: '', uid: '' };
    default:
      return state;
  }
};

export default userReducer;
