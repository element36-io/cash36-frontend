import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import tiers from './tiers';
import Avatar from '../../components/Avatar';
import VerificationButton from './VerificationButton';
import AttestButtton from './AttestButton';
import { uPort } from '../../config/uport.config';
import { confirmAttestation } from '../../store/auth/auth.actions';

import './UserProfile.scss';

const UserProfile = ({ user, alt, confirmAttestation }) => {
  const [attesting, setAttesting] = useState(true);

  const handleAttestClick = () => {
    const { currentLevel, name, uportAddress } = user;
    let tier = 1;
    if (currentLevel === 'Tier_2') tier = 2;
    const attestName = `element36Tier${tier}`;

    setAttesting(true);

    uPort
      .attestCredentials({
        sub: uportAddress,
        claim: {
          [attestName]: {
            Name: name,
            Tier: tier,
            'verified on': new Date()
          }
        }
      })
      .then(att => {
        confirmAttestation({ claim: { [attestName]: att } });
        setAttesting(false);
      })
      .catch(error => {
        console.log(error);
        setAttesting(false);
      });
  };

  let { username, avatarUri, name, currentLevel } = user;

  // changed due to uPort.
  if (!currentLevel) currentLevel = 'Tier_0';

  return (
    <div className={`user-profile ${alt ? 'user-profile--alt' : ''}`}>
      <div className="user-profile__avatar">
        <Avatar
          avatarUrl={avatarUri}
          alt={name}
          cssClass="user-profile__avatar__image"
          username={username}
        />
        {currentLevel && (
          <div
            className={`user-profile__avatar__badge ${
              tiers[currentLevel].badgeClass
            }`}
          />
        )}
        <span className={currentLevel} />
      </div>
      <div className="user-profile__info">
        <p>
          <span>{name}</span> ({currentLevel && tiers[currentLevel].text} user)
          {currentLevel !== 'Tier_2' && (
            <i className="fas fa-exclamation-triangle" />
          )}
        </p>
        <p>{username}</p>
        <div className="user-profile__buttons">
          <VerificationButton user={user} />
          <AttestButtton
            user={user}
            onClick={handleAttestClick}
            attesting={attesting}
          />
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
  alt: PropTypes.bool,
  confirmAttestation: PropTypes.func
};

export default connect(
  mapStateToProps,
  { confirmAttestation }
)(UserProfile);
