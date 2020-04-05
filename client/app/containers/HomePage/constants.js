/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

<<<<<<< HEAD
<<<<<<<< HEAD:client/app/containers/HomePage/constants.js
export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';
export const CHANGE_THREAD = 'boilerplate/Home/CHANGE_THREAD';
========
export const LOAD_USER_THREADS = 'boilerplate/App/LOAD_USER_THREADS';
export const LOAD_USER_THREADS_SUCCESS =
  'boilerplate/App/LOAD_USER_THREADS_SUCCESS';
export const LOAD_USER_THREADS_ERROR =
  'boilerplate/App/LOAD_USER_THREADS_ERROR';
>>>>>>>> origin/master:knock_ui/app/containers/App/constants.js
=======
export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';
export const CHANGE_THREAD = 'boilerplate/Home/CHANGE_THREAD';
>>>>>>> origin/master
