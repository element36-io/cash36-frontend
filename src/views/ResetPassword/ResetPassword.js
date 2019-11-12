import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import AuthWrapper from '../../components/AuthWrapper';
import AuthForm from '../../components/AuthWrapper/AuthForm';
import { formFields, initialValues } from './form-model';
import validationSchema from './validation-schema';
// import { resetPassword } from '../../store/auth/auth.actions';

import './ResetPassword.scss';

const ResetPassword = () => {
  const [error, setError] = useState(null);
  const [emailSent, setEmailSent] = useState(false);

  const submitCallback = async values => {
    try {
      // await resetPassword(values.email);

      setEmailSent(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="reset-password">
      <AuthWrapper message={!emailSent ? 'Reset Password' : 'Check your email'}>
        {!emailSent ? (
          <Fragment>
            <p>Enter the email you registered with</p>
            <AuthForm
              submitCallback={submitCallback}
              validationSchema={validationSchema}
              initialValues={initialValues}
              formFields={formFields}
              buttonLabel="Send me Instructions"
              errorMsg={error}
              captcha={false}
            >
              <p className="paragraph-link-gray">
                <Link to="/login">Back to login</Link>
              </p>
            </AuthForm>
          </Fragment>
        ) : (
          <div className="reset-password__message">
            Password reset instructions have been sent to your email address.
            <p className="paragraph-link-gray">
              <Link to="/login">Back to login</Link>
            </p>
          </div>
        )}
      </AuthWrapper>
      )}
    </div>
  );
};

export default ResetPassword;
