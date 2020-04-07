import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLoginPageState = state => state.loginPage || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectLoginPageState,
    loginPageState => loginPageState.username,
  );

const makeSelectPassword = () =>
  createSelector(
    selectLoginPageState,
    loginPageState => loginPageState.password,
  );

const makeSelectLoading = () =>
  createSelector(
    selectLoginPageState,
    loginPageState => loginPageState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectLoginPageState,
    loginPageState => loginPageState.error,
  );

export {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectLoading,
  makeSelectError,
};
