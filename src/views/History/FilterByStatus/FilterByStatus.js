import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { MenuItem, TextField } from '@material-ui/core';

import './FilterByStatus.scss';

const filters = ['All', 'Open', 'Completed', 'Processing', 'On Hold'];

const FilterByStatus = ({ filterByStatus, handleFilterByStatusChange, fetchingFilters }) => (
  <div className='history__filter-by paper'>
    <span>Filter by status:</span>
    <TextField
      name='filterByStatus'
      select
      value={filterByStatus}
      onChange={handleFilterByStatusChange}
      fullWidth
      disabled={fetchingFilters}
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

FilterByStatus.propTypes = {
  filterByStatus: PropTypes.string.isRequired,
  handleFilterByStatusChange: PropTypes.func.isRequired,
  fetchingFilters: PropTypes.bool.isRequired
};

export default FilterByStatus;
