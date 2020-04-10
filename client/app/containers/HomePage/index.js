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

// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
import H2 from 'components/H2';
import {
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';

import Section from './Section';
import messages from './messages';
// import reducer from './reducer';
// import saga from './saga';

// const key = 'home';

export function HomePage({
  currentUser,
  // loading,
  // error,
  // dispatch,
}) {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

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
          <H2>Hello, {currentUser.username}!</H2>
        </Section>
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
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
