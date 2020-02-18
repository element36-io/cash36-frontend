import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import AuthForm from '../../components/AuthWrapper/AuthForm';
import { formFields, initialValues } from './form-model';
import validationSchema from './validation-schema';

import { login } from '../../store/auth/auth.actions';

const Login = ({ isAuthenticated, login }) => {
  const [error, setError] = useState(null);
  const [resendActivation, setResendActivation] = useState(false);
  const submitCallback = async values => {
    try {
      await login(values.username, values.password);
    } catch (err) {
      if (err.includes('User is disabled')) {
        setResendActivation(true);
        setError(
          'Your account has not been activated. Click "Resend activation link" to activate it'
        );
        return Promise.reject(err);
      }
      setError(err);
      return Promise.reject(err);
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <AuthWrapper>
      <div data-testid="login_component">
        <p>
          Welcome back,
          <br />
          Please, enter your email & password
        </p>
        <AuthForm
          submitCallback={submitCallback}
          validationSchema={validationSchema}
          initialValues={initialValues}
          formFields={formFields}
          buttonLabel="Login"
          errorMsg={error}
          captcha={false}
        >
          <p>
            New to element36? <Link to="/register">Sign up</Link>
          </p>
          <p className="paragraph-link-gray">
            <Link to="/reset-password">Forgot password?</Link>
          </p>
          {resendActivation && (
            <p className="paragraph-link-gray">
              <Link to="/resend-activation">Resend activtion link</Link>
            </p>
          )}
        </AuthForm>
      </div>
    </AuthWrapper>
  );
};

Login.propTypes = {
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
