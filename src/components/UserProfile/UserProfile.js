import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import tiers from './tiers';
import DefaultButton from '../Buttons/DefaultButton';
import { uPort } from '../../config/uport.config';
import {
  confirmAttestation,
  attestationProgress
} from '../../store/auth/auth.actions';

import './UserProfile.scss';

class UserProfile extends PureComponent {
  renderVerificationButton = () => {
    const { currentProcessStatus, caseId } = this.props.user;

    if (currentProcessStatus === 'CLOSED') return null;

    if (currentProcessStatus !== 'AWAITING_VERIFICATION') {
      return (
        <Link to={`/kyc/${caseId}`}>
          <DefaultButton variant="raised">
            {currentProcessStatus === 'NOT_STARTED'
              ? 'Verify Account'
              : 'Continue Verification'}
          </DefaultButton>
        </Link>
      );
    }

    if (currentProcessStatus === 'AWAITING_VERIFICATION') {
      return (
        <div className="user-profile__buttons--awaiting">
          Awaiting Verification
        </div>
      );
    }
  };

  renderAttestUser = () => {
    const {
      user: { currentLevel, verified },
      attesting
    } = this.props;

    const Tier1Attested =
      verified.filter(el => el.claim.element36Tier1).length > 0;
    const Tier2Attested =
      verified.filter(el => el.claim.element36Tier2).length > 0;

    if (
      (currentLevel === 'Tier_1' && !Tier1Attested) ||
      (currentLevel === 'Tier_2' && !Tier2Attested)
    ) {
      return (
        <DefaultButton
          variant="raised"
          onClick={this.handleAttestClick}
          disabled={attesting}
        >
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

  handleAttestClick = () => {
    this.props.attestationProgress();
    const { currentLevel, name, uportAddress } = this.props.user;
    let tier = 1;
    if (currentLevel === 'Tier_2') tier = 2;
    const attestName = `element36Tier${tier}`;

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
        this.props.confirmAttestation({ claim: { [attestName]: att } });
      });
  };

  render () {
    const {
      user: { username, avatarUri, name, currentLevel },
      alt
    } = this.props;

    return (
      <div className={`user-profile ${alt ? 'user-profile--alt' : ''}`}>
        <div className="user-profile__avatar">
          {avatarUri ? (
            <img src={avatarUri} alt={name} />
          ) : (
            <div>
              <i className="fas fa-user" />
            </div>
          )}
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
            <span>{name}</span> ({currentLevel && tiers[currentLevel].text}{' '}
            user)
            {currentLevel !== 'Tier_2' && (
              <i className="fas fa-exclamation-triangle" />
            )}
          </p>
          <p>{username}</p>
          <div className="user-profile__buttons">
            {this.renderVerificationButton()}
            {this.renderAttestUser()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  attesting: state.auth.attesting
});

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  alt: PropTypes.bool,
  attestationProgress: PropTypes.func,
  confirmAttestation: PropTypes.func
};

export default connect(
  mapStateToProps,
  { confirmAttestation, attestationProgress }
)(UserProfile);
