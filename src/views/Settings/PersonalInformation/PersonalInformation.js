import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import editIcon from '../../../assets/icons/edit-icon.svg';
import EditableInput from '../EditableInput';
import EditableSelect from '../EditableSelect';

import './PersonalInformation.scss';

class PersonalInformation extends Component {
  state = {
    formDisabled: true,
    firstName: '',
    lastName: this.props.user.lastName,
    email: this.props.user.email,
    street: this.props.user.street,
    streetNr: this.props.user.streetNr,
    zip: this.props.user.zip,
    city: this.props.user.city,
    country: '',
    nationality: '',
    iban: '',
    bankLine1: '',
    accountNr: '',
    bankLine2: ''
  }

  toggleEdit = () => {
    this.setState({ formDisabled: !this.state.formDisabled });
  }

  handleTextChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, errorMessage: '' });
  };

  renderFormHeader = () => {
    if (this.props.user.kycLevel === 'Tier_1') return 'Tier 1 Verification - Complete';
    if (this.props.user.kycLevel === 'Tier_2') return 'Tier 2 Verification - Complete';
    return null;
  }

  render () {
    const {
      formDisabled,
      firstName,
      lastName,
      email,
      street,
      streetNr,
      zip,
      city,
      nationality,
      country,
      iban,
      bankLine1,
      accountNr,
      bankLine2
    } = this.state;
    const { user: { kycLevel }, countries, nationalities } = this.props;
    return (
      <Fragment>
        {kycLevel === 'Tier_0' &&
          <div className='paper personal-information__tier-0'>
            In order to see and edit your personal data, please verify your account.
          </div>
        }
        {kycLevel !== 'Tier_0' &&
        <div className='personal-information'>
          <h2>Personal Information</h2>
          <form className='paper'>
            <div>
              <h3>{this.renderFormHeader()}</h3>
              <button type='button' onClick={this.toggleEdit}>
                <img src={editIcon} alt='' />
              </button>
            </div>
            <div className='personal-information__content'>
              <div>
                <EditableInput
                  name='firstName'
                  label='First Name'
                  disabled={formDisabled}
                  value={firstName || this.props.user.firstName}
                  onChange={this.handleTextChange}
                />
                <EditableInput
                  name='lastName'
                  label='Last Name'
                  disabled={formDisabled}
                  value={lastName}
                  onChange={this.handleTextChange}
                />
                <EditableInput
                  name='email'
                  label='Email'
                  disabled={formDisabled}
                  value={email}
                  onChange={this.handleTextChange}
                  type='email'
                />
                <EditableInput
                  name='street'
                  label='Street'
                  disabled={formDisabled}
                  value={street}
                  onChange={this.handleTextChange}
                />
                <EditableInput
                  name='streetNr'
                  label='Street Number'
                  disabled={formDisabled}
                  value={streetNr}
                  onChange={this.handleTextChange}
                />
                <EditableInput
                  name='zip'
                  label='ZIP Code'
                  disabled={formDisabled}
                  value={zip}
                  onChange={this.handleTextChange}
                />
                <EditableInput
                  name='city'
                  label='Town/City'
                  disabled={formDisabled}
                  value={city}
                  onChange={this.handleTextChange}
                />
                <EditableSelect
                  name='country'
                  label='Country of Residence'
                  disabled={formDisabled}
                  value={country || this.props.user.country.code}
                  countryData={countries}
                  onChange={this.handleTextChange}
                />
                <EditableSelect
                  name='nationality'
                  label='Nationality'
                  disabled={formDisabled}
                  value={nationality || this.props.user.nationality.code}
                  countryData={nationalities}
                  onChange={this.handleTextChange}
                />
              </div>
              <h3>Bank Account</h3>
              <div>
                <EditableInput
                  name='iban'
                  label='IBAN'
                  disabled={formDisabled}
                  value={iban || this.props.user.bankAccounts[0].iban}
                  onChange={this.handleTextChange}
                />
                <EditableInput
                  name='bankLine1'
                  label='Bank Address Line 1'
                  disabled={formDisabled}
                  value={bankLine1 || this.props.user.bankAccounts[0].bankLine1}
                  onChange={this.handleTextChange}
                />
                <EditableInput
                  name='accountNr'
                  label='Account Number'
                  disabled={formDisabled}
                  value={accountNr || this.props.user.bankAccounts[0].accountNr}
                  onChange={this.handleTextChange}
                />
                <EditableInput
                  name='bankLine2'
                  label='Bank Address Line 2'
                  disabled={formDisabled}
                  value={bankLine2 || this.props.user.bankAccounts[0].bankLine2}
                  onChange={this.handleTextChange}
                />
              </div>
            </div>
          </form>
        </div>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth: { user }, countries: { countries = [], nationalities = [] } }) =>
  ({
    user,
    countries,
    nationalities
  });

PersonalInformation.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PersonalInformation);
