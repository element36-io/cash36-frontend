import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import CheckboxInput from '../CheckboxInput';
import DateInput from '../DateInput';
import Autocomplete from '../Autocomplete';
import CheckboxArray from '../CheckboxArray';

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
    disabled,
    countryList
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
          error={errors}
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
          formValues={values}
          relatedField={formField.relatedField}
          setFieldValue={setFieldValue}
          countryList={countryList}
        />
      );
    case 'autocomplete':
      return (
        <Autocomplete
          name={formField.name}
          label={formField.label}
          placeholder={formField.placeholder}
          setFieldValue={setFieldValue}
          setFieldTouched={setFieldTouched}
          isTouched={touched[formField.name]}
          error={errors[formField.name]}
          list={formField.list}
          disabled={disabled}
        />
      );
    case 'checkbox':
      return (
        <CheckboxInput
          value={values[formField.name]}
          name={formField.name}
          label={formField.label}
          onChange={handleChange}
          onBlur={handleBlur}
          type={formField.type}
          isTouched={touched[formField.name]}
          error={errors[formField.name]}
          disabled={disabled}
        />
      );
    case 'checkboxArray':
      return (
        <CheckboxArray
          checkboxes={formField.checkboxes}
          name={formField.name}
          formProps={props.formProps}
          isTouched={touched[formField.name]}
          error={errors[formField.name]}
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
  disabled: PropTypes.bool,
  countryList: PropTypes.bool
};

export default FormField;
