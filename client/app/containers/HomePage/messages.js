/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Welcome to Enterprise-Standard Chat!',
  },
  loginHeader: {
    id: `${scope}.login.message`,
    defaultMessage: 'Login to begin',
  },
  loginUsernameLabel: {
    id: `${scope}.loginUsernameLabel.message`,
    defaultMessage: 'Enter your username',
  },
  submitLoginForm: {
    id: `${scope}.submitLoginForm.message`,
    defaultMessage: 'Login',
  },
});
