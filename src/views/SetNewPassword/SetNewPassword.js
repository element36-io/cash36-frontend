import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AuthWrapper from '../../components/AuthWrapper';
import AuthForm from '../../components/AuthWrapper/AuthForm';
import { formFields, initialValues } from './form-model';
import validationSchema from './validation-schema';
import { setNewPassword } from '../../store/auth/auth.actions';

import './SetNewPassword.scss';

const SetNewPassword = () => {
  const [error, setError] = useState('');
  const [passwordSet, setPasswordSet] = useState(false);
  const { search } = useLocation();

  const username = search.split('=')[1].trim();

  const submitCallback = async values => {
    try {
      await setNewPassword(values.code, values.newPassword, username);

      setPasswordSet(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="set-new-password">
      <AuthWrapper message={!passwordSet ? 'Set New Password' : 'Password set'}>
        {!passwordSet ? (
          <Fragment>
            <p>Check your email for confirmation code</p>
            <AuthForm
              submitCallback={submitCallback}
              validationSchema={validationSchema}
              initialValues={initialValues}
              formFields={formFields}
              buttonLabel="Submit"
              errorMsg={error}
              captcha={false}
            >
              <p className="paragraph-link-gray">
                <Link to="/login">Back to login</Link>
              </p>
            </AuthForm>
          </Fragment>
        ) : (
          <div className="set-new-password__message">
            Your password has been reset successfully. You can login now.
            <p className="paragraph-link-gray">
              <Link to="/login">Back to login</Link>
            </p>
          </div>
        )}
      </AuthWrapper>
    </div>
  );
};

export default SetNewPassword;
