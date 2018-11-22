import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/PersonAdd';
import CloseIcon from '@material-ui/icons/Close';
import addCash36 from '../../../components/cash36';
import BaseButton from '../../../components/Buttons/BaseButton';
import BackButton from '../../../components/Buttons/BackButton';
import Responsive from '../../../components/Responsive';
import ContactsInput from '../ContactsInput';
import ContactResponse from '../ContactResponse';

import './ContactsForm.scss';
import connect from 'react-redux/es/connect/connect';
import { getTokens } from '../../../store/tokens/tokens.actions';

class ContactsForm extends Component {

  state = {
    contactName: '',
    contactAddress: '',
    submitting: false,
    response: {
      showResponse: false,
      type: 'success',
      msg: '',
      btnText: ''
    }
  };

  changeHandler = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  addContact = evt => {
    evt.preventDefault();
    const { contactName, contactAddress } = this.state;

    this.setState({ submitting: true });

    this.props.submitCallback({ contactAddress, contactName })
      .then(res => {
        this.setResponse(true, 'success', `${contactName} was added to your contacts!`, 'Add another');
      }).catch(err => {
      this.setResponse(true, 'error', 'Ooops! There was an error', 'Try again');
    });
  };

  setResponse = (showResponse, type, msg, btnText) => {
    this.setState({
      submitting: false,
      response: { showResponse, type, msg, btnText }
    });
  };

  showForm = () => {
    this.setState({
      response: {
        ...this.state.response,
        show: false
      },
      contactName: '',
      contactAddress: ''
    });
  };

  validateForm = () => {
    const { contactName, contactAddress } = this.state;
    return !contactName.trim() || !this.props.web3.utils.isAddress(contactAddress);
  };

  render () {
    const { closeForm, isActive } = this.props;
    const { contactName, contactAddress, submitting, response: {showResponse, btnText, msg, type} } = this.state;
    const isValid = this.validateForm();

    return (
      <div className={`contact-form ${isActive ? '--active' : ''}`}>
        <Responsive isMobile>
          <BackButton onClick={closeForm}/>
        </Responsive>
        <Responsive>
          <CloseIcon className='contact-form__close' onClick={closeForm}/>
        </Responsive>
        {showResponse ?
          <ContactResponse onClick={this.showForm} type={type} btnText={btnText} title={msg}/>
          : (
            <Fragment>
              <div className="contact-form__header">
                <h2>
                  Add Contact
                </h2>
              </div>
              <form onSubmit={this.addContact}>
                <ContactsInput changeHandler={this.changeHandler} value={contactName} label="Full Name"
                               placeholder="Enter Contact Name" name="contactName"/>
                <ContactsInput changeHandler={this.changeHandler} value={contactAddress} label="Contact Address"
                               name="contactAddress"
                               placeholder="Enter Contact Address"/>
                <BaseButton type="submit" className="contact-form__btn" disabled={isValid || submitting}>
                  <div>
                    Add to contacts
                    <AddIcon className="contacts__add-btn__icon"/>
                  </div>
                </BaseButton>
              </form>
            </Fragment>
          )
        }
      </div>
    );
  }
}

ContactsForm.propTypes = {
  isActive: PropTypes.bool,
  closeForm: PropTypes.func.isRequired,
  submitCallback: PropTypes.func.isRequired,
};

export default addCash36(ContactsForm);
