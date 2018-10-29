import React from 'react';
import PropTypes from 'prop-types';
import './HeaderAlerts.scss';

const HeaderAlerts = props => {
  const { alertsCount } = props;

  return (
    <span className='header__alerts'>
      <i className='fas fa-bell' />
      {alertsCount && alertsCount > 0 && <span>{alertsCount}</span>}
    </span>
  );
};

HeaderAlerts.propTypes = {
  alertsCount: PropTypes.number
};

export default HeaderAlerts;
