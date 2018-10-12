import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import RightArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import UserProfile from '../../UserProfile';
import navLinks from '../navLinks';
import './HeaderMobileDropdown.scss';

const HeaderMobileDropdown = props => {
    const {isActive, logout, clickCallback, user} = props;

    return (
        <div className={`header__mobile-dropdown ${isActive ? 'active' : ''}`}>
            <UserProfile user={user} alt={true}/>
            <ul className="paper">
                {navLinks.map(link => <li key={link.label}>
                    <NavLink exact activeClassName='selected'
                             to={link.url} onClick={clickCallback}>{link.label}
                        <RightArrowIcon
                            className='header__mobile-dropdown__icon'
                        />
                    </NavLink></li>
                )}
                <li>
                    <NavLink to='settings' onClick={clickCallback}>
                        Settings
                        <RightArrowIcon
                            className='header__mobile-dropdown__icon'
                        />
                    </NavLink>
                </li>
                <li onClick={logout}>
                  <span>
                    Logout
                    <RightArrowIcon
                        className='header__mobile-dropdown__icon'
                    />
                  </span>
                </li>
            </ul>
        </div>
    );
};

HeaderMobileDropdown.propTypes = {
    isActive: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    clickCallback: PropTypes.func.isRequired,
    user: PropTypes.object
};

export default HeaderMobileDropdown;
