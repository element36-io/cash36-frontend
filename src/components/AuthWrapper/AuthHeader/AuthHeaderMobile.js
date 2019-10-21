import React, { useState } from 'react';
import NavButton from '../../NavButton';
import AuthNav from '../AuthNav';

const AuthHeaderMobile = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleNav = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <NavButton clickHandler={toggleNav} isActive={isActive} />
      <div className={`auth__header__dropdown ${isActive ? 'active' : ''}`}>
        <div className="paper">
          <AuthNav />
        </div>
      </div>
    </>
  );
};

export default AuthHeaderMobile;
