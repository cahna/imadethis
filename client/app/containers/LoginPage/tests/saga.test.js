import { put, takeLatest } from 'redux-saga/effects';

import { REQUEST_LOGIN } from '../constants';
import { loginSuccess, loginFailure } from '../actions';
import loginPageSaga, { submitLogin } from '../saga';

const accessToken = '_JWT_';

/* eslint-disable redux-saga/yield-effects */
describe('loginPageSaga', () => {
  const mainSaga = loginPageSaga();

  it('should start task to watch for LOAD_REPOS action', () => {
    const takeLatestDescriptor = mainSaga.next().value;

    expect(takeLatestDescriptor).toEqual(
      takeLatest(REQUEST_LOGIN, submitLogin),
    );
  });
});

describe('submitLogin saga generator', () => {
  let submitLoginGenerator;

  beforeEach(() => {
    submitLoginGenerator = submitLogin();

    const selectUsernameDescriptor = submitLoginGenerator.next().value;
    expect(selectUsernameDescriptor).toMatchSnapshot();

    const selectPasswordDescriptor = submitLoginGenerator.next().value;
    expect(selectPasswordDescriptor).toMatchSnapshot();
  });

  afterEach(() => {
    expect(submitLoginGenerator.next().done).toEqual(true);
  });

  it('should dispatch the loginSuccess action if request is successfull', () => {
    const callApiDescriptor = submitLoginGenerator.next({
      access_token: accessToken,
    }).value;
    expect(callApiDescriptor).toMatchSnapshot();

    const putDescriptor = submitLoginGenerator.next().value;
    expect(putDescriptor).toEqual(put(loginSuccess(accessToken)));
  });

  it('should call the repoLoadingError action if the response errors', () => {
    const callApiDescriptor = submitLoginGenerator.throw().value;
    expect(callApiDescriptor).toMatchSnapshot();

    const putDescriptor = submitLoginGenerator.next().value;
    expect(putDescriptor).toEqual(put(loginFailure()));
  });
});
