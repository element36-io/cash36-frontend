import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import DefaultButton from '../Buttons/DefaultButton';

const AttestButton = ({
  user: { currentLevel, verified },
  onClick,
  attesting
}) => {
  if (verified === undefined) verified = [];

  const Tier1Attested =
    verified.filter(el => el.claim.element36Tier1).length > 0;
  const Tier2Attested =
    verified.filter(el => el.claim.element36Tier2).length > 0;

  if (
    (currentLevel === 'Tier_1' && !Tier1Attested) ||
    (currentLevel === 'Tier_2' && !Tier2Attested)
  ) {
    return (
      <DefaultButton variant="contained" onClick={onClick} disabled={attesting}>
        {attesting ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          'Get uPort Attest'
        )}
      </DefaultButton>
    );
  }

  return null;
};

AttestButton.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  attesting: PropTypes.bool
};

export default AttestButton;
