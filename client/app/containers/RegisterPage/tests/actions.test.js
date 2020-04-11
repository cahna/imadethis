import {
  PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  USERNAME_CHANGED,
  REQUEST_REGISTER,
  RESET_REGISTER_PAGE,
} from '../constants';
import {
  changeUsername,
  changePassword,
  changeConfirmPassword,
  submitRegister,
  resetRegisterPage,
} from '../actions';

describe('RegisterPage actions', () => {
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

  describe('changeConfirmPassword Action', () => {
    it('has a type of CONFIRM_PASSWORD_CHANGED', () => {
      const expected = {
        type: CONFIRM_PASSWORD_CHANGED,
        payload: { confirmPassword: 't' },
      };
      expect(changeConfirmPassword('t')).toEqual(expected);
    });
  });

  describe('submitRegister Action', () => {
    it('has a type of REQUEST_REGISTER', () => {
      const expected = {
        type: REQUEST_REGISTER,
      };
      expect(submitRegister()).toEqual(expected);
    });
  });

  describe('resetRegisterPage Action', () => {
    it('has a type of RESET_LOGIN_PAGE', () => {
      const expected = {
        type: RESET_REGISTER_PAGE,
      };
      expect(resetRegisterPage()).toEqual(expected);
    });
  });
});
