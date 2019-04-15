import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { isEmail } from 'validator';
import moment from 'moment';
import IBAN from 'iban';
import editIcon from '../../../assets/icons/edit-icon.svg';
import API from '../../../config/api';
import { getKyc } from '../../../store/auth/auth.actions';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import EditableInput from '../EditableInput';
import EditableSelect from '../EditableSelect';
import DatePicker from '../../../components/Verification/DatePicker';

import './PersonalInformation.scss';

class PersonalInformation extends Component {
  state = {
    userInfo: {
      ..._.pick(this.props.user, ['firstName', 'lastName', 'dateOfBirth', 'email', 'street', 'streetNr', 'zip', 'city']),
      nationality: this.props.user.nationality.code,
      country: this.props.user.country.code
    },
    bankInfo: {
      ...this.props.user.bankAccounts[0]
    },
    formDisabled: true,
    errorMessage: ''
  };

  labels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    street: 'Street',
    zip: 'ZIP Code',
    city: 'Town/City',
    streetNr: 'Street Number',
    nationality: 'Nationality',
    country: 'Country',
    accountNr: 'Account Number',
    bankLine1: 'Bank Address Line 1',
    bankLine2: 'Bank Address Line 2',
    iban: 'IBAN'
  };

  toggleEdit = () => {
    if (!this.state.formDisabled) {
      this.setState({
        userInfo: {
          ..._.pick(this.props.user, ['firstName', 'lastName', 'dateOfBirth', 'email', 'street', 'streetNr', 'zip', 'city']),
          nationality: this.props.user.nationality.code,
          country: this.props.user.country.code
        },
        bankInfo: {
          ...this.props.user.bankAccounts[0]
        },
        errorMessage: ''
      });
    }
    this.setState({ formDisabled: !this.state.formDisabled });
  };

  userInfoTextChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [name]: value
      }
    });
  }

  bankInfoTextChange = evt => {
    const { name, value } = evt.target;
    this.setState({
      bankInfo: {
        ...this.state.bankInfo,
        [name]: value
      }
    });
  }

  handleDateChange = date => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        dateOfBirth: date
      }
    });
  };

  renderFormHeader = () => {
    if (this.props.user.kycLevel === 'Tier_1') return 'Tier 1 Verification - Complete';
    if (this.props.user.kycLevel === 'Tier_2') return 'Tier 2 Verification - Complete';
    return null;
  };

  handleFormSubmit = async (evt) => {
    evt.preventDefault();

    const payload = {
      firstName: this.state.userInfo.firstName,
      lastName: this.state.userInfo.lastName,
      dateOfBirth: this.state.userInfo.dateOfBirth,
      email: this.state.userInfo.email,
      street: this.state.userInfo.street,
      streetNr: this.state.userInfo.streetNr,
      zip: this.state.userInfo.zip,
      city: this.state.userInfo.city,
      country: this.state.userInfo.country,
      nationality: this.state.userInfo.nationality,
      accountNr: this.state.bankInfo.accountNr,
      bankLine1: this.state.bankInfo.bankLine1,
      bankLine2: this.state.bankInfo.bankLine2,
      iban: this.state.bankInfo.iban
    };

    const isFormFilled = Object.values(payload).filter(value => value).length > 13;
    const isEmailValid = isEmail(payload.email);
    const isIbanValid = IBAN.isValid(payload.iban);
    const userAge = (moment().year() - moment(payload.dateOfBirth).year());

    if (!isFormFilled) {
      this.setState({ errorMessage: 'One or more fields are empty. Please recheck.' });
      return;
    }
    if (userAge < 18) {
      this.setState({ errorMessage: 'Your age must be over 18' });
      return;
    }
    if (!isIbanValid) {
      this.setState({ errorMessage: 'Your IBAN is invalid, please recheck' });
      return;
    }
    if (!isEmailValid) {
      this.setState({ errorMessage: 'Please enter a valid email address' });
      return;
    }

    try {
      // check if date has been changed TODO - handle this better
      if (typeof (payload.dateOfBirth) === 'object') {
        payload.dateOfBirth = moment(payload.dateOfBirth).format('DD.MM.YYYY');
      }
      await API.post('/cash36/user/update-tier-1', payload);
      this.setState({ errorMessage: '', formDisabled: true });
      this.props.getKyc();
      console.log('submitted!');
    } catch (error) {
      this.setState({
        errorMessage: 'There was an error with your request'
      });
      console.log(error.response);
    }
  };

  renderField = (dataType, filedName) => {
    const { formDisabled } = this.state;
    const { nationalities, countries } = this.props;

    switch (filedName) {
      case 'dateOfBirth':
        return <DatePicker
          dateOfBirth={this.state[dataType][filedName]}
          onChange={this.handleDateChange}
          disabled={formDisabled}
          editable
          key={filedName}
        />;
      case 'country':
      case 'nationality':
        return <EditableSelect
          name={filedName}
          label={this.labels[filedName]}
          disabled={formDisabled}
          value={this.state[dataType][filedName]}
          countryData={filedName === 'nationality' ? nationalities : countries}
          onChange={this[`${dataType}TextChange`]}
          key={filedName}
        />;
      default:
        return <EditableInput
          name={filedName}
          label={this.labels[filedName]}
          disabled={formDisabled}
          value={this.state[dataType][filedName]}
          onChange={this[`${dataType}TextChange`]}
          key={filedName}
          data={dataType}
        />;
    }
  };

  render () {
    const { formDisabled, userInfo, bankInfo, errorMessage } = this.state;
    const { user: { kycLevel } } = this.props;

    return (
      <div className="personal-information">
        <h2>Personal Information</h2>
        <form className="paper" onSubmit={this.handleFormSubmit}>
          <div>
            <h3>{this.renderFormHeader()}</h3>
            {kycLevel === 'Tier_1' &&
              <button type="button" onClick={this.toggleEdit}>
                <img src={editIcon} alt="" />
              </button>
            }
          </div>
          <div className="personal-information__content">
            <div>
              {Object.keys(userInfo).map(field => this.renderField('userInfo', field))}
            </div>
            <h3>Bank Account</h3>
            <div>
              {Object.keys(bankInfo).map(field => this.renderField('bankInfo', field))}
            </div>
          </div>
          {!formDisabled &&
          <DefaultButton fullWidth type="submit" className="personal-information__submit-button">
            Submit
          </DefaultButton>}
          <span className="personal-information__error-message">{errorMessage}</span>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ countries: { countries = [], nationalities = [] } }) => ({ countries, nationalities });

PersonalInformation.propTypes = {
  user: PropTypes.object.isRequired,
  getKyc: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getKyc })(PersonalInformation);
