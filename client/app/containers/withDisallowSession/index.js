import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import CenteredSection from 'components/CenteredSection';
import { FormattedMessage } from 'react-intl';
import { useInjectSaga } from 'utils/injectSaga';
import { getDisplayName } from 'utils/hoc';
import { makeSelectAccessToken } from 'containers/App/selectors';
import { APP_KEY } from 'containers/App/constants';
import saga from 'containers/App/saga';
import hoistNonReactStatics from 'hoist-non-react-statics';
import messages from './messages';

export const DisallowSessionHoC = (Component) => {
  const WrappedComponent = (props) => {
    const { accessToken, redirectTo, ...rest } = props;

    useInjectSaga({ key: APP_KEY, saga });
    useEffect(() => {
      if (accessToken) {
        redirectTo('/');
      }
    });

    if (accessToken) {
      return (
        <div>
          <CenteredSection>
            <FormattedMessage {...messages.unauthorizedRedirect} />
          </CenteredSection>
        </div>
      );
    }

    return <Component {...rest} />;
  };

  WrappedComponent.propTypes = {
    accessToken: PropTypes.string,
    redirectTo: PropTypes.func.isRequired,
  };

  WrappedComponent.displayName = `withDisallowSession(${getDisplayName(
    Component,
  )})`;

  return hoistNonReactStatics(WrappedComponent, Component);
};

const mapStateToProps = createStructuredSelector({
  accessToken: makeSelectAccessToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    redirectTo: (path) => dispatch(push(path)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, DisallowSessionHoC);
