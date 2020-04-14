import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
// import '@testing-library/jest-dom/extend-expect'; // add some helpful assertions

import { LoginPage } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';

describe('<LoginPage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const onChangeUsername = jest.fn();
    const onChangePassword = jest.fn();
    const onSubmitForm = jest.fn();
    const clearForm = jest.fn();
    const goToRegisterPage = jest.fn();

    render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <LoginPage
            username=""
            password=""
            onChangeUsername={onChangeUsername}
            onChangePassword={onChangePassword}
            onSubmitForm={onSubmitForm}
            clearForm={clearForm}
            goToRegisterPage={goToRegisterPage}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(spy).not.toHaveBeenCalled();
    expect(onChangeUsername).not.toHaveBeenCalled();
    expect(onChangePassword).not.toHaveBeenCalled();
    expect(onSubmitForm).not.toHaveBeenCalled();
  });

  it('Should render and match the snapshot', () => {
    const onChangeUsername = jest.fn();
    const onChangePassword = jest.fn();
    const onSubmitForm = jest.fn();
    const clearForm = jest.fn();
    const goToRegisterPage = jest.fn();

    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale={DEFAULT_LOCALE}>
          <LoginPage
            username="TestUser"
            password="TestPassword"
            onChangeUsername={onChangeUsername}
            onChangePassword={onChangePassword}
            onSubmitForm={onSubmitForm}
            clearForm={clearForm}
            goToRegisterPage={goToRegisterPage}
          />
        </IntlProvider>
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
