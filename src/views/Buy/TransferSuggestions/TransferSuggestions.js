import React from 'react';
import PropTypes from 'prop-types';
import TransferContact from '../TransferContact';
import './TransferSuggestions.scss';

const TransferSuggestions = ({ contacts, onClick, filter }) => {
  const searchText = filter.trim().toLowerCase();
  const list = contacts.filter(
    c =>
      c.contactName.toLowerCase().includes(searchText) ||
      c.contactAddress.toLowerCase().includes(searchText)
  );

  if (!list.length) return null;

  return (
    <div
      className="transfer-address__transfer-suggestions"
      data-testid="transfer-suggestions"
    >
      {list.map(c => (
        <TransferContact contact={c} clickCallback={onClick} key={c.id} />
      ))}
    </div>
  );
};

TransferSuggestions.propTypes = {
  contacts: PropTypes.array,
  onClick: PropTypes.func,
  filter: PropTypes.string
};

export default TransferSuggestions;
