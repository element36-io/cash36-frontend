import React from 'react';
import PropTypes from 'prop-types';

import './TransferFooter.scss';

const TransferFooter = ({ textline1, textline2, fontSize = '1.2rem' }) => (
  <div className="transfer__footer">
    <span style={{ fontSize }}>
      {textline1}
      <br />
      {textline2}
    </span>
  </div>
);

TransferFooter.propTypes = {
  textline1: PropTypes.string.isRequired,
  textline2: PropTypes.string,
  fontSize: PropTypes.string
};

export default TransferFooter;
