import React from 'react';
import PropTypes from 'prop-types';
import TimeIcon from '@material-ui/icons/Schedule';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Clear';

import './ActionStatus.scss';

const ActionStatus = ({ type, title }) => {
  let icon = '';

  if (type === 'success') {
    icon = <DoneIcon data-testid="done-icon" />;
  } else if (type === 'progress') {
    icon = <TimeIcon data-testid="time-icon" />;
  } else if (type === 'error') {
    icon = <ErrorIcon data-testid="error-icon" />;
  } else {
    return null;
  }

  return (
    <div className="action-status">
      <div
        className={`action-status__icon-wrapper action-status__icon-wrapper--${type}`}
      >
        {icon}
      </div>
      {title && <h2>{title}</h2>}
    </div>
  );
};

ActionStatus.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default ActionStatus;
