import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { formatDate } from '../../../helpers/dates.helpers';

import './Date.scss';

const Date = ({ date }) => {
  return (
    <Tooltip title={date}>
      <div className="activity-table-date">
        <div>{formatDate(date, 'MMM')}</div>
        <div>{formatDate(date, 'DD')}</div>
      </div>
    </Tooltip>
  );
};

Date.propTypes = {
  date: PropTypes.string.isRequired
};

export default Date;
