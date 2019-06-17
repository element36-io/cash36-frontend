import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import SearchBox from './SearchBox';
import AddContact from './AddContact';
import ContactItem from './ContactItem';
import ContactFormContainer from './ContactFormContainer';
import {
  getContacts,
  removeContact,
  addContact
} from '../../store/contacts/contacts.actions';
import './Contacts.scss';

const Contacts = ({
  contacts,
  getContacts,
  removeContact,
  addContact,
  history
}) => {
  const [search, setSearch] = useState('');
  const [activeForm, setActiveForm] = useState(false);

  useEffect(() => {
    getContacts();
  }, []);

  const searchChangeHandler = evt => {
    setSearch(evt.target.value);
  };

  const showForm = () => {
    setActiveForm(true);
  };

  const closeForm = () => {
    setActiveForm(false);
  };

  const quickTransfer = contact => {
    history.push('/transfer', { quickTransfer: contact });
  };

  const renderList = () => {
    const { contactsList } = contacts;

    if (!contactsList.length) return null;

    return contactsList
      .filter(c => {
        return (
          c.contactName.toLowerCase().includes(search.toLowerCase().trim()) ||
          c.contactAddress.toLowerCase().includes(search.toLowerCase().trim())
        );
      })
      .map(c => (
        <ContactItem
          key={c.id}
          contact={c}
          removeCallback={removeContact}
          quickTransfer={quickTransfer}
        />
      ));
  };

  return (
    <div className="wrapper contacts">
      <ContactFormContainer
        closeForm={closeForm}
        onSubmit={addContact}
        isActive={activeForm}
        contactsList={contacts.contactsList}
      />
      <div className="contacts__actions">
        <SearchBox changeHandler={searchChangeHandler} value={search} />
        <AddContact clickHandler={showForm} />
      </div>
      {contacts.fetching ? (
        <div className="contacts__loader">
          <CircularProgress color="primary" size={75} />
        </div>
      ) : (
        <div className="contacts__list">{renderList()}</div>
      )}
    </div>
  );
};

const mapStateToProps = ({ contacts }) => ({ contacts });

export default connect(
  mapStateToProps,
  { getContacts, removeContact, addContact }
)(Contacts);
