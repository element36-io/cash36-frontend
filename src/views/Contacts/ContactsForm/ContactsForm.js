import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/PersonAdd';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import addCash36 from '../../../components/cash36';
import BaseButton from '../../../components/Buttons/BaseButton';
import Responsive from '../../../components/Responsive';
import ContactsInput from '../ContactsInput';
import ContactResponse from '../ContactResponse';
import './ContactsForm.scss';

const ContactsForm = props => {
  const { onSubmit, contactName, changeHandler, contactAddress, submitting, isValid } = props;

  return (
    <div className='contact-form'>
      <div className="contact-form__header">
        <h2>
          Add Contact
        </h2>
      </div>
      <form onSubmit={onSubmit}>
        <ContactsInput changeHandler={changeHandler} value={contactName} label="Full Name"
                       placeholder="Enter Contact Name" name="contactName"/>
        <ContactsInput changeHandler={changeHandler} value={contactAddress} label="Contact Address"
                       name="contactAddress"
                       placeholder="Enter Contact Address"/>
        <BaseButton type="submit" className={`contact-form__btn ${submitting ? '--submitting' : ''}`}
                    disabled={isValid || submitting}>
          {submitting ?
            <div><CircularProgress color='secondary' size={20}/></div>
            : <div>Add to contacts <AddIcon className="contacts__add-btn__icon"/></div>
          }
        </BaseButton>
      </form>
    </div>
  );
};

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  contactAddress: PropTypes.string,
  contactName: PropTypes.string,
  isValid: PropTypes.bool,
  submitting: PropTypes.bool
};

export default ContactsForm;
