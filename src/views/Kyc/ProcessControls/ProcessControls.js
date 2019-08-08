import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton';

import './ProcessControls.scss';

const ProcessControls = ({
  submitLabel,
  submitCallback,
  submitting = false,
  disabled = false,
  error
}) => {
  return (
    <Fragment>
      <div className="kyc-process-controls">
        <Link to="/">
          <SecondaryButton>Verify Later</SecondaryButton>
        </Link>

        <DefaultButton
          onClick={submitCallback}
          disabled={disabled || submitting}
          submitting={submitting}
        >
          {submitLabel}
        </DefaultButton>
      </div>
      {error && (
        <div className="kyc-process-controls__error error-text">{error}</div>
      )}
    </Fragment>
  );
};

ProcessControls.propTypes = {
  disabled: PropTypes.bool,
  submitting: PropTypes.bool,
  submitLabel: PropTypes.string.isRequired,
  submitCallback: PropTypes.func,
  error: PropTypes.string
};

export default ProcessControls;
