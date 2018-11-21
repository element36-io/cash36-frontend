import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import SearchBox from './SearchBox';
import AddContact from './AddContact';
import ContactItem from './ContactItem';
import { getContacts, removeContact } from '../../store/contacts/contacts.actions';
import './Contacts.scss';

class Contacts extends Component {
  state = {
    search: ''
  };

  componentDidMount () {
    if (!this.props.contacts.contactsList.length) this.props.getContacts();
  }

  searchChangeHandler = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  showContactForm = () => {
    console.log('====== ADD Contact');
  };

  removeContact = id => {
    this.props.removeContact(id);
  };

  renderList = () => {
    const { contacts: { contactsList } } = this.props;
    const search = this.state.search.toLowerCase();

    if (!contactsList.length) return null;

    return contactsList.filter(c => {
      return c.contactName.toLowerCase().includes(search) || c.contactAddress.toLowerCase().includes(search);
    }).map(c => <ContactItem key={c.id} contact={c} removeCallback={this.removeContact}/>);
  };

  render () {
    const { contacts: { fetching } } = this.props;
    const { search } = this.state;

    return (
      <div className='wrapper contacts'>
        <div className='contacts__actions'>
          <SearchBox changeHandler={this.searchChangeHandler} value={search}/>
          <AddContact clickHandler={this.showContactForm}/>
        </div>
        {fetching ?
          <div className='contacts__loader'><CircularProgress color='primary' size={75}/></div>
          : <div className='contacts__list'>{this.renderList()}</div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({ contacts });

export default connect(mapStateToProps, { getContacts, removeContact })(Contacts);
