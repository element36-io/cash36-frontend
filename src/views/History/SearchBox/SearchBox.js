import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import './SearchBox.scss';

const SearchBox = ({ searchTerm, handleSearchChange, handleSearchTextSubmit }) => (
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
        InputProps={{
          disableUnderline: true
        }}
      />
    </div>
  </form>
);

export default SearchBox;
