import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Form from '../../../components/Form';
import FormField from '../../../components/Form/FormField';
import FormHeader from '../../../components/Form/FormHeader';
import ProcessControls from '../ProcessControls';
import NationalitiesCheckbox from './NationalitiesCheckbox';
import { getCountries } from '../../../store/countries/countries.actions';
import validationSchema from './validation-schema';
import {
  initialValues,
  formModel,
  ibanModel,
  nationalityModel
} from './formModel';
import useGet from '../../../hooks/useGet';

import './Step1Tier1Form.scss';

export const Step1Tier1Form = ({
  countries,
  getCountries,
  changeSteps,
  avatarUri,
  user,
  stepError
}) => {
  const [error, setError] = useState('');
  const submit = async values => {
    try {
      const payload = {
        ...values,
        dateOfBirth: moment(values.dateOfBirth).format('DD.MM.YYYY'),
        avatarUrl: avatarUri,
        accountAddress: user.account
      };
      await changeSteps(1, payload);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    }
  };

  const countriesError = useGet(getCountries)[1];

  const fieldGroup = formModel.map(field => {
    if (field.type === 'select') field.list = countries;
    return field;
  });
  const nationalitySelects = nationalityModel.map(item => {
    item.list = countries;
    return item;
  });

  return (
    <div className="tier1-form">
      <FormHeader
        title="Verification Process - Step 1"
        subtitle="Please enter your personal and bank Information"
      />
      <Form
        submitCallback={submit}
        validationSchema={validationSchema}
        initialValues={{ ...initialValues, email: user.username }}
        render={(formProps, submitting) => (
          <form autoComplete="off" onSubmit={formProps.handleSubmit}>
            <h3>Personal Information</h3>
            <div className="tier1-form__field-group">
              {fieldGroup.map(field => (
                <FormField
                  key={field.name}
                  formField={field}
                  formProps={formProps}
                  disabled={field.disabled}
                  countryList={
                    field.name === 'country' || field.name === 'nationality'
                  }
                />
              ))}
            </div>
            <div className="tier1-form__field-group checkbox">
              <NationalitiesCheckbox
                formProps={formProps}
                fieldName="moreNationalities"
              />
            </div>
            {formProps.values.moreNationalities && (
              <div className="tier1-form__field-group">
                {nationalitySelects.map(field => (
                  <FormField
                    key={field.name}
                    formField={field}
                    formProps={formProps}
                    countryList
                  />
                ))}
              </div>
            )}

            <h3>Bank Account</h3>
            <FormField formField={ibanModel} formProps={formProps} />
            {!formProps.isValid && formProps.submitCount > 0 && (
              <p className="form-error">
                Please fill out all the required fields
              </p>
            )}
            <ProcessControls
              submitLabel="Submit & Continue"
              disabled={submitting}
              submitting={submitting}
              submitCallback={formProps.handleSubmit}
              error={error || stepError || countriesError}
            />
          </form>
        )}
      />
    </div>
  );
};

Step1Tier1Form.propTypes = {
  changeSteps: PropTypes.func.isRequired,
  countries: PropTypes.array,
  getCountries: PropTypes.func.isRequired,
  username: PropTypes.string,
  avatarUri: PropTypes.string,
  caseId: PropTypes.string,
  user: PropTypes.object,
  stepError: PropTypes.string
};

const mapStateToProps = ({
  auth: { user },
  countries: { countries = [] }
}) => ({ countries, user });

export default connect(mapStateToProps, { getCountries })(Step1Tier1Form);
