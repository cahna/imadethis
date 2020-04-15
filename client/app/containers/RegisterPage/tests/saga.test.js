import { takeLatest } from 'redux-saga/effects';
import { testSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import request from 'utils/request';
import { API_REGISTER, ROUTE_LOGIN } from 'containers/App/constants';

import { REQUEST_REGISTER } from '../constants';
import { registerFailure, registerSuccess } from '../actions';
import registerPageSaga, { submitRegistration } from '../saga';

const username = 'TestUser';
const password = 'TestPassword';
const options = {
  body: JSON.stringify({ username, password }),
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

/* eslint-disable redux-saga/yield-effects */
describe('registerPageSaga', () => {
  const mainSaga = registerPageSaga();

  it('should start task to watch for REQUEST_REGISTER action', () => {
    const takeLatestDescriptor = mainSaga.next().value;

    expect(takeLatestDescriptor).toEqual(
      takeLatest(REQUEST_REGISTER, submitRegistration),
    );
  });
});

describe('submitRegistration saga generator', () => {
  it('handles successful register', () => {
    testSaga(submitRegistration)
      .next()
      .next(username)
      .next(password)
      .call(request, API_REGISTER, options)
      .next({ success: true })
      .put(registerSuccess())
      .next()
      .put(push(ROUTE_LOGIN))
      .next()
      .isDone();
  });

  it('handles failed register', () => {
    testSaga(submitRegistration)
      .next()
      .next(username)
      .next(password)
      .call(request, API_REGISTER, options)
      .throw('dummy')
      .put(registerFailure())
      .next()
      .isDone();
  });
});
