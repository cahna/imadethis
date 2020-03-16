/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  LOAD_USER_THREADS_SUCCESS,
  LOAD_USER_THREADS,
  LOAD_USER_THREADS_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    threads: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USER_THREADS:
        draft.loading = true;
        draft.error = false;
        draft.userData.threads = false;
        break;

      case LOAD_USER_THREADS_SUCCESS:
        draft.userData.threads = action.threads;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_USER_THREADS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
