import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DefaultButton from '../../../components/Buttons/DefaultButton';
import SecondaryButton from '../../../components/Buttons/SecondaryButton/SecondaryButton';

import './KycProcessControls.scss';

const KycProcessControls = ({ submitLabel, submitCallback }) => {
  return (
    <div className="kyc-process-controls">
      <Link to="/">
        <SecondaryButton>Verify Later</SecondaryButton>
      </Link>
      <DefaultButton onClick={submitCallback}>{submitLabel}</DefaultButton>
    </div>
  );
};

KycProcessControls.propTypes = {
  submitLabel: PropTypes.string.isRequired,
  submitCallback: PropTypes.func
};

export default KycProcessControls;
