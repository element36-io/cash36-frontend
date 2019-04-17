import React from 'react';
import Form from '../../../components/Form';
import FormField from '../../../components/Form/FormField';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import validationSchema from './validation-schema';
import { initialValues, formModel } from './formModel';

const Step1Form = () => {
  const submit = values => {
    console.log(values);
  };

  return (
    <Form
      submitCallback={submit}
      validationSchema={validationSchema}
      initialValues={initialValues}
      render={(formProps, submitting) => (
        <form autoComplete="off" onSubmit={formProps.handleSubmit}>
          {formModel.map(field => (
            <FormField
              key={field.name}
              formField={field}
              formProps={formProps}
            />
          ))}
          <DefaultButton
            type="submit"
            disabled={!formProps.isValid || submitting}
            submitting={submitting}
          >
            Create Startup
          </DefaultButton>
        </form>
      )}
    />
  );
};

export default Step1Form;
