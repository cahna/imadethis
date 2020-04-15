import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiFieldPassword,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectConfirmPassword,
  makeSelectUsernameError,
  makeSelectPasswordError,
  makeSelectConfirmPasswordError,
  makeSelectLoading,
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
  loading,
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
  const { formatMessage } = useIntl();

  const formEmpty = !(username && password && confirmPassword);
  const formErrors = usernameError || passwordError || confirmPasswordError;

  return (
    <EuiPage>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register a new account" />
      </Helmet>
      <EuiPageBody component="div">
        <EuiPageContent verticalPosition="center" horizontalPosition="center">
          <EuiPageContentHeader>
            <EuiPageContentHeaderSection>
              <EuiTitle>
                <h2>
                  <FormattedMessage {...messages.header} />
                </h2>
              </EuiTitle>
            </EuiPageContentHeaderSection>
          </EuiPageContentHeader>
          <EuiPageContentBody>
            <EuiForm component="form" onSubmit={onSubmitForm}>
              <EuiFormRow label={formatMessage(messages.usernameLabel)}>
                <EuiFieldText
                  placeholder=""
                  value={username}
                  onChange={onChangeUsername}
                />
              </EuiFormRow>
              <EuiFormRow label={formatMessage(messages.passwordLabel)}>
                <EuiFieldPassword
                  placeholder=""
                  value={password}
                  onChange={onChangePassword}
                />
              </EuiFormRow>
              <EuiFormRow label={formatMessage(messages.confirmPasswordLabel)}>
                <EuiFieldPassword
                  placeholder=""
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiFlexGroup justifyContent="spaceAround">
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      fill
                      type="submit"
                      onClick={onSubmitForm}
                      isLoading={loading}
                      disabled={formEmpty || formErrors}
                    >
                      <FormattedMessage {...messages.registerButtonLabel} />
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFormRow>
            </EuiForm>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

RegisterPage.propTypes = {
  loading: PropTypes.bool.isRequired,
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
  loading: makeSelectLoading(),
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
