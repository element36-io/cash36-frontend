import React, { Fragment, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Responsive from '../../../components/Responsive';
import ContactsForm from '../ContactsForm/ContactsForm';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import ContactResponse from '../ContactResponse/ContactResponse';
import { Web3Context } from '../../../providers/web3.provider';
import {
  isWalletAddress,
  e36WalletType
} from '../../../helpers/wallet.helpers';
import './ContactFormContainer.scss';

const ContactsFormContainer = ({
  isActive,
  onSubmit,
  closeForm,
  contactsList
}) => {
  const [values, setValues] = useState({ contactName: '', walletAddress: '' });
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState({
    showResponse: false,
    type: 'success',
    msg: '',
    btnText: ''
  });
  const { web3 } = useContext(Web3Context);

  useEffect(() => {
    if (isActive) {
      setValues({ contactName: '', walletAddress: '' });
      setResponse({
        showResponse: false,
        type: 'success',
        msg: '',
        btnText: ''
      });
    }
  }, [isActive]);

  const changeHandler = evt => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  };

  const addContact = async evt => {
    evt.preventDefault();
    const { contactName, walletAddress } = values;

    setSubmitting(true);

    try {
      // backend store addresses as lowercase
      const addressType = await isWalletAddress(
        walletAddress.trim().toLowerCase()
      );

      if (addressType.result !== e36WalletType) {
        submitCallback(
          true,
          'error',
          'Wallet is not registered on e36, please tell recepient to register at e36 and to add his wallet',
          'Try again'
        );
        return;
      }

      await onSubmit({
        contactAddress: walletAddress.trim(),
        contactName: contactName.trim()
      });
      submitCallback(
        true,
        'success',
        `${contactName} was added to your contacts!`,
        'Add another'
      );
    } catch (error) {
      submitCallback(true, 'error', 'Ooops! There was an error', 'Try again');
    }
  };

  const submitCallback = (showResponse, type, msg, btnText) => {
    setSubmitting(false);
    setResponse({ showResponse, type, msg, btnText });
  };

  const showForm = () => {
    setValues({ contactName: '', walletAddress: '' });
    setResponse({ ...response, showResponse: false });
  };

  const validateForm = () => {
    const address = values.walletAddress.trim();
    const name = values.contactName.trim();

    return (
      !name ||
      !web3.utils.isAddress(address) ||
      !!contactsList.filter(
        c => address.toLowerCase() === c.contactAddress.toLowerCase()
      ).length
    );
  };

  const renderContent = () => {
    const { showResponse, btnText, type, msg } = response;
    const { walletAddress, contactName } = values;
    const isValid = validateForm();

    return (
      <div className={`contact-form-container ${isActive ? '--active' : ''}`}>
        <Responsive isMobile>
          <BackButton onClick={closeForm} />
        </Responsive>
        <Responsive>
          <CloseIcon
            className="contact-form__close"
            onClick={closeForm}
            data-testid="contact-form__close"
          />
        </Responsive>
        {showResponse ? (
          <ContactResponse
            onClick={showForm}
            type={type}
            btnText={btnText}
            title={msg}
          />
        ) : (
          <ContactsForm
            onSubmit={addContact}
            walletAddress={walletAddress}
            contactName={contactName}
            changeHandler={changeHandler}
            isValid={isValid}
            submitting={submitting}
          />
        )}
      </div>
    );
  };

  return (
    <Fragment>
      <Responsive isMobile>{renderContent()}</Responsive>
      <Responsive>
        <Dialog onClose={closeForm} open={isActive} maxWidth={false}>
          {renderContent()}
        </Dialog>
      </Responsive>
    </Fragment>
  );
};

ContactsFormContainer.propTypes = {
  isActive: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  contactsList: PropTypes.array.isRequired
};

export default ContactsFormContainer;
