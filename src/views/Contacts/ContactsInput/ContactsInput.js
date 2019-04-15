import React from 'react';
import PropTypes from 'prop-types';
import './ContactsInput.scss';

const ContactsInput = props => {
  const { label, placeholder, value, name, changeHandler } = props;

  return (
    <div className="contact-input-wrapper">
      <div className="contact-input">
        <label>{label}</label>
        <input name={name} value={value} onChange={changeHandler} placeholder={placeholder} />
        <span />
      </div>
    </div>
  );
};

ContactsInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired
};

export default ContactsInput;
