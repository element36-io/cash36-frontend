import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton/SecondaryButton';

import './KycProcessControls.scss';

const KycProcessControls = ({
  submitLabel,
  submitCallback,
  disabled = false
}) => {
  return (
    <div className="kyc-process-controls">
      <Link to="/">
        <SecondaryButton>Verify Later</SecondaryButton>
      </Link>
      <DefaultButton
        onClick={submitCallback}
        disabled={disabled}
        style={disabled && { opacity: '0.5' }}
      >
        {submitLabel}
      </DefaultButton>
    </div>
  );
};

KycProcessControls.propTypes = {
  disabled: PropTypes.bool,
  submitLabel: PropTypes.string.isRequired,
  submitCallback: PropTypes.func
};

export default KycProcessControls;
