import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import request from 'utils/request';

import {
  REQUEST_LOGOUT,
  API_LOGOUT,
  LOCAL_TOKEN_NAME,
  USER_LOGGED_IN,
  API_ACTIVE_USER,
} from './constants';
import { makeSelectAccessToken } from './selectors';
import {
  logoutSuccess,
  logoutFailed,
  activeUserLoaded,
  loadingActiveUser,
} from './actions';

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
    if (success) {
      yield put(logoutSuccess());
    } else {
      yield put(logoutFailed({ reason: 'unknown' }));
    }
  } catch (err) {
    yield put(logoutFailed());
  }

  localStorage.removeItem(LOCAL_TOKEN_NAME);
}

/**
 * Load active user info
 */
export function* loadActiveUser() {
  yield put(loadingActiveUser());

  const accessToken = yield select(makeSelectAccessToken());
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const data = yield call(request, API_ACTIVE_USER, options);
    yield put(activeUserLoaded(data));
    yield put(push('/'));
  } catch (err) {
    yield put(activeUserLoaded(null, true));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  yield takeLatest(USER_LOGGED_IN, loadActiveUser);
  yield takeLatest(REQUEST_LOGOUT, logoutUser);
}
