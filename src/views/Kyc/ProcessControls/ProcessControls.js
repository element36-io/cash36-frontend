import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton/SecondaryButton';

import './ProcessControls.scss';

const ProcessControls = ({
  submitLabel,
  submitCallback,
  submitting = false,
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
        submitting={submitting}
      >
        {submitLabel}
      </DefaultButton>
    </div>
  );
};

ProcessControls.propTypes = {
  disabled: PropTypes.bool,
  submitting: PropTypes.bool,
  submitLabel: PropTypes.string.isRequired,
  submitCallback: PropTypes.func
};

export default ProcessControls;
