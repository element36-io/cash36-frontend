import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import SearchBox from './SearchBox';
import AddContact from './AddContact';
import ContactItem from './ContactItem';
import ContactFormContainer from './ContactFormContainer';
import { getContacts, removeContact, addContact } from '../../store/contacts/contacts.actions';
import './Contacts.scss';

class Contacts extends Component {
  state = {
    search: '',
    showForm: false
  };

  componentDidMount () {
    this.props.getContacts();
  }

  searchChangeHandler = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  showForm = () => {
    this.setState({ showForm: true });
  };

  closeForm = () => {
    this.setState({ showForm: false });
  };

  removeContact = id => {
    this.props.removeContact(id);
  };

  renderList = () => {
    const { contacts: { contactsList } } = this.props;
    const search = this.state.search.toLowerCase().trim();

    if (!contactsList.length) return null;

    return contactsList.filter(c => {
      return c.contactName.toLowerCase().includes(search) || c.contactAddress.toLowerCase().includes(search);
    }).map(c => <ContactItem key={c.id} contact={c} removeCallback={this.removeContact} />);
  };

  render () {
    const { contacts: { fetching, contactsList }, addContact } = this.props;
    const { search, showForm } = this.state;

    return (
      <div className='wrapper contacts'>
        <ContactFormContainer closeForm={this.closeForm} submitCallback={addContact}
          isActive={showForm} contactsList={contactsList} />
        <div className='contacts__actions'>
          <SearchBox changeHandler={this.searchChangeHandler} value={search} />
          <AddContact clickHandler={this.showForm} />
        </div>
        {fetching
          ? <div className='contacts__loader'><CircularProgress color='primary' size={75} /></div>
          : <div className='contacts__list'>{this.renderList()}</div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({ contacts });

export default connect(mapStateToProps, { getContacts, removeContact, addContact })(Contacts);
