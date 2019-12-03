import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from '../../../components/Form';
import FormField from '../../../components/Form/FormField';
import FormHeader from '../../../components/Form/FormHeader';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import { editContract } from '../../../helpers/async/contracts.helpers';
import { formModel } from './form-model';
import validationSchema from './validation-schema';

import '../ContractForm/ContractForm.scss';

const EditContractForm = ({
  closeDialog,
  refetchUserContracts,
  refetchPublicContracts,
  contractAddress,
  initialValues
}) => {
  const [error, setError] = useState('');
  const submit = async formValues => {
    try {
      await editContract(contractAddress, formValues);
      closeDialog();
      refetchUserContracts();
      refetchPublicContracts();
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    }
  };
  return (
    <div className="paper contract-form">
      <FormHeader title="Edit Contract" />
      <Form
        validationSchema={validationSchema}
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
              Edit Contract
            </DefaultButton>
            {error && <div className="error-text">{error}</div>}
          </form>
        )}
      />
    </div>
  );
};

EditContractForm.propTypes = {
  closeDialog: PropTypes.func,
  refetchUserContracts: PropTypes.func,
  refetchPublicContracts: PropTypes.func,
  contractAddress: PropTypes.string,
  initialValues: PropTypes.object
};

export default EditContractForm;
