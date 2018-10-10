import React from 'react';
import PropTypes from 'prop-types';
import './HeaderNavBtn.scss';

const HeaderNavBtn = props => {
  const { isActive, clickHandler } = props;

  return (
    <div className={`header__nav-btn ${isActive ? 'active' : ''}`} onClick={clickHandler}>
      <div>
        {[...Array(4).keys()].map(s => <span key={s} />)}
      </div>
    </div>
  );
};

HeaderNavBtn.propTypes = {
  isActive: PropTypes.bool,
  clickHandler: PropTypes.func.isRequired
};

export default HeaderNavBtn;
