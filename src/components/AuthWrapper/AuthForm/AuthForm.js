import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import { CAPTCHA_KEY } from '../../../config/api';
import Form from '../../Form';
import StepButton from '../../Buttons/StepButton/StepButton';
import { setCaptchaToken } from '../../../store/auth/auth.actions';

const activeCaptcha = process.env.REACT_APP_CAPTCHA_ACTIVE;

const AuthForm = ({
  submitCallback,
  validationSchema,
  initialValues,
  formFields,
  buttonLabel,
  pwdHint,
  children,
  errorMsg,
  captcha = true,
  setCaptchaToken
}) => {
  const [isVerified, setIsVerified] = useState(!captcha || !activeCaptcha);
  const [captchaError, setCaptchaError] = useState(null);

  const onVerify = token => {
    if (token) setIsVerified(true);
    setCaptchaToken(token);
  };

  const onCaptchaError = err => setCaptchaError(err);

  const renderErrors = useCallback(
    errors =>
      Object.values(errors).map(err => (
        <p className="auth__form__error" key={err}>
          {err}
        </p>
      )),
    []
  );

  const isDisabled = useCallback(
    (submitting, values) => {
      return (
        submitting || Object.values(values).some(val => !val) || !isVerified
      );
    },
    [isVerified]
  );

  return (
    <Form
      submitCallback={submitCallback}
      validationSchema={validationSchema}
      initialValues={initialValues}
      render={(formProps, submitting) => (
        <form className="auth__form" onSubmit={formProps.handleSubmit}>
          <div>
            {formFields.map(field => (
              <div className="auth__field" key={field.name}>
                <label>
                  <span>{field.label}</span>
                  <input
                    data-testid={`auth_form_${field.name}`}
                    type={field.type}
                    name={field.name}
                    value={formProps.values[field.name]}
                    onChange={formProps.handleChange}
                    onBlur={formProps.handleBlur}
                  />
                  <span />
                </label>
              </div>
            ))}
          </div>
          {pwdHint && (
            <div className="auth__pwdHint">HINT: use at leasts 8 mixEd capitals and speci@l characters, like "Element36.io"</div>
          )}
          {captcha && activeCaptcha && (
            <div className="auth__captcha">
              <ReCAPTCHA
                onChange={onVerify}
                sitekey={CAPTCHA_KEY}
                onErrored={onCaptchaError}
              />
            </div>
          )}
          {renderErrors(formProps.errors)}
          {captchaError && <p className="auth__form__error">{captchaError}</p>}
          {errorMsg && <p className="auth__form__error">{errorMsg}</p>}
          <StepButton
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fullWidth
            text={buttonLabel}
            onClick={formProps.handleSubmit}
            disabled={isDisabled(submitting, formProps.values)}
            submitting={submitting}
          />
          {children}
        </form>
      )}
    />
  );
};

AuthForm.propTypes = {
  submitCallback: PropTypes.func,
  validationSchema: PropTypes.object,
  initialValues: PropTypes.object,
  formFields: PropTypes.array,
  buttonLabel: PropTypes.string,
  errorMsg: PropTypes.string,
  captcha: PropTypes.bool,
  setCaptchaToken: PropTypes.func
};

export default connect(null, { setCaptchaToken })(AuthForm);
