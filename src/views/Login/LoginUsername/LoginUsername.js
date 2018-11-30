import React from 'react';
import PropTypes from 'prop-types';
import { MNID } from 'uport-connect';

const LoginUsername = props => {
  const { networkAddress } = props;
  return (
    <div className='login__field login__field--username'>
      <label>
        <span>Username (uPort ID)</span>
        {MNID.decode(networkAddress).address}
      </label>
    </div>
  );
};

LoginUsername.propTypes = {
  networkAddress: PropTypes.string.isRequired
};

export default LoginUsername;
