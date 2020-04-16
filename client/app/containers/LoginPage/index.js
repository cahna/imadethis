import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useIntl, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
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
  EuiLink,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
} from '@elastic/eui';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectLoading,
} from './selectors';
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
  loading,
  onChangeUsername,
  onChangePassword,
  onSubmitForm,
  goToRegisterPage,
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

  return (
    <EuiPage>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Helmet>
      <EuiPageBody>
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
              <EuiFormRow>
                <EuiFlexGroup justifyContent="spaceAround">
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      fill
                      type="submit"
                      onClick={onSubmitForm}
                      isLoading={loading}
                    >
                      <FormattedMessage {...messages.loginButtonLabel} />
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFormRow>
            </EuiForm>
            <EuiSpacer />
            <EuiFlexGroup justifyContent="spaceAround">
              <EuiFlexItem grow={false}>
                <EuiLink color="secondary" onClick={goToRegisterPage}>
                  <FormattedMessage {...messages.registerButtonLabel} />
                </EuiLink>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

LoginPage.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  goToRegisterPage: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onChangePassword: (evt) => dispatch(changePassword(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(submitLogin());
    },
    clearForm: () => dispatch(resetLoginPage()),
    goToRegisterPage: () => dispatch(push('/register')),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginPage);
