import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import useGet from '../../hooks/useGet';

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
  const [error, setError] = useState('');

  useGet(getContacts, setError);

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

  if (error) {
    return (
      <div className="wrapper contacts">
        <div className="error-text">Fetching data error: {error}</div>
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

Contacts.propTypes = {
  contacts: PropTypes.object,
  getContacts: PropTypes.func,
  removeContact: PropTypes.func,
  addContact: PropTypes.func,
  history: PropTypes.object
};

export default connect(
  mapStateToProps,
  { getContacts, removeContact, addContact }
)(Contacts);
