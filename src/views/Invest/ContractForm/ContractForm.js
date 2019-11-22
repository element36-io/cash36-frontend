import React from 'react';

import Form from '../../../components/Form';
import FormField from '../../../components/Form/FormField';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import { formModel, initialValues } from './form-model';

import './ContractForm.scss';

const ContractForm = () => {
  return (
    <Form
      submitCallback={() => {
        console.log('sumibbe');
      }}
      initialValues={initialValues}
      render={(formProps, submitting) => (
        <form
          className="paper contract-form"
          autoComplete="off"
          onSubmit={formProps.handleSubmit}
        >
          <h3>Add Contract</h3>
          <div className="tier1-form__field-group">
            {formModel.map(field => (
              <FormField
                key={field.name}
                formField={field}
                formProps={formProps}
                disabled={field.disabled}
              />
            ))}
          </div>

          <DefaultButton type="submit" disabled={submitting}>
            Add Contract
          </DefaultButton>
        </form>
      )}
    />
  );
};

export default ContractForm;
