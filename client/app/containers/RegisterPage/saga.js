import { takeLatest, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import request from 'utils/request';
import { API_REGISTER, ROUTE_LOGIN } from 'containers/App/constants';

import { REQUEST_REGISTER } from './constants';
import { makeSelectUsername, makeSelectPassword } from './selectors';
import { registerFailure, registerSuccess } from './actions';

/**
 * Send registration request
 */
export function* submitRegistration() {
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
    const response = yield call(request, API_REGISTER, options);

    if (response && response.success) {
      yield put(registerSuccess());
      yield put(push(ROUTE_LOGIN));
    } else {
      yield put(registerFailure((response || {}).error));
    }
  } catch (error) {
    yield put(registerFailure());
  }
}

// Individual exports for testing
export default function* registerPageSaga() {
  yield takeLatest(REQUEST_REGISTER, submitRegistration);
}
