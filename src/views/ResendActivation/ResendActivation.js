import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthWrapper from '../../components/AuthWrapper';
import AuthForm from '../../components/AuthWrapper/AuthForm';
import { formFields, initialValues } from './form-model';
import validationSchema from './validation-schema';
import { resendActivationLink } from '../../store/auth/auth.actions';

import './ResendActivation.scss';

const ResendActivation = () => {
  const [error, setError] = useState(null);
  const history = useHistory();

  const submitCallback = async values => {
    try {
      await resendActivationLink(
        `${window.location.origin}/account-activation`,
        values.email
      );
      history.push(`/register?email=${values.email}`);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="resend-activation">
      <AuthWrapper message="Resend Activation Link">
        <Fragment>
          <p>Enter the email you registered with</p>
          <AuthForm
            submitCallback={submitCallback}
            validationSchema={validationSchema}
            initialValues={initialValues}
            formFields={formFields}
            buttonLabel="Send me the Activation Link"
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

export default ResendActivation;
