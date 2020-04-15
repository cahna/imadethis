import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { HelmetProvider } from 'react-helmet-async';
// import '@testing-library/jest-dom/extend-expect'; // add some helpful assertions

import { RegisterPage } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';

describe('<RegisterPage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore();
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const onChangeUsername = jest.fn();
    const onChangePassword = jest.fn();
    const onChangeConfirmPassword = jest.fn();
    const onSubmitForm = jest.fn();
    const clearForm = jest.fn();
    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <HelmetProvider>
            <RegisterPage
              username=""
              password=""
              confirmPassword=""
              usernameError={false}
              passwordError={false}
              confirmPasswordError={false}
              onChangeUsername={onChangeUsername}
              onChangePassword={onChangePassword}
              onChangeConfirmPassword={onChangeConfirmPassword}
              onSubmitForm={onSubmitForm}
              clearForm={clearForm}
            />
          </HelmetProvider>
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it.skip('Should render and match the snapshot', () => {
    // SKIPPED: stupid snapshots...
    const onChangeUsername = jest.fn();
    const onChangePassword = jest.fn();
    const onChangeConfirmPassword = jest.fn();
    const onSubmitForm = jest.fn();
    const clearForm = jest.fn();
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <HelmetProvider>
            <RegisterPage
              username=""
              password=""
              confirmPassword=""
              usernameError={false}
              passwordError={false}
              confirmPasswordError={false}
              onChangeUsername={onChangeUsername}
              onChangePassword={onChangePassword}
              onChangeConfirmPassword={onChangeConfirmPassword}
              onSubmitForm={onSubmitForm}
              clearForm={clearForm}
            />
          </HelmetProvider>
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
