import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import DateInput from '../DateInput';

const FormField = props => {
  const {
    formProps: {
      handleChange,
      handleBlur,
      values,
      touched,
      errors,
      setFieldValue,
      setFieldTouched
    },
    formField,
    disabled
  } = props;

  switch (formField.type) {
    case 'date':
      return (
        <DateInput
          value={values[formField.name]}
          name={formField.name}
          label={formField.label}
          maxDate={formField.maxDate}
          minDate={formField.minDate}
          initialFocusedDate={formField.initialFocusedDate}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          placeholder={formField.placeholder}
          isTouched={touched[formField.name]}
          error={errors[formField.name]}
          disabled={disabled}
        />
      );
    case 'select':
      return (
        <SelectInput
          value={values[formField.name]}
          name={formField.name}
          label={formField.label}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={formField.placeholder}
          isTouched={touched[formField.name]}
          error={errors[formField.name]}
          list={formField.list}
          disabled={disabled}
        />
      );
    default:
      return (
        <TextInput
          value={values[formField.name]}
          name={formField.name}
          label={formField.label}
          onChange={handleChange}
          onBlur={handleBlur}
          type={formField.type}
          placeholder={formField.placeholder}
          multiline={formField.type === 'textarea'}
          isTouched={touched[formField.name]}
          error={errors[formField.name]}
          disabled={disabled}
        />
      );
  }
};

FormField.propTypes = {
  formField: PropTypes.object.isRequired,
  formProps: PropTypes.object.isRequired,
  disabled: PropTypes.bool
};

export default FormField;
