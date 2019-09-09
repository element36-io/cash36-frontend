import React from 'react';
import PropTypes from 'prop-types';
import Arrow from '@material-ui/icons/KeyboardArrowLeft';
import Ink from 'react-ink';
import './ArrowBtn.scss';

const ArrowButton = ({ alt, onClick }) => (
  <span
    className={`arrow-btn ${alt ? 'arrow-btn--alt' : ''}`}
    onClick={onClick}
  >
    <Arrow className="arrow-btn__icon" />
    <Ink duration={500} />
  </span>
);

ArrowButton.propTypes = {
  alt: PropTypes.bool,
  onClick: PropTypes.func
};

export default ArrowButton;
