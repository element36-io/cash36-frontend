import React from 'react';
import PropTypes from 'prop-types';
import './SearchBox.scss';

const SearchBox = ({ changeHandler, value }) => (
  <div className="contacts__search-box">
    <input
      type="text"
      name="search"
      placeholder="Search Contacts"
      value={value}
      onChange={changeHandler}
    />
  </div>
);

SearchBox.propTypes = {
  changeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default SearchBox;
