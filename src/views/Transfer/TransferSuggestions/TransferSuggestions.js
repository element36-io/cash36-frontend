import React from 'react';
import PropTypes from 'prop-types';
import SuggestionItem from '../SuggestionItem';
import './TransferSuggestions.scss';

const TransferSuggestions = props => {
  const { contacts, onClick, filter } = props;
  const searchText = filter.trim().toLowerCase();
  const list = contacts.filter(c => c.contactName.toLowerCase().includes(searchText) || c.contactAddress.toLowerCase().includes(searchText));

  return (
    <div className='transfer-address__transfer-suggestions'>
      {list.map(c => (
        <SuggestionItem contact={c} clickCallback={onClick} key={c.id} />
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
