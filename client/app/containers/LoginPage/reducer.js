/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import {
  PASSWORD_CHANGED,
  USERNAME_CHANGED,
  REQUEST_LOGIN,
  LOGIN_FAILURE,
} from './constants';

export const initialState = {
  username: '',
  password: '',
  loading: false,
  loginError: false,
  usernameError: false,
  passwordError: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case USERNAME_CHANGED:
        draft.username = action.payload.username || '';
        break;
      case PASSWORD_CHANGED:
        draft.password = action.payload.password || '';
        break;
      case REQUEST_LOGIN:
        draft.loginError = false;
        draft.loading = true;
        break;
      case LOGIN_FAILURE:
        draft.loginError = true;
        draft.loading = false;
        break;
    }
  });

export default loginPageReducer;
