import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from '../../../components/Form';
import FormField from '../../../components/Form/FormField';
import FormHeader from '../../../components/Form/FormHeader';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import { addContract } from '../../../helpers/async/contracts.helpers';
import { formModel, initialValues } from './form-model';
import validate from './validateForm';

import './ContractForm.scss';

const ContractForm = ({ closeDialog, refetchContracts }) => {
  const [error, setError] = useState('');
  const submit = async formValues => {
    try {
      await addContract(formValues);
      closeDialog();
      refetchContracts();
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    }
  };
  return (
    <div className="paper contract-form">
      <FormHeader title="Add Contract" />
      <Form
        validate={validate}
        submitCallback={submit}
        initialValues={initialValues}
        render={(formProps, submitting) => (
          <form
            className=""
            autoComplete="off"
            onSubmit={formProps.handleSubmit}
          >
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
            {error && <div className="error-text">{error}</div>}
          </form>
        )}
      />
    </div>
  );
};

ContractForm.propTypes = {
  closeDialog: PropTypes.func,
  refetchContracts: PropTypes.func
};

export default ContractForm;
