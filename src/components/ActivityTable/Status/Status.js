import React from 'react';
import PropTypes from 'prop-types';
import AccountBalance from '@material-ui/icons/AccountBalance';
import statuses from './statuses';

import './Status.scss';

const Status = ({ status, openModal }) => {
  return (
    <div className="activity-table-status-wrapper">
      <div className={`activity-table-status ${statuses[status].cssClass}`}>
        {statuses[status].Icon}
        <div className="activity-table-status__text">
          {statuses[status].text}
        </div>
      </div>
      {status === 'OPEN' && (
        <span onClick={openModal} data-testid="activity-table-status__info">
          <AccountBalance />
        </span>
      )}
    </div>
  );
};

Status.propTypes = {
  status: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired
};

export default Status;
