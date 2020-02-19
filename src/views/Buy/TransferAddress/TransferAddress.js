import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import StepButton from '../../../components/Buttons/StepButton';
import BackButton from '../../../components/Buttons/BackButton';
import TransferSuggestions from '../TransferSuggestions';
import TransferContacts from '../TransferContacts';
import SelectedContact from '../SelectedContact';
import { Web3Context } from '../../../providers/web3.provider';
import { isWalletAddress } from '../../../helpers/wallet.helpers';
import BuyFooter from '../BuyFooter';
import { useHistory } from 'react-router-dom';

import './TransferAddress.scss';

const TransferAddress = ({
  submitCallback,
  contactsList,
  setStep,
  target,
  quickActions
}) => {
  const [address, setAddress] = useState(target ? target.contactAddress : '');
  const [activeSuggestions, setActiveSuggestions] = useState(false);
  const [selectedContact, setSelectedContact] = useState(target);
  const [isWallet, setIsWallet] = useState(true);
  const { utils } = useContext(Web3Context);
  const history = useHistory();

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

  const onSubmit = async () => {
    try {
      const res = await isWalletAddress(address);
      if (!res) {
        setIsWallet(false);
        return;
      }
      const target = contactsList.filter(
        c => c.contactAddress === address
      )[0] || { contactAddress: address };
      submitCallback(target);
    } catch (error) {
      console.log(error);
    }
  };

  const validateAddress = () => {
    return utils.isAddress(address);
  };

  useEffect(() => {
    setIsWallet(true);
  }, [address]);

  return (
    <div className="transfer-address" data-testid="buy__choose-address">
      {quickActions ? (
        <BackButton
          onClick={() => {
            history.goBack();
          }}
        />
      ) : (
        <BackButton onClick={() => setStep(0)} />
      )}
      <h2>Send tokens to</h2>
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
          {!isWallet && (
            <p className="error-text">
              Wallet is not registered on e36, please tell recepient to register
              at e36 and to add his wallet
            </p>
          )}
          {!!contactsList && activeSuggestions && (
            <TransferSuggestions
              contacts={contactsList}
              onClick={selectContact}
              filter={address}
            />
          )}
        </div>
      </ClickAwayListener>

      {contactsList && !!contactsList.length && (
        <TransferContacts
          clickCallback={selectContact}
          contactsList={contactsList}
        />
      )}
      <StepButton
        text={'Next Step'}
        onClick={onSubmit}
        disabled={!validateAddress() || !isWallet}
      />
      <BuyFooter
        textline1="Sending cash36 Tokens is as simple as a bank transfer. First, add address you wish to send tokens to."
        textline2="After that you will select the amount and the type of Token you wish to send."
      />
    </div>
  );
};

TransferAddress.propTypes = {
  submitCallback: PropTypes.func,
  setStep: PropTypes.func,
  contactsList: PropTypes.array,
  target: PropTypes.object,
  quickActions: PropTypes.bool
};

export default TransferAddress;
