import React from 'react';
import PropTypes from 'prop-types';
import TimeIcon from '@material-ui/icons/Schedule';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Clear';
import './ActionStatus.scss';

const ActionStatus = ({ type, title }) => {
  let icon = '';

  switch (type) {
    case 'success':
      icon = <DoneIcon />;
      break;
    case 'progress':
      icon = <TimeIcon />;
      break;
    default:
      icon = <ErrorIcon />;
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
