import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import StepButton from '../../../components/Buttons/StepButton';
import TransferSuggestions from '../TransferSuggestions';
import TransferContacts from '../TransferContacts';
import SelectedContact from '../SelectedContact';
import './TransferAddress.scss';

const TransferAddress = ({ submitCallback, contactsList, utils }) => {
  const [address, setAddress] = useState('');
  const [activeSuggestions, setActiveSuggestions] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleChange = evt => {
    const { value } = evt.target;
    const contact =
      contactsList.filter(c => c.contactAddress === value.trim())[0] || null;
    setAddress(value);
    setSelectedContact(contact);
    setActiveSuggestions(!!(value.trim() && !selectedContact));
  };

  const hideSuggestions = () => {
    if (!activeSuggestions) return;
    setActiveSuggestions(false);
  };

  const showSuggestions = () => {
    const filterText = address.trim().toLowerCase();
    const list = contactsList.filter(
      c =>
        c.contactName.toLowerCase().includes(filterText) ||
        c.contactAddress.toLowerCase().includes(filterText)
    );
    setActiveSuggestions(!!(list.length && !selectedContact && address));
  };

  const selectContact = contact => {
    setActiveSuggestions(false);
    setAddress(contact.contactAddress);
    setSelectedContact(contact);
  };

  const onSubmit = () => {
    const target = contactsList.filter(
      c => c.contactAddress === address
    )[0] || { contactAddress: address };
    submitCallback(target);
  };

  const validateAddress = () => {
    return utils.isAddress(address);
  };

  console.log(contactsList);

  return (
    <div className="transfer-address">
      <h2>Transfer Tokens</h2>
      <h4>Transfer tokens to</h4>
      <ClickAwayListener onClickAway={hideSuggestions}>
        <div className="transfer-address__search-container">
          <div className="transfer-address__input-wrapper">
            {selectedContact && <SelectedContact contact={selectedContact} />}

            <input
              onChange={handleChange}
              placeholder="Address"
              className={`${selectedContact ? 'selected-contact' : ''}`}
              name="address"
              value={address}
              autoComplete="off"
              onFocus={showSuggestions}
            />
            <span />
          </div>
          {!!contactsList && activeSuggestions && (
            <TransferSuggestions
              contacts={contactsList}
              onClick={selectContact}
              filter={address}
            />
          )}
        </div>
      </ClickAwayListener>

      {!!contactsList.length && (
        <TransferContacts
          clickCallback={selectContact}
          contactsList={contactsList}
        />
      )}
      <StepButton
        text={'Next Step'}
        onClick={onSubmit}
        disabled={!validateAddress()}
      />
    </div>
  );
};

TransferAddress.propTypes = {
  submitCallback: PropTypes.func,
  utils: PropTypes.object.isRequired,
  contactsList: PropTypes.array
};

export default TransferAddress;
