import { initialState } from '../reducer';
import {
  selectLoginPageState,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectLoading,
  makeSelectError,
} from '../selectors';

describe('LoginPage selectors', () => {
  const loginPageState = {
    username: 'TestUser',
    password: 'TestPassword',
    loading: true,
    loginError: false,
    usernameError: false,
    passwordError: true,
  };
  const globalState = {
    loginPage: loginPageState,
  };

  describe('selectLoginPageState', () => {
    it('should select the DEFAULT home state', () => {
      expect(selectLoginPageState({})).toEqual(initialState);
    });

    it('should select the TEST home state', () => {
      expect(selectLoginPageState(globalState)).toEqual(loginPageState);
    });
  });

  describe('makeSelectUsername', () => {
    const usernameSelector = makeSelectUsername();

    it('should select the username', () => {
      expect(usernameSelector(globalState)).toEqual(loginPageState.username);
    });
  });

  describe('makeSelectPassword', () => {
    const passwordSelector = makeSelectPassword();

    it('should select the username', () => {
      expect(passwordSelector(globalState)).toEqual(loginPageState.password);
    });
  });

  describe('makeSelectLoading', () => {
    const loadingSelector = makeSelectLoading();

    it('should select the username', () => {
      expect(loadingSelector(globalState)).toEqual(loginPageState.loading);
    });
  });

  describe('makeSelectError', () => {
    const errorSelector = makeSelectError();

    it('should select the username', () => {
      expect(errorSelector(globalState)).toEqual(loginPageState.error);
    });
  });
});
