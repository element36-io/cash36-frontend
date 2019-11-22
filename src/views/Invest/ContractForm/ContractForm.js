import React from 'react';

import Form from '../../../components/Form';
import FormField from '../../../components/Form/FormField';
import { formModel, initialValues } from './form-model';

import './ContractForm.scss';

const ContractForm = () => {
  return (
    <Form
      submitCallback={() => {}}
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
        </form>
      )}
    />
  );
};

export default ContractForm;
