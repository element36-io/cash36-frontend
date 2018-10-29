import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ConfirmationIcon from '../../assets/icons/confirmation-icon.svg';

import './Notification.scss';

const calculateTime = creationDate => {
  const now = moment();

  const daysFromMessage = moment(now).diff(creationDate, 'days');
  const hoursFromMessage = moment(now).diff(creationDate, 'hours');
  const minutesFromMessage = moment(now).diff(creationDate, 'minutes');

  // return days if it was 3 days or less (excluding 0)
  if (daysFromMessage <= 3 && daysFromMessage !== 0) return `${daysFromMessage}d`;
  // raturn the date if it was more then 3 days
  if (daysFromMessage > 3) return moment(creationDate).format('MMM DD');
  // return hours if it was 0 days and > 0 hours
  if (hoursFromMessage) return `${hoursFromMessage}h`;
  // else return minutes
  if (minutesFromMessage) return `${minutesFromMessage}m`;
  // default if 0 minutes have passed
  return '0m';
};

const renderIcon = type => {
  if (type === 'PAYMENT' || type === 'PAYOUT') return <img src={ConfirmationIcon} />;
};

const Notification = ({ type, header, message, creationDate }) => (
  <div className='notification'>
    {renderIcon(type)}
    <div className='notification__content'>
      <span>{header}</span>
      <span>{message}</span>
    </div>
    <div className='notification__time'>
      {calculateTime(creationDate)}
    </div>
  </div>
);

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired
};
export default Notification;
