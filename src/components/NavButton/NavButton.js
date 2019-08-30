import React from 'react';
import PropTypes from 'prop-types';

import './NavButton.scss';

const NavButton = ({ isActive, clickHandler, alt }) => (
  <div
    className={`nav-btn ${alt ? 'alt' : ''} ${isActive ? 'active' : ''}`}
    onClick={clickHandler}
    data-testid="nav-button"
  >
    <div>
      {[...Array(4).keys()].map(s => (
        <span key={s} />
      ))}
    </div>
  </div>
);

NavButton.propTypes = {
  isActive: PropTypes.bool,
  clickHandler: PropTypes.func.isRequired,
  alt: PropTypes.bool
};

export default NavButton;
