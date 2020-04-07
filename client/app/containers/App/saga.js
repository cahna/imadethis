/**
 * Gets the threads of the user from API
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { REQUEST_LOGOUT } from './constants';
import { makeSelectAccessToken } from './selectors';
import { logoutUserFinished } from './actions';

/**
 * Invalidate token with server
 */
export function* logoutUser() {
  const accessToken = yield select(makeSelectAccessToken());
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const requestURL = `http://localhost:5000/auth/logout`;

  try {
    const { success } = yield call(request, requestURL, options);
    localStorage.removeItem('accessToken');
    yield put(logoutUserFinished(success));
  } catch (err) {
    yield put(logoutUserFinished(false));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  // Watches for LOAD_THREADS actions and calls getThreads when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(REQUEST_LOGOUT, logoutUser);
}
