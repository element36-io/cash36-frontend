import React from 'react';
import PropTypes from 'prop-types';
import './UserProfile.scss';
import tiers from './tiers';
import DefaultButton from '../Buttons/DefaultButton';

// Remove Tier when backend returns user tier later
const UserProfile = props => {
  const { user: { username, avatarUri, tier, name }, alt, clickCallback } = props;

  return (
    <div className={`user-profile ${alt ? 'user-profile--alt ' : ''}`}>
      <div className='user-profile__avatar'>
        {avatarUri ? <img src={avatarUri} alt={name} /> : <div><i className='fas fa-user' /></div>}
        <span>
          <i className='fas fa-shield-alt' />
          <span>
            {tiers[tier || 'Tier_0'].iconText}
          </span>
        </span>
        <span className={tier || 'Tier_0'} />
      </div>
      <div className='user-profile__info'>
        <p>
          <span>{name}</span> ({tiers[tier || 'Tier_0'].text} user) <i className='fas fa-exclamation-triangle' />
        </p>
        <p>
          {username}
        </p>
        {tier !== 'Tier_2' && <DefaultButton variant='contained' onClick={clickCallback} color='primary'>{tiers[tier || 'Tier_0'].btnText}</DefaultButton>}
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
