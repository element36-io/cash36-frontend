import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../../../components/Form';
import FormField from '../../../components/Form/FormField';
import ProcessHeader from '../ProcessHeader';
import ProcessControls from '../ProcessControls';
import { getCountries } from '../../../store/countries/countries.actions';
import validationSchema from './validation-schema';
import {
  initialValues,
  formModel,
  countriesModel,
  ibanModel,
  nationalityModel
} from './formModel';
import './Step1Tier1Form.scss';

const Step1Tier1Form = props => {
  const { countries, nationalities, getCountries, changeSteps } = props;

  const submit = values => {
    console.log(values);
    console.log(changeSteps);
  };

  useEffect(() => {
    if (!countries.length || !nationalities.length) {
      getCountries();
    }
  }, []);

  const countriesSelect = { ...countriesModel, list: countries };
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
              {formModel.map(field => (
                <FormField
                  key={field.name}
                  formField={field}
                  formProps={formProps}
                />
              ))}
              <FormField
                formField={countriesSelect}
                formProps={formProps}
                countryList
              />
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
            <ProcessControls
              submitLabel="Submit & Continue"
              disabled={!formProps.isValid || submitting}
              submitting={submitting}
              submitCallback={formProps.handleSubmit}
            />
          </form>
        )}
      />
    </div>
  );
};

Step1Tier1Form.propTypes = {
  changeSteps: PropTypes.func.isRequired,
  getCountries: PropTypes.func.isRequired
};

const mapStateToProps = ({
  countries: { countries = [], nationalities = [] }
}) => ({ countries, nationalities });

export default connect(
  mapStateToProps,
  { getCountries }
)(Step1Tier1Form);
