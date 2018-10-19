import React from 'react';
import PropTypes from 'prop-types';
import './VerificationHeader.scss';

const VerificationHeader = props => {
  const { title, subtitle } = props;

  return (
    <div className='verification-header'>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

VerificationHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

export default VerificationHeader;
