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
  const submitCallback = async values => {
    try {
      await login(values.username, values.password);
    } catch (err) {
      setError(err);
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
        >
          <p>
            New to element36? <Link to="/register">Sign up</Link>
          </p>
          <p className="paragraph-link-gray">
            <Link to="/reset-password">Forgot password?</Link>
          </p>
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

export default connect(
  mapStateToProps,
  { login }
)(Login);
