import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';

import request from 'utils/request';
import { API_LOGIN } from 'containers/App/constants';
import { userLoggedIn } from 'containers/App/actions';

import { REQUEST_LOGIN } from '../constants';
import { loginFailure } from '../actions';
import loginPageSaga, { submitLogin } from '../saga';

const username = 'TestUser';
const password = 'TestPassword';
const accessToken = '_JWT_';
const options = {
  body: JSON.stringify({ username, password }),
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

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
  it('handles successful login', () => {
    testSaga(submitLogin)
      .next()
      .next(username)
      .next(password)
      .call(request, API_LOGIN, options)
      .next({ accessToken })
      .put(userLoggedIn(accessToken))
      .next()
      .isDone();
  });

  it('handles failed login', () => {
    testSaga(submitLogin)
      .next()
      .next(username)
      .next(password)
      .call(request, API_LOGIN, options)
      .throw('dummy')
      .put(loginFailure())
      .next()
      .isDone();
  });
});
