import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import addCash36 from '../../../components/cash36';
import Responsive from '../../../components/Responsive';
import ContactsForm from '../ContactsForm/ContactsForm';
import BackButton from '../../../components/Buttons/BackButton/BackButton';
import ContactResponse from '../ContactResponse/ContactResponse';
import './ContactFormContainer.scss';

class ContactsFormContainer extends Component {
  state = {
    contactName: '',
    contactAddress: '',
    submitting: false,
    error: null,
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
      .then(() => {
        this.setResponse(true, 'success', `${contactName} was added to your contacts!`, 'Add another');
      }).catch(() => {
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
        showResponse: false
      },
      contactName: '',
      contactAddress: ''
    });
  };

  validateForm = () => {
    const { contactName, contactAddress } = this.state;
    const { contactsList, web3 } = this.props;
    return !contactName.trim() || !web3.utils.isAddress(contactAddress) || !!contactsList.filter(c => contactAddress === c.contactAddress).length;
  };

  closeForm = () => {
    this.props.closeForm();
    setTimeout(() => {
      this.setState({
        contactName: '',
        contactAddress: '',
        submitting: false,
        error: null,
        response: {
          ...this.state.response,
          showResponse: false
        }
      });
    }, 300);
  };

  renderContent = () => {
    const { isActive } = this.props;
    const { submitting, contactAddress, contactName, response: { showResponse, btnText, type, msg } } = this.state;
    const isValid = this.validateForm();

    return (
      <div className={`contact-form-container ${isActive ? '--active' : ''}`}>
        <Responsive isMobile>
          <BackButton onClick={this.closeForm} />
        </Responsive>
        <Responsive>
          <CloseIcon className="contact-form__close" onClick={this.closeForm} />
        </Responsive>
        {showResponse
          ? <ContactResponse onClick={this.showForm} type={type} btnText={btnText} title={msg} />
          : <ContactsForm onSubmit={this.addContact} contactAddress={contactAddress}
            contactName={contactName} changeHandler={this.changeHandler}
            isValid={isValid} submitting={submitting}
          />
        }
      </div>
    );
  };

  render () {
    const { isActive } = this.props;

    return (
      <Fragment>
        <Responsive isMobile>
          {this.renderContent()}
        </Responsive>
        <Responsive>
          <Dialog onClose={this.closeForm} open={isActive} maxWidth={false}>
            {this.renderContent()}
          </Dialog>
        </Responsive>
      </Fragment>
    );
  }
}

ContactsFormContainer.propTypes = {
  isActive: PropTypes.bool,
  submitCallback: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired,
  contactsList: PropTypes.array.isRequired
};

export default addCash36(ContactsFormContainer);
