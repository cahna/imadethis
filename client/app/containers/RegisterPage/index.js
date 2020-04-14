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
import Button from 'components/Button';

import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectConfirmPassword,
  makeSelectUsernameError,
  makeSelectPasswordError,
  makeSelectConfirmPasswordError,
} from './selectors';
import {
  submitRegister,
  changeUsername,
  changePassword,
  changeConfirmPassword,
  resetRegisterPage,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const key = 'registerPage';

export function RegisterPage({
  username,
  password,
  confirmPassword,
  usernameError,
  passwordError,
  confirmPasswordError,
  onChangeUsername,
  onChangePassword,
  onChangeConfirmPassword,
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

  const formEmpty = !(username && password && confirmPassword);
  const formErrors = usernameError || passwordError || confirmPasswordError;

  return (
    <div>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register a new account" />
      </Helmet>
      <CenteredSection>
        <H2>
          <FormattedMessage {...messages.header} />
        </H2>
      </CenteredSection>
      <CenteredSection>
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
          <div>
            <label htmlFor="confirmPassword">
              <FormattedMessage {...messages.confirmPasswordLabel} />
              <Input
                id="confirmPassword"
                type="password"
                placeholder=""
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              />
            </label>
          </div>
          <Button
            type="submit"
            onClick={onSubmitForm}
            disabled={formEmpty || formErrors}
          >
            <FormattedMessage {...messages.registerButtonLabel} />
          </Button>
        </Form>
      </CenteredSection>
    </div>
  );
}

RegisterPage.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  usernameError: PropTypes.bool.isRequired,
  passwordError: PropTypes.bool.isRequired,
  confirmPasswordError: PropTypes.bool.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangeConfirmPassword: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  confirmPassword: makeSelectConfirmPassword(),
  usernameError: makeSelectUsernameError(),
  passwordError: makeSelectPasswordError(),
  confirmPasswordError: makeSelectConfirmPasswordError(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onChangeConfirmPassword: (evt) =>
      dispatch(changeConfirmPassword(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitRegister());
    },
    clearForm: () => dispatch(resetRegisterPage()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RegisterPage);
