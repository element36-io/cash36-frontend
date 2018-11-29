import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import './SearchBox.scss';

const SearchBox = ({ searchTerm, handleSearchChange, handleSearchTextSubmit, fetchingFilters }) => (
  <form
    onSubmit={handleSearchTextSubmit}
    className='history__search-box paper'
  >
    <button type='submit'>
      <SearchIcon />
    </button>
    <div>
      <TextField
        type='text'
        placeholder='Search'
        value={searchTerm}
        onChange={handleSearchChange}
        disabled={fetchingFilters}
        InputProps={{
          disableUnderline: true
        }}
      />
    </div>
  </form>
);

SearchBox.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  handleSearchTextSubmit: PropTypes.func.isRequired,
  fetchingFilters: PropTypes.bool.isRequired
};

export default SearchBox;
