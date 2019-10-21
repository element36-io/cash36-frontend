import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import StepButton from '../../Buttons/StepButton/StepButton';

const AuthForm = ({
  submitCallback,
  validationSchema,
  initialValues,
  formFields,
  buttonLabel,
  children,
  errorMsg
}) => {
  const renderErrors = useCallback(
    errors =>
      Object.values(errors).map(err => (
        <p className="auth__form__error">{err}</p>
      )),
    []
  );

  const isDisabled = useCallback((submitting, values) => {
    return submitting || Object.values(values).some(val => !val);
  }, []);

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
          {renderErrors(formProps.errors)}
          <p className="auth__form__error">{errorMsg}</p>
          <StepButton
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fullWidth
            text={buttonLabel}
            onClick={formProps.handleSubmit}
            disabled={isDisabled(submitting, formProps.values)}
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
  children: PropTypes.any
};

export default AuthForm;
