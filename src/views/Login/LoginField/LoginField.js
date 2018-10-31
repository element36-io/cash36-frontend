import React from 'react';
import PropTypes from 'prop-types';
import './LoginField.scss';

const LoginField = props => {
  const { value, changeHandler, label, name, placeholder } = props;

  return (
    <div className='login__field'>
      {label && <label>{label}</label>}
      <input type='password' name={name} placeholder={placeholder} value={value} onChange={changeHandler} />
      <span />
    </div>
  );
};

LoginField.proptypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default LoginField;
