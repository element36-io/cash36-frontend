import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import './AuthContainerNav.scss';

const AuthContainerNav = props => {
    const {showRegister} = props;

    return (
        <ul className='auth-nav'>
            <li><Link to='#'>Home</Link></li>
            <li><Link to='#'>Support</Link></li>
            <li>
                {
                    props.location.pathname === '/login' ?
                    showRegister ? <Link to='/register'>Register</Link> : <span>Register</span>
                    : <Link to='/login'>Login</Link>
                }
            </li>
        </ul>
    );
}
AuthContainerNav.propTypes = {
    showRegister: PropTypes.bool
};

export default withRouter(AuthContainerNav);
