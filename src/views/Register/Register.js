import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import AuthForm from '../../components/AuthWrapper/AuthForm';
import { formFields, initialValues } from './form-model';
import validationSchema from './validation-schema';
import { register } from '../../store/auth/auth.actions';

import './Register.scss';

const Register = ({ isAuthenticated }) => {
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState('milossomelongassemail@test.com');
  const submitCallback = async values => {
    try {
      await register(values.username, values.password);
      setUserEmail(values.username);
    } catch (e) {
      setError(e);
      return Promise.reject(e);
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
          <Fragment>
            <div>
              Confirmation email was sent to <span>{userEmail}</span>
            </div>
            <div className="register-email__resend">
              <div>Didn't receive it?</div>
              <div>Resend email</div>
            </div>

            <Link to="/login">Back to sign in</Link>
          </Fragment>
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
  isAuthenticated: state.auth.isAuthenticated
});

Register.propTypes = {
  isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, null)(Register);
