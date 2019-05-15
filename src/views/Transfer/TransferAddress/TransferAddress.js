import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import StepButton from '../../../components/Buttons/StepButton';
import TransferSuggestions from '../TransferSuggestions';
import TransferContacts from '../TransferContacts';
import SelectedContact from '../SelectedContact';
import './TransferAddress.scss';

class TransferAddress extends Component {
  state = {
    address: '',
    showSuggestions: false,
    selectedContact: null
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    const selectedContact = this.props.contactsList.filter(c => c.contactAddress === value.trim())[0] || null;
    this.setState({
      [name]: value,
      showSuggestions: !!(value.trim() && !selectedContact),
      selectedContact
    });
  };

  hideSuggestions = () => {
    if (!this.state.showSuggestions) return;
    this.setState({ showSuggestions: false });
  };

  showSuggestions = () => {
    const { address, selectedContact } = this.state;
    const filterText = address.trim().toLowerCase();
    const list = this.props.contactsList.filter(c => c.contactName.toLowerCase().includes(filterText) || c.contactAddress.toLowerCase().includes(filterText));
    this.setState({ showSuggestions: !!(list.length && !selectedContact && address) });
  };

  selectContact = selectedContact => {
    this.setState({ showSuggestions: false, address: selectedContact.contactAddress, selectedContact });
  };

  onSubmit = evt => {
    const target = this.props.contactsList.filter(c => c.contactAddress === this.state.address)[0] || { contactAddress: this.state.address };
    this.props.submitCallback(target);
  };

  validateAddress = () => {
    return this.props.utils.isAddress(this.state.address);
  };

  render () {
    const { address, showSuggestions, selectedContact } = this.state;
    const { contactsList } = this.props;

    return (
      <div className="transfer-address">
        <h2>Transfer Tokens</h2>
        <h4>Transfer tokens to</h4>
        {/* <span>{inputError}</span> */}
        <ClickAwayListener onClickAway={this.hideSuggestions}>
          <div className="transfer-address__search-container">
            <div className="transfer-address__input-wrapper">
              {selectedContact && <SelectedContact contact={selectedContact} />}

              <input onChange={this.handleChange} placeholder="Address"
                className={`${selectedContact ? 'selected-contact' : ''}`}
                name="address" value={address} autoComplete="off"
                onFocus={this.showSuggestions}
              />
              <span />
            </div>
            {!!contactsList && showSuggestions &&
            <TransferSuggestions contacts={contactsList} onClick={this.selectContact} filter={address} />}
          </div>
        </ClickAwayListener>

        {!!contactsList.length && <TransferContacts clickCallback={this.selectContact} contactsList={contactsList} />}
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
