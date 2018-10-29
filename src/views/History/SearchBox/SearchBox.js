import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import './SearchBox.scss';

const SearchBox = ({ searchTerm, handleSearchChange }) => (
  <div className='history__search-box paper'>
    <div>
      <SearchIcon />
    </div>
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
  </div>
);

export default SearchBox;
