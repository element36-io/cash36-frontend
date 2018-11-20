import React, { Component } from 'react';
import {connect} from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import SearchBox from './SearchBox';
import AddContact from './AddContact';
import ContactItem from './ContactItem';
import { getContacts } from '../../store/contacts/contacts.actions';
import './Contacts.scss';

class Contacts extends Component {

  componentDidMount() {
    if(!this.props.contacts.contactsList.length) this.props.getContacts();
  }

  searchChangeHandler = evt => {
    const {name, value} = evt.target;
  }

  showContactForm = () => {
    console.log('====== ADD Contact');
  }

  removeContact = contactId => {
    console.log(`======= CONTACT REMOVE ${contactId}`)
  }

  render () {
    const { contacts: {fetching, error, contactsList}} = this.props;

    return (
      <div className="wrapper contacts">
        <div className="contacts__actions">
          <SearchBox changeHandler={this.searchChangeHandler}/>
          <AddContact clickHandler={this.showContactForm}/>
        </div>
        {fetching && (
          <div className='contacts__loader'>
            <CircularProgress color='primary' size={75}/>
          </div>
        )}
        {!fetching && contactsList.length && (
          <div className="contacts__list">
            {contactsList.map(c => <ContactItem key={c.id} contact={c} removeCallback={this.removeContact} />)}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({ contacts });

export default connect(mapStateToProps, { getContacts })(Contacts)
