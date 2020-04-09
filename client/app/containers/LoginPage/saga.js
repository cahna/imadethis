import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { REQUEST_LOGIN } from './constants';
import { makeSelectUsername, makeSelectPassword } from './selectors';
import { loginSuccess, loginFailure } from './actions';

/**
 * Send authentication request
 */
export function* submitLogin() {
  try {
    const username = yield select(makeSelectUsername());
    const password = yield select(makeSelectPassword());

    const requestURL = '/api/auth/login';
    const options = {
      body: JSON.stringify({ username, password }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };
    const { access_token: accessToken } = yield call(
      request,
      requestURL,
      options,
    );

    yield put(loginSuccess(accessToken));
    localStorage.setItem('accessToken', accessToken);
  } catch (error) {
    yield put(loginFailure());
    localStorage.removeItem('accessToken');
  }
}

export default function* loginPageSaga() {
  yield takeLatest(REQUEST_LOGIN, submitLogin);
}
