import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../helpers/dates.helpers';

import './Date.scss';

const Date = ({ date }) => (
  <div className="activity-table-date">
    <div>{formatDate(date, 'MMM')}</div>
    <div>{formatDate(date, 'DD')}</div>
  </div>
);

Date.propTypes = {
  date: PropTypes.string.isRequired
};

export default Date;
