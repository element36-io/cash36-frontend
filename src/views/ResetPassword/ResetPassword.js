import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthWrapper from '../../components/AuthWrapper';
import AuthForm from '../../components/AuthWrapper/AuthForm';
import { formFields, initialValues } from './form-model';
import validationSchema from './validation-schema';
import { resetPassword } from '../../store/auth/auth.actions';

import './ResetPassword.scss';

const ResetPassword = () => {
  const [error, setError] = useState(null);
  const history = useHistory();

  const submitCallback = async values => {
    try {
      await resetPassword(values.email);
      history.push(`/set-new-password?for=${values.email}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="reset-password">
      <AuthWrapper message="Reset Password">
        <Fragment>
          <p>Enter the email you registered with</p>
          <AuthForm
            submitCallback={submitCallback}
            validationSchema={validationSchema}
            initialValues={initialValues}
            formFields={formFields}
            buttonLabel="Send me Instructions"
            errorMsg={error}
          >
            <p className="paragraph-link-gray">
              <Link to="/login">Back to login</Link>
            </p>
          </AuthForm>
        </Fragment>
      </AuthWrapper>
    </div>
  );
};

export default ResetPassword;
