import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  REQUEST_LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  RESET_LOGIN_PAGE,
} from '../constants';
import {
  changeUsername,
  changePassword,
  submitLogin,
  loginSuccess,
  loginFailure,
  resetLoginPage,
} from '../actions';

describe('LoginPage actions', () => {
  describe('changeUsername Action', () => {
    it('has a type of USERNAME_CHANGED', () => {
      const expected = {
        type: USERNAME_CHANGED,
        payload: { username: 'testing' },
      };
      expect(changeUsername('testing')).toEqual(expected);
    });
  });

  describe('changePassword Action', () => {
    it('has a type of PASSWORD_CHANGED', () => {
      const expected = {
        type: PASSWORD_CHANGED,
        payload: { password: 't' },
      };
      expect(changePassword('t')).toEqual(expected);
    });
  });

  describe('submitLogin Action', () => {
    it('has a type of REQUEST_LOGIN', () => {
      const expected = {
        type: REQUEST_LOGIN,
      };
      expect(submitLogin()).toEqual(expected);
    });
  });

  describe('loginSuccess Action', () => {
    it('has a type of LOGIN_SUCCESS', () => {
      const expected = {
        type: LOGIN_SUCCESS,
        payload: { accessToken: '_JWT_' },
      };
      expect(loginSuccess('_JWT_')).toEqual(expected);
    });
  });

  describe('loginFailure Action', () => {
    it('has a type of LOGIN_FAILURE', () => {
      const expected = {
        type: LOGIN_FAILURE,
      };
      expect(loginFailure()).toEqual(expected);
    });
  });

  describe('resetLoginPage Action', () => {
    it('has a type of RESET_LOGIN_PAGE', () => {
      const expected = {
        type: RESET_LOGIN_PAGE,
      };
      expect(resetLoginPage()).toEqual(expected);
    });
  });
});
