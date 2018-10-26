import React from 'react';
import PropTypes from 'prop-types';
import './NavBtn.scss';

const NavBtn = props => {
  const { isActive, clickHandler, alt } = props;

  return (
    <div className={`nav-btn ${alt ? 'alt' : ''} ${isActive ? 'active' : ''}`} onClick={clickHandler}>
      <div>
        {[...Array(4).keys()].map(s => <span key={s} />)}
      </div>
    </div>
  );
};

NavBtn.propTypes = {
  isActive: PropTypes.bool,
  clickHandler: PropTypes.func.isRequired,
  alt: PropTypes.bool
};

export default NavBtn;
