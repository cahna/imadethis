import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Welcome to Enterprise-Standard Chat!',
  },
  logoutButtonLabel: {
    id: `${scope}.logoutButtonLabel.message`,
    defaultMessage: 'Logout',
  },
});
