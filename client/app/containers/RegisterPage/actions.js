import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  REQUEST_REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  RESET_REGISTER_PAGE,
} from './constants';

export const changeUsername = (username) => ({
  type: USERNAME_CHANGED,
  payload: { username },
});

export const changePassword = (password) => ({
  type: PASSWORD_CHANGED,
  payload: { password },
});

export const changeConfirmPassword = (confirmPassword) => ({
  type: CONFIRM_PASSWORD_CHANGED,
  payload: { confirmPassword },
});

export const submitRegister = () => ({ type: REQUEST_REGISTER });

export const registerSuccess = () => ({ type: REGISTER_SUCCESS });

export const registerFailure = (error = '') => ({
  type: REGISTER_FAILURE,
  payload: { error },
});

export const resetRegisterPage = () => ({ type: RESET_REGISTER_PAGE });
