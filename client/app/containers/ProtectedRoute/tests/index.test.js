import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { MemoryRouter, Switch, Route, browserHistory } from 'react-router-dom';
// import 'jest-dom/extend-expect'; // add some helpful assertions

import { ProtectedRoute } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
import configureStore from '../../../configureStore';

const TestPrivate = () => <div>Private route</div>;
const TestPublic = () => <div>Public route</div>;

describe('<ProtectedRoute />', () => {
  let store;
  const loadActiveUser = jest.fn();
  const redirectTo = jest.fn();
  const accessToken = '_JWT_';
  const currentUser = {
    username: 'TestUser',
    uniqueId: 'abc-123',
  };

  beforeAll(() => {
    store = configureStore({}, browserHistory);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('with valid user and accessToken', () => {
    it('does not log errors in console', () => {
      const spy = jest.spyOn(global.console, 'error');

      render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <MemoryRouter initialEntries={['/']}>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  component={TestPrivate}
                  accessToken={accessToken}
                  currentUser={currentUser}
                  loadActiveUser={loadActiveUser}
                  redirectTo={redirectTo}
                />
                <Route exact path="/public" component={TestPublic} />
              </Switch>
            </MemoryRouter>
          </IntlProvider>
        </Provider>,
      );

      expect(spy).not.toHaveBeenCalled();
    });

    it('renders private route with valid user+token', () => {
      const {
        container: { firstChild },
      } = render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <MemoryRouter initialEntries={['/']}>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  component={TestPrivate}
                  accessToken={accessToken}
                  currentUser={currentUser}
                  loadActiveUser={loadActiveUser}
                  redirectTo={redirectTo}
                />
                <Route exact path="/public" component={TestPublic} />
              </Switch>
            </MemoryRouter>
          </IntlProvider>
        </Provider>,
      );
      expect(firstChild).toMatchSnapshot();
    });
  });

  describe('with accessToken but no user data', () => {
    it('does not log errors in console', () => {
      const spy = jest.spyOn(global.console, 'error');

      render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <MemoryRouter initialEntries={['/']}>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  component={TestPrivate}
                  accessToken={accessToken}
                  currentUser={{ username: null }}
                  loadActiveUser={loadActiveUser}
                  redirectTo={redirectTo}
                />
                <Route exact path="/public" component={TestPublic} />
              </Switch>
            </MemoryRouter>
          </IntlProvider>
        </Provider>,
      );

      expect(spy).not.toHaveBeenCalled();
    });

    it('calls loadActiveUser', () => {
      render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <MemoryRouter initialEntries={['/']}>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  component={TestPrivate}
                  accessToken={accessToken}
                  currentUser={{ username: null }}
                  loadActiveUser={loadActiveUser}
                  redirectTo={redirectTo}
                />
                <Route exact path="/public" component={TestPublic} />
              </Switch>
            </MemoryRouter>
          </IntlProvider>
        </Provider>,
      );

      expect(redirectTo).not.toHaveBeenCalled();
      expect(loadActiveUser).toHaveBeenCalled();
    });
  });

  describe('with no accessToken and no user data', () => {
    it('does not log errors in console', () => {
      const spy = jest.spyOn(global.console, 'error');

      render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <MemoryRouter initialEntries={['/']}>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  component={TestPrivate}
                  accessToken=""
                  currentUser={{ username: null }}
                  loadActiveUser={loadActiveUser}
                  redirectTo={redirectTo}
                />
                <Route exact path="/public" component={TestPublic} />
              </Switch>
            </MemoryRouter>
          </IntlProvider>
        </Provider>,
      );

      expect(spy).not.toHaveBeenCalled();
    });

    it('calls loadActiveUser', () => {
      render(
        <Provider store={store}>
          <IntlProvider locale={DEFAULT_LOCALE}>
            <MemoryRouter initialEntries={['/']}>
              <Switch>
                <ProtectedRoute
                  exact
                  path="/"
                  component={TestPrivate}
                  accessToken=""
                  currentUser={{ username: null }}
                  loadActiveUser={loadActiveUser}
                  redirectTo={redirectTo}
                />
                <Route exact path="/public" component={TestPublic} />
              </Switch>
            </MemoryRouter>
          </IntlProvider>
        </Provider>,
      );

      expect(redirectTo).toHaveBeenCalledWith('/login');
      expect(loadActiveUser).not.toHaveBeenCalled();
    });
  });
});
