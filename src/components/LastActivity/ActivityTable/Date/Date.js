import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Date.scss';

const Date = ({ date }) => (
  <div className='activity-table-date'>
    <div color='textPrimary'>
      {moment(date, 'DD-MM-YYYY').format('MMM')}
    </div>
    <div color='textPrimary'>
      {moment(date, 'DD-MM-YYYY').format('DD')}
    </div>
  </div>
);

Date.propTypes = {
  date: PropTypes.string.isRequired
};

export default Date;
