import React from 'react';
import PropTypes from 'prop-types';
import './UserProfile.scss';
import tiers from './tiers';
import DefaultButton from '../Buttons/DefaultButton';

const UserProfile = props => {
  const { user: { username, avatarUri, name, kycLevel }, alt, clickCallback } = props;

  return (
    <div className={`user-profile ${alt ? 'user-profile--alt' : ''}`}>
      <div className='user-profile__avatar'>
        {avatarUri ? <img src={avatarUri} alt={name} /> : <div><i className='fas fa-user' /></div>}
        <span className={`user-profile__avatar__badge ${kycLevel === 'Tier_2' ? 'user-profile__avatar__badge--alt' : ''}`}>
          {kycLevel && <span>{tiers[kycLevel].iconText}</span>}
        </span>
        <span className={kycLevel} />
      </div>
      <div className='user-profile__info'>
        <p>
          <span>{name}</span> ({kycLevel && tiers[kycLevel].text} user) <i className='fas fa-exclamation-triangle' />
        </p>
        <p>
          {username}
        </p>
        {kycLevel && kycLevel !== 'Tier_2' && <StyledButton variant='contained' onClick={clickCallback} color='primary'>{tiers[kycLevel].btnText}</StyledButton>}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  clickCallback: PropTypes.func,
  alt: PropTypes.bool
};

export default UserProfile;
