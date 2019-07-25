import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Form from '../../../components/Form';
import FormField from '../../../components/Form/FormField';
import ProcessHeader from '../ProcessHeader';
import ProcessControls from '../ProcessControls';
import { getCountries } from '../../../store/countries/countries.actions';
import validationSchema from './validation-schema';
import {
  initialValues,
  formModel,
  ibanModel,
  nationalityModel
} from './formModel';
import './Step1Tier1Form.scss';

const Step1Tier1Form = ({
  countries,
  nationalities,
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
        accountAddress: user.account,
        metaMask: user.useMetamask
      };
      await changeSteps(1, payload);
    } catch (error) {
      setError(error);
      return Promise.reject(error);
    }
  };

  useEffect(() => {
    if (!countries.length || !nationalities.length) {
      callGetCountries();
    }
  }, []);

  const callGetCountries = async () => {
    try {
      await getCountries();
    } catch (error) {
      setError(error);
    }
  };

  const fieldGroup = formModel.map(field => {
    if (field.name === 'country') field.list = countries;
    return field;
  });
  const nationalitySelects = nationalityModel.map(item => {
    item.list = nationalities;
    return item;
  });

  return (
    <div className="tier1-form">
      <ProcessHeader
        title="Verification Process - Step 1"
        subtitle="Please enter your personal and bank Information"
      />
      <Form
        submitCallback={submit}
        validationSchema={validationSchema}
        initialValues={initialValues}
        render={(formProps, submitting) => (
          <form autoComplete="off" onSubmit={formProps.handleSubmit}>
            <h3>Personal Information</h3>
            <div className="tier1-form__field-group">
              {fieldGroup.map(field => (
                <FormField
                  key={field.name}
                  formField={field}
                  formProps={formProps}
                  countryList={field.name === 'country'}
                />
              ))}
            </div>
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
              error={error || stepError}
            />
          </form>
        )}
      />
    </div>
  );
};

Step1Tier1Form.propTypes = {
  changeSteps: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired,
  username: PropTypes.string,
  avatarUri: PropTypes.string,
  caseId: PropTypes.string,
  user: PropTypes.object,
  stepError: PropTypes.string
};

const mapStateToProps = ({
  auth: { user },
  countries: { countries = [], nationalities = [] }
}) => ({ countries, nationalities, user });

export default connect(
  mapStateToProps,
  { getCountries }
)(Step1Tier1Form);
