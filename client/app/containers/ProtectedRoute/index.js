import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Route } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectCurrentUser,
  makeSelectAccessToken,
} from 'containers/App/selectors';
import { getActiveUser } from 'containers/App/actions';
import { APP_KEY } from 'containers/App/constants';
import saga from 'containers/App/saga';

export function ProtectedRoute({
  component: Component,
  accessToken,
  currentUser,
  redirectTo,
  loadActiveUser,
  ...rest
}) {
  useInjectSaga({ key: APP_KEY, saga });

  useEffect(() => {
    if (!accessToken) {
      redirectTo('/login');
    } else if (!currentUser || !currentUser.username) {
      loadActiveUser();
    }
  });

  return <Route component={Component} {...rest} />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
  accessToken: PropTypes.string,
  currentUser: PropTypes.shape({ username: PropTypes.string }),
  redirectTo: PropTypes.func.isRequired,
  loadActiveUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  accessToken: makeSelectAccessToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    redirectTo: path => dispatch(push(path)),
    loadActiveUser: () => dispatch(getActiveUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProtectedRoute);
