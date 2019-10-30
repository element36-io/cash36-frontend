import React from 'react';
import PropTypes from 'prop-types';

const BuyFooter = ({ textline1, textline2, fontSize = '1.2rem' }) => (
  <div className="buy__footer">
    <span style={{ fontSize }}>
      {textline1}
      <br />
      {textline2}
    </span>
  </div>
);

BuyFooter.propTypes = {
  textline1: PropTypes.string.isRequired,
  textline2: PropTypes.string,
  fontSize: PropTypes.string
};

export default BuyFooter;
