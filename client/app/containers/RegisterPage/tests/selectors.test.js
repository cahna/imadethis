import { initialState } from '../reducer';
import {
  selectRegisterPageState,
  makeSelectUsername,
  makeSelectPassword,
  makeSelectConfirmPassword,
  makeSelectLoading,
  makeSelectRegisterError,
  makeSelectUsernameError,
  makeSelectPasswordError,
  makeSelectConfirmPasswordError,
} from '../selectors';

describe('RegisterPage selectors', () => {
  const registerPageState = {
    username: 'TestUser',
    password: 'TestPassword',
    confirmPassword: 'TestPassword',
    loading: true,
    registerError: false,
    usernameError: false,
    passwordError: true,
  };
  const globalState = {
    registerPage: registerPageState,
  };

  describe('selectRegisterPageState', () => {
    it('should select the DEFAULT home state', () => {
      expect(selectRegisterPageState({})).toEqual(initialState);
    });

    it('should select the TEST state', () => {
      expect(selectRegisterPageState(globalState)).toEqual(registerPageState);
    });
  });

  describe('makeSelectUsername', () => {
    const usernameSelector = makeSelectUsername();

    it('should select the username', () => {
      expect(usernameSelector(globalState)).toEqual(registerPageState.username);
    });
  });

  describe('makeSelectPassword', () => {
    const passwordSelector = makeSelectPassword();

    it('should select the password', () => {
      expect(passwordSelector(globalState)).toEqual(registerPageState.password);
    });
  });

  describe('makeSelectConfirmPassword', () => {
    const confirmPasswordSelector = makeSelectConfirmPassword();

    it('should select confirmPassword', () => {
      expect(confirmPasswordSelector(globalState)).toEqual(
        registerPageState.confirmPassword,
      );
    });
  });

  describe('makeSelectLoading', () => {
    const loadingSelector = makeSelectLoading();

    it('should select loading', () => {
      expect(loadingSelector(globalState)).toEqual(registerPageState.loading);
    });
  });

  describe('makeSelectRegisterError', () => {
    const registerErrorSelector = makeSelectRegisterError();

    it('should select the registerError', () => {
      expect(registerErrorSelector(globalState)).toEqual(
        registerPageState.registerError,
      );
    });
  });

  describe('makeSelectUsernameError', () => {
    const usernameErrorSelector = makeSelectUsernameError();

    it('should select usernameError', () => {
      expect(usernameErrorSelector(globalState)).toEqual(
        registerPageState.usernameError,
      );
    });
  });

  describe('makeSelectPasswordError', () => {
    const passwordErrorSelector = makeSelectPasswordError();

    it('should select passwordError', () => {
      expect(passwordErrorSelector(globalState)).toEqual(
        registerPageState.passwordError,
      );
    });
  });

  describe('makeSelectConfirmPasswordError', () => {
    const confirmPasswordErrorSelector = makeSelectConfirmPasswordError();

    it('should select confirmPasswordError', () => {
      expect(confirmPasswordErrorSelector(globalState)).toEqual(
        registerPageState.confirmPasswordError,
      );
    });
  });
});
