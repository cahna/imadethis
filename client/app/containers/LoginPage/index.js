import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import H2 from 'components/H2';
import CenteredSection from 'components/CenteredSection';
import Form from 'components/Form';
import Input from 'components/Input';
import StyledButton from 'components/Button';
import { makeSelectUsername, makeSelectPassword } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  submitLogin,
  changeUsername,
  changePassword,
  resetLoginPage,
} from './actions';

const key = 'loginPage';

export function LoginPage({
  username,
  password,
  onChangeUsername,
  onChangePassword,
  onSubmitForm,
  clearForm,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(
    () => () => {
      clearForm();
    },
    [],
  );

  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.header} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <div>
              <label htmlFor="username">
                <FormattedMessage {...messages.usernameLabel} />
                <Input
                  id="username"
                  type="text"
                  placeholder=""
                  value={username}
                  onChange={onChangeUsername}
                />
              </label>
            </div>
            <div>
              <label htmlFor="password">
                <FormattedMessage {...messages.passwordLabel} />
                <Input
                  id="password"
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={onChangePassword}
                />
              </label>
            </div>
            <StyledButton onClick={onSubmitForm}>
              <FormattedMessage {...messages.loginButtonLabel} />
            </StyledButton>
          </Form>
        </CenteredSection>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  password: makeSelectPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitLogin());
    },
    clearForm: () => dispatch(resetLoginPage()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
