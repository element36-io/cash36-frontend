import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

import tiers from './tiers';
import DefaultButton from '../Buttons/DefaultButton';
import Avatar from '../../components/Avatar';
import { uPort } from '../../config/uport.config';
import { confirmAttestation } from '../../store/auth/auth.actions';

import './UserProfile.scss';

class UserProfile extends PureComponent {
  state = {
    attesting: false,
    attestingComplete: false
  };
  renderVerificationButton = () => {
    const { currentProcessStatus, caseId } = this.props.user;

    if (currentProcessStatus === 'CLOSED') return null;

    if (currentProcessStatus === 'NOT_STARTED') {
      return (
        <Link to={`/kyc/start`}>
          <DefaultButton variant="raised">Verify Account</DefaultButton>
        </Link>
      );
    }

    if (
      currentProcessStatus !== 'AWAITING_VERIFICATION' &&
      currentProcessStatus !== 'NOT_STARTED'
    ) {
      return (
        <Link to={`/kyc/${caseId}`}>
          <DefaultButton variant="raised">Continue Verification</DefaultButton>
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
    let {
      user: { currentLevel, verified }
    } = this.props;

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
        <DefaultButton
          variant="raised"
          onClick={this.handleAttestClick}
          disabled={this.state.attesting}
        >
          {this.state.attesting ? (
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
    const { currentLevel, name, uportAddress } = this.props.user;
    let tier = 1;
    if (currentLevel === 'Tier_2') tier = 2;
    const attestName = `element36Tier${tier}`;

    this.setState(() => ({ attesting: true }));

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
        this.setState(() => ({ attesting: false }));
      })
      .catch(error => {
        console.log(error);
        this.setState(() => ({ attesting: false }));
      });
  };

  render () {
    let {
      user: { username, avatarUri, name, currentLevel },
      alt
    } = this.props;

    // changed due to uPort.
    if (!currentLevel) currentLevel = 'Tier_0';

    return (
      <div className={`user-profile ${alt ? 'user-profile--alt' : ''}`}>
        <div className="user-profile__avatar">
          <Avatar
            avatarUrl={avatarUri}
            alt={name}
            cssClass="user-profile__avatar__image"
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
