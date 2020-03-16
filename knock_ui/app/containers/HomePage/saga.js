/**
 * Gets the threads of the user from API
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_USER_THREADS } from 'containers/App/constants';
import {
  userThreadsLoaded,
  userThreadLoadingError,
} from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getUserThreads() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://localhost:3000/users/${username}`;

  try {
    // Call our request helper (see 'utils/request')
    const userThreads = yield call(request, requestURL);
    yield put(userThreadsLoaded(userThreads, username));
  } catch (err) {
    yield put(userThreadLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userThreadsData() {
  // Watches for LOAD_THREADS actions and calls getThreads when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_USER_THREADS, getUserThreads);
}
