import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, TextField } from '@material-ui/core';
import TuneIcon from '@material-ui/icons/Tune';

import './FilterByStatusMobile.scss';

const filters = ['All', 'Open', 'Completed', 'Processing', 'On Hold'];

const FilterByStatusMobile = ({ filterByStatus, handleFilterByStatusChange, fetchingFilters }) => (
  <div className='history__filter-by-status-mobile paper'>
    <TextField
      name='filterByStatus'
      select
      value={filterByStatus}
      onChange={handleFilterByStatusChange}
      fullWidth
      disabled={fetchingFilters}
      InputProps={{
        disableUnderline: true,
        className: 'history__filter-by__input',
        style: {
          fontSize: '1.2rem',
          margin: 0
        }
      }}
      SelectProps={{
        displayEmpty: true,
        IconComponent: TuneIcon
      }}
    >
      {filters.map((filter) => <MenuItem key={filter} value={filter}>{filter}</MenuItem>)}
    </TextField>
  </div>
);

FilterByStatusMobile.propTypes = {
  filterByStatus: PropTypes.string.isRequired,
  handleFilterByStatusChange: PropTypes.func.isRequired,
  fetchingFilters: PropTypes.bool.isRequired
};

export default FilterByStatusMobile;
