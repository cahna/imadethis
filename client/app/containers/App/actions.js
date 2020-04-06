/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_USER_THREADS,
  LOAD_USER_THREADS_SUCCESS,
  LOAD_USER_THREADS_ERROR,
} from './constants';

/**
 * Load threads for a user, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_USER_THREADS
 */
export function loadUserThreads() {
  return {
    type: LOAD_USER_THREADS,
  };
}

/**
 * Dispatched when the threads for a user are loaded by the request saga
 *
 * @param  {array} threads The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_USER_THREADS_SUCCESS passing the threads
 */
export function userThreadsLoaded(threads, username) {
  return {
    type: LOAD_USER_THREADS_SUCCESS,
    threads,
    username,
  };
}

/**
 * Dispatched when loading the threads for a user fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_USER_THREADS_ERROR passing the error
 */
export function userThreadLoadingError(error) {
  return {
    type: LOAD_USER_THREADS_ERROR,
    error,
  };
}
