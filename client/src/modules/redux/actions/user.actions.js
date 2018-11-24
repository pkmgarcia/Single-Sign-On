import { makeActionCreator } from '../utils';
import * as userActionTypes from './user.types';

const userActions = { }

const keys = Object.keys(userActionTypes);

keys.forEach(key => {
  userActions[userActionTypes[key]] = makeActionCreator(userActionTypes[key].type, ...userActionTypes[key].arguments);
});

export default userActions;
