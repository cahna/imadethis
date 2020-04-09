import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';

import { REQUEST_LOGIN } from './constants';
import { makeSelectUsername, makeSelectPassword } from './selectors';
import { loginSuccess, loginFailure } from './actions';

/**
 * Send authentication request
 */
export function* submitLogin() {
  const username = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());

  const requestURL = `/api/auth/login`;
  const options = {
    body: JSON.stringify({ username, password }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const { access_token: accessToken } = yield call(
      request,
      requestURL,
      options,
    );
    localStorage.setItem('accessToken', accessToken);
    yield put(loginSuccess(accessToken));
  } catch (error) {
    yield put(loginFailure());
    localStorage.removeItem('token');
  }
}

export default function* loginPageSaga() {
  yield takeLatest(REQUEST_LOGIN, submitLogin);
}
