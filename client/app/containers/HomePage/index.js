import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import H2 from 'components/H2';
import Button from 'components/Button';
import CenteredSection from 'components/CenteredSection';
import {
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { logoutUser } from 'containers/App/actions';

import messages from './messages';

export function HomePage({ currentUser, doLogoutUser }) {
  return (
    <article>
      <Helmet>
        <title>I Made This</title>
        <meta name="description" content="All the stuff we've made" />
      </Helmet>
      <div>
        <CenteredSection>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </CenteredSection>
        <CenteredSection>
          <H2>Hello, {currentUser.username}!</H2>
        </CenteredSection>
        <CenteredSection>
          <Button onClick={doLogoutUser}>
            <FormattedMessage {...messages.logoutButtonLabel} />
          </Button>
        </CenteredSection>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  currentUser: PropTypes.shape({
    username: PropTypes.string,
    uniqueId: PropTypes.string,
  }).isRequired,
  doLogoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    doLogoutUser: () => dispatch(logoutUser()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
