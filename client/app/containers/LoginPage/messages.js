/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Login',
  },
  usernameLabel: {
    id: `${scope}.usernameLabel`,
    defaultMessage: 'Username',
  },
  passwordLabel: {
    id: `${scope}.passwordLabel`,
    defaultMessage: 'Password',
  },
  loginButtonLabel: {
    id: `${scope}.loginButtonLabel`,
    defaultMessage: 'Login',
  },
  registerButtonLabel: {
    id: `${scope}.registerButtonLabel`,
    defaultMessage: 'Register',
  },
});
