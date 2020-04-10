import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_LOGIN_PAGE,
} from './constants';

export const changeUsername = username => ({
  type: USERNAME_CHANGED,
  payload: { username },
});

export const changePassword = password => ({
  type: PASSWORD_CHANGED,
  payload: { password },
});

export const submitLogin = () => ({ type: REQUEST_LOGIN });

export const loginSuccess = accessToken => ({
  type: LOGIN_SUCCESS,
  payload: { accessToken },
});

export const loginFailure = () => ({ type: LOGIN_FAILURE });

export const resetLoginPage = () => ({ type: RESET_LOGIN_PAGE });
