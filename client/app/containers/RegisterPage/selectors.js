import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectRegisterPageState = (state) =>
  state.registerPage || initialState;

export const makeSelectRegisterPage = () =>
  createSelector(selectRegisterPageState, (substate) => substate);

export const makeSelectUsername = () =>
  createSelector(
    selectRegisterPageState,
    (registerPageState) => registerPageState.username,
  );

export const makeSelectPassword = () =>
  createSelector(
    selectRegisterPageState,
    (registerPageState) => registerPageState.password,
  );

export const makeSelectConfirmPassword = () =>
  createSelector(
    selectRegisterPageState,
    (registerPageState) => registerPageState.confirmPassword,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectRegisterPageState,
    (registerPageState) => registerPageState.loading,
  );

export const makeSelectRegisterError = () =>
  createSelector(
    selectRegisterPageState,
    (registerPageState) => registerPageState.registerError,
  );

export const makeSelectUsernameError = () =>
  createSelector(
    selectRegisterPageState,
    (registerPageState) => registerPageState.usernameError,
  );

export const makeSelectPasswordError = () =>
  createSelector(
    selectRegisterPageState,
    (registerPageState) => registerPageState.passwordError,
  );

export const makeSelectConfirmPasswordError = () =>
  createSelector(
    selectRegisterPageState,
    (registerPageState) => registerPageState.confirmPasswordError,
  );
