import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import AuthForm from '../../components/AuthWrapper/AuthForm';
import { formFields, initialValues } from './form-model';
import validationSchema from './validation-schema';

import { register } from '../../store/auth/auth.actions';

const Register = ({ isAuthenticated, register }) => {
  const [error, setError] = useState(null);
  const submitCallback = async values => {
    try {
      await register(values.username, values.password);
    } catch (e) {
      setError(e);
      return Promise.reject(e);
    }
  };

  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <AuthWrapper>
      <div data-testid="register_component">
        <p>
          Welcome aboard, <br /> Please, enter your email & choose a password
        </p>
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
      </div>
    </AuthWrapper>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

export default connect(
  mapStateToProps,
  { register }
)(Register);
