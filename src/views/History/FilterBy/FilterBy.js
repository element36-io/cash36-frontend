import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { MenuItem, TextField } from '@material-ui/core';

import './FilterBy.scss';

const filters = ['Date', 'Name', 'Amount'];

const FilterBy = ({ filterBy, handleFilterChange }) => (
  <div className='history__filter-by paper'>
    <span>Filter by:</span>
    <TextField
      name='filterBy'
      select
      value={filterBy}
      onChange={handleFilterChange}
      fullWidth
      InputProps={{
        disableUnderline: true,
        className: 'history__filter-by__input'
      }}
      SelectProps={{
        displayEmpty: true,
        IconComponent: KeyboardArrowDownIcon
      }}
    >
      {filters.map((filter) => <MenuItem key={filter} value={filter}>{filter}</MenuItem>)}
    </TextField>
  </div>
);

export default FilterBy;
