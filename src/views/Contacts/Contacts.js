import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import SearchBox from './SearchBox';
import AddButton from '../../components/Buttons/AddButton';
import ContactItem from './ContactItem';
import ContactFormContainer from './ContactFormContainer';
import {
  getContacts,
  removeContact,
  addContact
} from '../../store/contacts/contacts.actions';
import useGet from '../../hooks/useGet';

import './Contacts.scss';

const Contacts = ({ contacts, getContacts, removeContact, addContact }) => {
  const [search, setSearch] = useState('');
  const [activeForm, setActiveForm] = useState(false);

  const contactsError = useGet(getContacts)[1];

  const searchChangeHandler = evt => {
    setSearch(evt.target.value);
  };

  const showForm = () => {
    setActiveForm(true);
  };

  const closeForm = () => {
    setActiveForm(false);
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
        <ContactItem key={c.id} contact={c} removeCallback={removeContact} />
      ));
  };

  if (contactsError) {
    return (
      <div className="wrapper contacts">
        <div className="error-text">Fetching data error: {contactsError}</div>
      </div>
    );
  }

  return (
    <div className="wrapper contacts" data-testid="contacts">
      <ContactFormContainer
        closeForm={closeForm}
        onSubmit={addContact}
        isActive={activeForm}
        contactsList={contacts.contactsList}
      />
      <div className="contacts__actions">
        <SearchBox changeHandler={searchChangeHandler} value={search} />
        <AddButton onClick={showForm} text="Add Contact" />
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

Contacts.propTypes = {
  contacts: PropTypes.object,
  getContacts: PropTypes.func,
  removeContact: PropTypes.func,
  addContact: PropTypes.func
};

export default connect(
  mapStateToProps,
  { getContacts, removeContact, addContact }
)(Contacts);
