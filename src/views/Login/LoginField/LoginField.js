import React from 'react';
import PropTypes from 'prop-types';
import './LoginField.scss';

const LoginField = props => {
  const { value, changeHandler, label, name } = props;

  return (
    <div className='login__field'>
      <label>
        {label && <span>{label}</span>}
        <input type='password' name={name} value={value} onChange={changeHandler} />
        <span />
      </label>
    </div>
  );
};

LoginField.proptypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default LoginField;
