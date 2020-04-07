/**
 * LoginPage actions
 */

import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from './constants';

export function changeUsername(username) {
  return {
    type: USERNAME_CHANGED,
    payload: { username },
  };
}

export function changePassword(password) {
  return {
    type: PASSWORD_CHANGED,
    payload: { password },
  };
}

export function submitLogin() {
  return {
    type: REQUEST_LOGIN,
  };
}

export function loginSuccess(accessToken) {
  return {
    type: LOGIN_SUCCESS,
    payload: { accessToken },
  };
}

export function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  };
}
