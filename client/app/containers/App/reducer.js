/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { REQUEST_LOGOUT, LOGOUT_FINISHED } from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: {
    username: null,
    uniqueId: null,
  },
  accessToken: localStorage.getItem('accessToken'),
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case REQUEST_LOGOUT:
        draft.loading = true;
        draft.error = false;
        break;
      case LOGOUT_FINISHED:
        draft.loading = false;
        draft.error = !payload.success;
        draft.accessToken = null;
        break;
    }
  });

export default appReducer;
