import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import './Form.scss';

const Form = props => {
  const [submitting, toggleSubmitting] = useState(false);

  const { render, submitCallback, initialValues, validationSchema } = props;

  const onSubmit = useCallback(async formValues => {
    toggleSubmitting(true);
    try {
      await submitCallback(formValues);
    } catch (error) {
      toggleSubmitting(false);
    }
  }, []);

  return (
    <div className="element-form-wrapper">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={onSubmit}
        render={formProps => render(formProps, submitting)}
      />
    </div>
  );
};

Form.propTypes = {
  submitCallback: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  render: PropTypes.func.isRequired
};

export default Form;
