import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from 'utils/request';
import { API_LOGIN, LOCAL_TOKEN_NAME } from 'containers/App/constants';
import { REQUEST_LOGIN } from './constants';
import { makeSelectUsername, makeSelectPassword } from './selectors';
import { loginSuccess, loginFailure } from './actions';

/**
 * Send authentication request
 */
export function* submitLogin() {
  const username = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());
  const options = {
    body: JSON.stringify({ username, password }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const { access_token: accessToken } = yield call(
      request,
      API_LOGIN,
      options,
    );

    yield put(loginSuccess(accessToken));
    localStorage.setItem(LOCAL_TOKEN_NAME, accessToken);
  } catch (error) {
    yield put(loginFailure());
    localStorage.removeItem(LOCAL_TOKEN_NAME);
  }
}

export default function* loginPageSaga() {
  yield takeLatest(REQUEST_LOGIN, submitLogin);
}
