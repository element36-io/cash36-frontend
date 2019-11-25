import React from 'react';
import PropTypes from 'prop-types';

import './FormHeader.scss';

const FormHeader = ({ title, subtitle }) => {
  return (
    <div className="form-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};

export default FormHeader;
