import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../helpers/dates.helpers';

import './Date.scss';

const Date = ({ date }) => (
  <div className="activity-table-date">
    <div color="textPrimary">
      {formatDate(date, 'MMM')}
    </div>
    <div color="textPrimary">
      {formatDate(date, 'DD')}
    </div>
  </div>
);

Date.propTypes = {
  date: PropTypes.string.isRequired
};

export default Date;
