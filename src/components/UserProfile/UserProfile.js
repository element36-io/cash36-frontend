import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import tiers from './tiers';
import Avatar from '../../components/Avatar';
import VerificationButton from './VerificationButton';
import AttestButtton from './AttestButton';
import { confirmAttestation } from '../../store/auth/auth.actions';
import { attestUser } from '../../helpers/uport.helpers';

import './UserProfile.scss';

const UserProfile = ({ user, alt, confirmAttestation }) => {
  const [attesting, setAttesting] = useState(false);

  const handleAttestClick = async (claim, attestName) => {
    const { did, pushToken, boxPub } = user;

    setAttesting(true);
    try {
      await attestUser({ did, pushToken, boxPub, claim });
      confirmAttestation({ claim: { [attestName]: claim } });
    } catch (error) {
      console.warn(error);
    }
    setAttesting(false);
  };

  let { username, avatarUri, name, currentLevel, account } = user;

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
        <p>ID: {username}</p>
        <p>Account: {account}</p>
        <div className="user-profile__buttons">
          <VerificationButton user={user} />
          <AttestButtton
            user={user}
            clickCallback={handleAttestClick}
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
