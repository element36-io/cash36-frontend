import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StepButton from '../../../components/Buttons/StepButton';
import TransferSuggestions from '../TransferSuggestions';
import './TransferAddress.scss';

class TransferAddress extends Component {
  state = {
    address: '',
    showSuggestions: false,
    selectedContact: null
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    let contact = this.state.selectedContact;
    if (contact && value.trim() !== contact.contactAddress) contact = null;
    this.setState({ [name]: value, showSuggestions: true, contact });
  };

  onSuggestionClick = selectedContact => {
    this.setState({ showSuggestions: false, address: selectedContact.contactAddress, selectedContact });
  };

  onSubmit = evt => {
    const target = this.state.selectedContact ? this.state.selectedContact : { contactAddress: this.state.address };
    this.props.submitCallback(target);
  };

  validateAddress = () => {
    return this.props.utils.isAddress(this.state.address);
  };

  render () {
    const { address, showSuggestions } = this.state;
    const { contactsList } = this.props;

    return (
      <div className='transfer-address'>
        <h2>Transfer Tokens</h2>
        <h4>Transfer tokens to</h4>
        <div className='transfer-address__search-container'>
          <div className='transfer-address__input-wrapper'>
            <input onChange={this.handleChange} placeholder='Address' name='address' value={address} autoComplete='off' />
            <span />
          </div>
          {/* <span>{inputError}</span> */}
          {address.trim() && showSuggestions && <TransferSuggestions contacts={contactsList} onClick={this.onSuggestionClick} filter={address} />}
        </div>
        <StepButton text={'Next Step'} onClick={this.onSubmit} disabled={!this.validateAddress()} />
      </div>
    );
  }
}

TransferAddress.propTypes = {
  submitCallback: PropTypes.func,
  utils: PropTypes.object.isRequired,
  contactsList: PropTypes.array
};

export default TransferAddress;
