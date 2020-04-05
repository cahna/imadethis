import React from 'react';
import { IntlProvider } from 'react-intl';
// import { Provider } from 'react-redux';
// import { browserHistory } from 'react-router-dom';
import { render } from 'react-testing-library';

import ThreadsList from '../index';
// import configureStore from '../../../configureStore';

describe('<ThreadsList />', () => {
  it('should render the loading indicator when its loading', () => {
    const { container } = render(<ThreadsList loading />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an error if loading failed', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <ThreadsList loading={false} error={{ message: 'Loading failed!' }} />
      </IntlProvider>,
    );
    expect(queryByText(/Something went wrong/)).not.toBeNull();
  });

  /* it('should render the list of threads for the user if success loading', () => {
    const store = configureStore(
      { global: { currentUser: 'mxstbr' } },
      browserHistory,
    );
    const repos = [
      {
        owner: {
          login: 'mxstbr',
        },
        html_url: 'https://github.com/react-boilerplate/react-boilerplate',
        name: 'react-boilerplate',
        open_issues_count: 20,
        full_name: 'react-boilerplate/react-boilerplate',
      },
    ];
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <ThreadsList repos={repos} error={false} />
        </IntlProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  }); */

  it('should not render anything if nothing interesting is provided', () => {
    const { container } = render(
      <ThreadsList repos={false} error={false} loading={false} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
