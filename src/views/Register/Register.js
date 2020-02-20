import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link, useLocation } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import AuthForm from '../../components/AuthWrapper/AuthForm';
import { formFields, initialValues } from './form-model';
import validationSchema from './validation-schema';
import { register, resendActivationLink } from '../../store/auth/auth.actions';
import { getQueryStringValue } from '../../helpers/wallet.helpers';

import './Register.scss';

const Register = ({ isAuthenticated, captchaToken }) => {
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [resentEmail, setResentEmail] = useState(false);
  const captcha = React.useRef(captchaToken);
  captcha.current = captchaToken;

  const location = useLocation();
  const queryEmail = getQueryStringValue(location.search, 'email');

  useEffect(() => {
    if (queryEmail) {
      setUserEmail(queryEmail);
    }
  });

  const submitCallback = async values => {
    try {
      await register(values.username, values.password, captcha.current);
      setUserEmail(values.username);
    } catch (e) {
      setError(e);
      return Promise.reject(e);
    }
  };

  const resendLink = async () => {
    try {
      await resendActivationLink(
        `${window.location.origin}/account-activation`,
        userEmail
      );

      setResentEmail(true);
    } catch (error) {
      setError(error);
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <AuthWrapper message={userEmail ? '' : 'Welcome'}>
      <div
        className={`${userEmail ? 'register-email' : ''}`}
        data-testid="register_component"
      >
        {userEmail ? (
          <div className="register-email__message">
            <h1>Thank you for registering </h1>
            <div>
              Confirmation email was sent to{' '}
              <span className="black-bold">{userEmail}.</span>
            </div>
            <div className="register-email__resend">
              <div>Didn't receive it?</div>
              {resentEmail ? (
                <div>Email sent. Check your inbox and activate account.</div>
              ) : (
                <button onClick={resendLink}>Resend activation link</button>
              )}
            </div>

            <Link to="/login">Back to Login</Link>
          </div>
        ) : (
          <p>
            Welcome aboard, <br />
            Please, enter your email & choose a password
          </p>
        )}

        {!userEmail && (
          <AuthForm
            submitCallback={submitCallback}
            validationSchema={validationSchema}
            initialValues={initialValues}
            formFields={formFields}
            buttonLabel="Register"
            errorMsg={error}
          >
            <p>
              Already a member? <Link to="/login">Sign in</Link>
            </p>
          </AuthForm>
        )}
      </div>
    </AuthWrapper>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  captchaToken: state.auth.captchaToken
});

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  captchaToken: PropTypes.string
};

export default connect(mapStateToProps, null)(Register);
