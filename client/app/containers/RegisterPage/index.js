import React, { useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';
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

import {
  submitRegister,
  changeUsername,
  changePassword,
  changeConfirmPassword,
  registerFailure,
  registerFormLoading,
} from './actions';
import reducer, { initialState } from './reducer';
import saga from './saga';
import messages from './messages';

const key = 'registerPage';

export function RegisterPage({ makeOnSubmitForm }) {
  useInjectSaga({ key, saga });

  const { formatMessage } = useIntl();
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    loading,
    username,
    password,
    confirmPassword,
    usernameError,
    passwordError,
    confirmPasswordError,
  } = state;

  const onChangeUsername = useCallback(
    (evt) => dispatch(changeUsername(evt.target.value)),
    [],
  );
  const onChangePassword = useCallback(
    (evt) => dispatch(changePassword(evt.target.value)),
    [],
  );
  const onChangeConfirmPassword = useCallback(
    (evt) => dispatch(changeConfirmPassword(evt.target.value)),
    [],
  );
  const onSubmitForm = useCallback(
    makeOnSubmitForm({
      username,
      password,
      onStart: () => dispatch(registerFormLoading()),
      onFailure: (error) => dispatch(registerFailure(error)),
    }),
    [username, password, makeOnSubmitForm],
  );

  const formEmpty = !(username && password && confirmPassword);
  const formErrors = usernameError || passwordError || confirmPasswordError;

  return (
    <EuiPage>
      <Helmet>
        <title>{formatMessage(messages.registerPageTitle)}</title>
        <meta
          name="description"
          content={formatMessage(messages.registerPageDescription)}
        />
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
                  disabled={loading}
                />
              </EuiFormRow>
              <EuiFormRow label={formatMessage(messages.passwordLabel)}>
                <EuiFieldPassword
                  placeholder=""
                  value={password}
                  onChange={onChangePassword}
                  disabled={loading}
                />
              </EuiFormRow>
              <EuiFormRow label={formatMessage(messages.confirmPasswordLabel)}>
                <EuiFieldPassword
                  placeholder=""
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  disabled={loading}
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
  makeOnSubmitForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  makeOnSubmitForm: (payload) => (evt) => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(submitRegister(payload));
  },
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(RegisterPage);
