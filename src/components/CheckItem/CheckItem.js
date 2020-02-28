import React from 'react';
import PropTypes from 'prop-types';

import ActionStatus from '../ActionStatus';

import './CheckItem.scss';

const CheckItem = ({ text, checked }) => {
  return (
    <div className="initiate-tokens-transfer-check-item">
      {checked ? (
        <ActionStatus type="success" />
      ) : (
        <ActionStatus type="error" />
      )}
      <div>{text}</div>
    </div>
  );
};

CheckItem.propTypes = {
  checked: PropTypes.bool,
  text: PropTypes.string
};

export default CheckItem;
