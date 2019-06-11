import React from 'react';
import PropTypes from 'prop-types';

const LoginUsername = ({ id }) => (
  <div className="login__field login__field--username">
    <label>
      <span>Username (uPort ID)</span>
      {id}
    </label>
  </div>
);

LoginUsername.propTypes = {
  id: PropTypes.string.isRequired
};

export default LoginUsername;
