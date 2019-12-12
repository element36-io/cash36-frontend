import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import tiers from './tiers';
import Avatar from '../Avatar';
import VerificationButton from './VerificationButton';
import AddWalletButton from '../AddWalletButton';
import WalletMode from '../WalletMode';

import './UserProfile.scss';
import { Tooltip } from '@material-ui/core';

export const UserProfile = ({ user, alt }) => {
  let {
    username,
    avatarUri,
    name,
    currentLevel,
    currentProcessStatus,
    caseId
  } = user;

  // changed due to uPort.
  if (!currentLevel) currentLevel = 'Tier_0';

  return (
    <div
      data-testid="user-profile"
      className={`user-profile ${alt ? 'user-profile--alt' : ''}`}
    >
      <div className="user-profile__avatar">
        <Avatar
          avatarUrl={avatarUri}
          alt={name}
          cssClass="user-profile__avatar__image"
          username={username}
          isEditable
        />
        {currentLevel && (
          <div
            data-testid="tier-badge"
            className={`user-profile__avatar__badge ${tiers[currentLevel].badgeClass}`}
          />
        )}
        <span className={currentLevel} />
      </div>
      <div className="user-profile__info">
        <p>
          <span>{username}</span> ({currentLevel && tiers[currentLevel].text}{' '}
          user)
          {currentLevel !== 'Tier_2' && (
            <Tooltip title="You have to complete the verification process to have access to all features">
              <i className="fas fa-exclamation-triangle" />
            </Tooltip>
          )}
        </p>
        <WalletMode />
        <div className="user-profile__buttons">
          <VerificationButton
            currentProcessStatus={currentProcessStatus}
            caseId={caseId}
          />
          <AddWalletButton />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  alt: PropTypes.bool
};

export default connect(mapStateToProps)(UserProfile);
