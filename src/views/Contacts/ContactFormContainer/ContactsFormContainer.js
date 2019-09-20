import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Responsive from '../../../components/Responsive';
import useCash36 from '../../../hooks/useCash36';
import ContactsForm from '../ContactsForm/ContactsForm';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import ContactResponse from '../ContactResponse/ContactResponse';
import './ContactFormContainer.scss';

const ContactsFormContainer = ({
  isActive,
  onSubmit,
  closeForm,
  contactsList
}) => {
  const [values, setValues] = useState({ contactName: '', contactAddress: '' });
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState({
    showResponse: false,
    type: 'success',
    msg: '',
    btnText: ''
  });
  const cash36 = useCash36();

  useEffect(() => {
    if (isActive) {
      setValues({ contactName: '', contactAddress: '' });
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
    const { contactName, contactAddress } = values;

    setSubmitting(true);

    try {
      await onSubmit({ contactAddress, contactName });
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
    setValues({ contactName: '', contactAddress: '' });
    setResponse({ ...response, showResponse: false });
  };

  const validateForm = () => {
    const { contactName, contactAddress } = values;
    const { web3 } = cash36;
    return (
      !contactName.trim() ||
      !web3.utils.isAddress(contactAddress) ||
      !!contactsList.filter(c => contactAddress === c.contactAddress).length
    );
  };

  const renderContent = () => {
    const { showResponse, btnText, type, msg } = response;
    const { contactAddress, contactName } = values;
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
            contactAddress={contactAddress}
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
