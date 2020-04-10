import produce from 'immer';
import {
  LOCAL_TOKEN_NAME,
  REQUEST_LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  USER_LOGGED_IN,
  LOADING_ACTIVE_USER,
  ACTIVE_USER_LOADED,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: {
    username: null,
    uniqueId: null,
  },
  accessToken: localStorage.getItem(LOCAL_TOKEN_NAME),
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, { type, payload }) =>
  produce(state, draft => {
    switch (type) {
      case REQUEST_LOGOUT:
        draft.loading = true;
        draft.error = false;
        break;
      case LOGOUT_SUCCESS:
        draft.loading = false;
        draft.error = false;
        draft.accessToken = null;
        break;
      case LOGOUT_FAILED:
        draft.loading = false;
        draft.error = true;
        draft.accessToken = null;
        break;
      case USER_LOGGED_IN:
        draft.loading = false;
        draft.error = false;
        draft.accessToken = payload.accessToken;
        break;
      case LOADING_ACTIVE_USER:
        draft.loading = true;
        break;
      case ACTIVE_USER_LOADED:
        draft.loading = false;
        draft.error = payload.error;

        if (payload.user) {
          draft.user = payload.user;
        }
        break;
    }
  });

export default appReducer;
