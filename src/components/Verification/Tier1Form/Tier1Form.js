import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import VerificationHeader from '../VerificationHeader';
import VerificationActions from '../VerificationActions';
import VerificationProgress from '../VerificationProgress/VerificationProgress';
import VerificationSuccess from '../VerificationSuccess/VerificationSuccess';
import { getCountries } from '../../../store/countries/countries.actions';
import { getKyc } from '../../../store/auth/auth.actions';
import DatePicker from '../DatePicker';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';
import API from '../../../config/api';

import './Tier1Form.scss';

export class Tier1Form extends Component {
    state = {
      firstName: '',
      lastName: '',
      dob: null,
      city: '',
      street: '',
      country: '',
      nationality: '',
      streetNr: '',
      zip: '',
      iban: '',
      bankLine1: '',
      bankLine2: '',
      accountNr: '',
      email: '',
      errorMessage: '',
      submitting: false,
      submitted: false
    };

    componentDidMount () {
      if (!this.props.countries.length || !this.props.nationalities.length) this.props.getCountries();
    }

    handleTextChange = event => {
      const { name, value } = event.target;
      this.setState({ [name]: value, errorMessage: '' });
    };

    handleDateChange = (date) => {
      this.setState({ dob: date, errorMessage: '' });
    };

    handleFormSubmit = async (event) => {
      event.preventDefault();
      const {
        firstName,
        lastName,
        dob,
        city,
        street,
        country,
        nationality,
        streetNr,
        zip,
        iban,
        bankLine1,
        bankLine2,
        accountNr,
        email,
        errorMessage
      } = this.state;
      const { getKyc, toggleModalBlock } = this.props;
      // check if all values in the form are filled
      const isFormFilled = Object.values(this.state).filter(value => value).length === 14;
      const userAge = (moment().year() - moment(this.state.dob).year());
      // check if user > 18
      if (userAge < 18) {
        this.setState({ errorMessage: 'You must be over 18 to use the app' });
        return;
      }
      if (!errorMessage && isFormFilled) {
        // Submit the form
        try {
          const data = {
            accountNr,
            bankLine1,
            bankLine2,
            city,
            country,
            dateOfBirth: moment(dob).format('DD.MM.YYYY'),
            firstName,
            iban,
            lastName,
            nationality,
            street,
            streetNr,
            zip,
            email
          };
          this.setState({ submitting: true, submitted: false });
          toggleModalBlock();
          await API.post('/cash36/user/tier-1', data);
          this.setState({ submitting: false, submitted: true });
          toggleModalBlock();
          getKyc();
        } catch (error) {
          this.setState({
            errorMessage: 'There was an error with your request',
            submitting: false,
            submitted: false
          });
          toggleModalBlock();
          console.log(error.response);
        }
      } else {
        this.setState({ errorMessage: 'One or more fields are empty. Please recheck.' });
      }
    };

    renderForm = () => {
      const { countries, nationalities, close } = this.props;
      const { firstName, lastName, dob, city, country, nationality, street, streetNr, zip, iban, bankLine1, bankLine2, accountNr, email, errorMessage } = this.state;

      return (
        <form className='verification-form__tier1' onSubmit={this.handleFormSubmit} noValidate>
          <CloseIcon onClick={close} className='verification-form__close' />
          <VerificationHeader title='Tier 1 Verification'
            subtitle='Please, enter your personal information so you can remove certain limits from your account' />
          <h3 className='verification-form__heading'>Personal Information</h3>
          <div className='verification-form__content'>
            <TextInput
              name='firstName'
              value={firstName}
              label='First Name'
              placeholder='First Name'
              onChange={this.handleTextChange}
            />
            <TextInput
              name='lastName'
              value={lastName}
              label='Last Name'
              placeholder='Last Name'
              onChange={this.handleTextChange}
            />
            <DatePicker
              dob={dob}
              onChange={this.handleDateChange}
            />
            <TextInput
              name='email'
              value={email}
              label='Email'
              type='email'
              placeholder='Enter Your Email'
              onChange={this.handleTextChange}
            />
            <TextInput
              name='street'
              value={street}
              label='Street'
              placeholder='Enter Your Address'
              onChange={this.handleTextChange}
            />
            <TextInput
              name='streetNr'
              value={streetNr}
              label='Street Number'
              placeholder='Enter Your Address'
              onChange={this.handleTextChange}
            />
            <TextInput
              name='zip'
              value={zip}
              label='ZIP Code'
              placeholder='00000'
              onChange={this.handleTextChange}
            />
            <TextInput
              name='city'
              value={city}
              label='Town/City'
              placeholder='Enter Your City'
              onChange={this.handleTextChange}
            />
            <SelectInput
              name='country'
              label='Country of Residence'
              value={country}
              countryData={countries}
              onChange={this.handleTextChange}
            />
            <SelectInput
              name='nationality'
              label='Nationality'
              value={nationality}
              countryData={nationalities}
              onChange={this.handleTextChange}
            />
          </div>
          <h3 className='verification-form__heading'>Bank Account</h3>
          <div className='verification-form__content'>
            <TextInput
              name='iban'
              value={iban}
              label='IBAN'
              placeholder='Enter Your IBAN'
              onChange={this.handleTextChange}
            />
            <TextInput
              name='bankLine1'
              value={bankLine1}
              label='Bank Address Line 1'
              placeholder='Enter Bank Address Line 1'
              onChange={this.handleTextChange}
            />
            <TextInput
              name='accountNr'
              value={accountNr}
              label='Account Number'
              placeholder='Enter Your Account Number'
              onChange={this.handleTextChange}
            />
            <TextInput
              name='bankLine2'
              value={bankLine2}
              label='Bank Address Line 2'
              placeholder='Enter Bank Address Line 2'
              onChange={this.handleTextChange}
            />
          </div>
          <VerificationActions close={close} buttonCallback={this.handleFormSubmit}
            buttonText='Submit & Continue' />
          {errorMessage && <p className='verification-form__tier1--error'>{errorMessage}</p>}
        </form>
      );
    };

    renderProgress = () => {
      return <VerificationProgress tier='Tier 1' />;
    };

    renderSuccess = () => {
      const { close, nextStep } = this.props;
      return (
        <Fragment>
          <CloseIcon onClick={close} className='verification-form__close' />
          <VerificationSuccess close={close} next={nextStep} />
        </Fragment>
      );
    };

    render () {
      const { submitted, submitting } = this.state;
      if (submitting) {
        return this.renderProgress();
      } else if (submitted) {
        return this.renderSuccess();
      } else {
        return this.renderForm();
      }
    }
}

Tier1Form.propTypes = {
  nextStep: PropTypes.func,
  close: PropTypes.func,
  toggleModalBlock: PropTypes.func
};

const mapStateToProps = ({ countries: { countries = [], nationalities = [] } }) => ({ countries, nationalities });

export default connect(mapStateToProps, { getCountries, getKyc })(Tier1Form);
