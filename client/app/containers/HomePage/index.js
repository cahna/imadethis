/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
import H2 from 'components/H2';
import {
  makeSelectAccessToken,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import Section from './Section';

import { makeSelectUsername } from './selectors';
import messages from './messages';
import reducer from './reducer';
// import saga from './saga';

const key = 'home';

export function HomePage({
  // accessToken,
  username,
  // loading,
  // error,
  // dispatch,
}) {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  // if (!accessToken) {
  //   dispatch(push('/login'));
  //   return <div>Redirecting...</div>;
  // }

  return (
    <article>
      <Helmet>
        <title>Enterprise-Standard Chat</title>
        <meta name="description" content="Chat for tryhards" />
      </Helmet>
      <div>
        <Section>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
        </Section>
        <Section>
          <H2>Hello, {username}!</H2>
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  username: PropTypes.string,
  accessToken: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  accessToken: makeSelectAccessToken(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
