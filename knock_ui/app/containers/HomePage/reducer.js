/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_USERNAME, CHANGE_THREAD } from './constants';

// The initial state of the App
export const initialState = {
  username: '',
  threadId: null,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        // Remove non-alphanumeric characters
        draft.username = action.username.replace(/[^0-9a-z]/gi, '');
        break;
      case CHANGE_THREAD:
        draft.threadId = action.threadId;
        break;
    }
  });

export default homeReducer;
