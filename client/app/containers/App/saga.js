import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { REQUEST_LOGOUT, API_LOGOUT, LOCAL_TOKEN_NAME } from './constants';
import { makeSelectAccessToken } from './selectors';
import { logoutUserFinished } from './actions';

/**
 * Invalidate token
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

  try {
    const { success } = yield call(request, API_LOGOUT, options);
    yield put(logoutUserFinished(success));
  } catch (err) {
    yield put(logoutUserFinished(false));
  }

  localStorage.removeItem(LOCAL_TOKEN_NAME);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  yield takeLatest(REQUEST_LOGOUT, logoutUser);
}
