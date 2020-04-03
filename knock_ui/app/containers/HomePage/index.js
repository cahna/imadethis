/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectUserThreads,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ThreadsList from 'components/ThreadsList';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import { loadUserThreads } from '../App/actions';
import { makeSelectUsername } from './selectors';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  username,
  loading,
  error,
  userThreads,
  onSubmitForm,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // If user is defined, redirect to chat app
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const threadsListProps = {
    loading,
    error,
    userThreads,
  };

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
          <H2>
            <FormattedMessage {...messages.loginHeader} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              <FormattedMessage {...messages.loginUsernameLabel} />
              <Input id="username" type="text" defaultValue="" />
            </label>
            <button type="submit">
              <FormattedMessage {...messages.submitLoginForm} />
            </button>
          </Form>
          <ThreadsList {...threadsListProps} />
        </Section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userThreads: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userThreads: makeSelectUserThreads(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadUserThreads());
    },
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
