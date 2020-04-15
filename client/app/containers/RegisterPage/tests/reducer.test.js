import produce from 'immer';
import registerPageReducer, { initialState } from '../reducer';
import {
  changeUsername,
  changePassword,
  changeConfirmPassword,
  submitRegister,
  registerFailure,
  resetRegisterPage,
} from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('registerPageReducer', () => {
  let state;

  beforeEach(() => {
    state = initialState;
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(registerPageReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle changeUsername correctly', () => {
    expect(registerPageReducer(state, changeUsername('T'))).toEqual(
      produce(state, (draft) => {
        draft.username = 'T';
      }),
    );
    expect(registerPageReducer(state, changeUsername('Te'))).toEqual(
      produce(state, (draft) => {
        draft.username = 'Te';
      }),
    );
    expect(registerPageReducer(state, changeUsername())).toEqual(
      produce(state, (draft) => {
        draft.username = '';
      }),
    );
  });

  it('should handle changePassword correctly', () => {
    expect(registerPageReducer(state, changePassword('T'))).toEqual(
      produce(state, (draft) => {
        draft.password = 'T';
        draft.passwordError = true;
        draft.confirmPasswordError = true;
      }),
    );
  });

  it('should handle changeConfirmPassword correctly', () => {
    expect(registerPageReducer(state, changeConfirmPassword('T'))).toEqual(
      produce(state, (draft) => {
        draft.confirmPassword = 'T';
        draft.passwordError = true;
        draft.confirmPasswordError = true;
      }),
    );
  });

  it('should handle registerFailure correctly', () => {
    expect(registerPageReducer(state, registerFailure())).toEqual(
      produce(state, (draft) => {
        draft.registerError = true;
      }),
    );
  });

  it('should handle submitRegister correctly', () => {
    expect(registerPageReducer(state, submitRegister())).toEqual(
      produce(state, (draft) => {
        draft.registerError = false;
        draft.loading = true;
      }),
    );
  });

  it('should handle resetRegisterPage correctly', () => {
    expect(registerPageReducer(state, resetRegisterPage())).toEqual(
      produce(state, (draft) => {
        draft.username = '';
        draft.password = '';
        draft.confirmPassword = '';
        draft.usernameError = false;
        draft.passwordError = false;
        draft.registerError = false;
        draft.loading = false;
      }),
    );
  });
});
