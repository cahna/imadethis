import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import history from 'utils/history';

import HomePage from '../index';
import configureStore from '../../../configureStore';

describe('<HomePage />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({}, history);
  });

  it('should render and match the snapshot', () => {
    const doLogoutUser = jest.fn();

    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <HomePage
            loading={false}
            error={false}
            currentUser={{
              username: 'TestUser',
              uniqueId: 'abc-123',
            }}
            doLogoutUser={doLogoutUser}
          />
        </IntlProvider>
      </Provider>,
    );

    expect(doLogoutUser).not.toHaveBeenCalled();
    expect(firstChild).toMatchSnapshot();
  });
});
