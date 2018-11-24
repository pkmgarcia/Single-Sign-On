const initialState = {
  user: null
};

const userTypes = {
  SET_USER: 'SET_USER'
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.SET_USER:
      return { user: action.user };
    default:
      return { ...initialState };
  }
};

export {
  initialState,
  userTypes,
  userReducer
};

/* Too complicated for what is needed now
import * as userActionTypes from '../actions'
import { userActions } from '../actions';

const {
  SET_USER
} = userActionTypes;

const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER.type:
      userActions[SET_USER](...action.payload);
      break;
    default:
      return null;
  }
}

export {
  user
};
*/