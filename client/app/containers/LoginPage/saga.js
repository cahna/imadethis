import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import request from 'utils/request';
import { API_LOGIN, LOCAL_TOKEN_NAME } from 'containers/App/constants';
import { userLoggedIn } from 'containers/App/actions';

import { REQUEST_LOGIN } from './constants';
import { makeSelectUsername, makeSelectPassword } from './selectors';
import { loginFailure } from './actions';

/**
 * Send authentication request
 */
export function* submitLogin() {
  const username = yield select(makeSelectUsername());
  const password = yield select(makeSelectPassword());
  const options = {
    body: JSON.stringify({ username, password }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  try {
    const response = yield call(request, API_LOGIN, options);

    localStorage.setItem(LOCAL_TOKEN_NAME, response.accessToken);
    yield put(userLoggedIn(response.accessToken));
    yield put(push('/'));
  } catch (error) {
    yield put(loginFailure());
    localStorage.removeItem(LOCAL_TOKEN_NAME);
  }
}

export default function* loginPageSaga() {
  yield takeLatest(REQUEST_LOGIN, submitLogin);
}
