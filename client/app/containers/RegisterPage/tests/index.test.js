/**
 *
 * Tests for RegisterPage
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions

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
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <RegisterPage />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
