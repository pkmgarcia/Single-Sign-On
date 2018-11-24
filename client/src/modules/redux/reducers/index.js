import { combineReducers } from 'redux';
// import other reducers
import { userReducer } from './user';

const initialState = { };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  rootReducer,
  userReducer
});