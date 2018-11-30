import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import tiers from './tiers';
import DefaultButton from '../Buttons/DefaultButton';
import Verification from '../Verification';
import { uPort } from '../../config/uport.config';
import { confirmAttestation, attestationProgress } from '../../store/auth/auth.actions';

import './UserProfile.scss';

class UserProfile extends PureComponent {
  state = {
    showVerification: false
  };

  toggleVerification = () => {
    this.setState({ showVerification: !this.state.showVerification });
  };

  closeVerification = () => {
    this.setState({ showVerification: false });
  };

  renderAttestUser = () => {
    const { user: { kycLevel, verified }, attesting } = this.props;

    const Tier1Attested = verified.filter(el => el.claim.element36Tier1).length > 0;
    const Tier2Attested = verified.filter(el => el.claim.element36Tier2).length > 0;

    if ((kycLevel === 'Tier_1' && !Tier1Attested) || (kycLevel === 'Tier_2' && !Tier2Attested)) {
      return <DefaultButton variant='raised' onClick={this.handleAttestClick} disabled={attesting}>
        {attesting ? <CircularProgress color='secondary' size={20} /> : 'Get uPort Attest'}
      </DefaultButton>;
    }

    return null;
  };

  handleAttestClick = () => {
    this.props.attestationProgress();
    const { kycLevel, name, uportAddress } = this.props.user;
    let tier = 1;
    if (kycLevel === 'Tier_2') tier = 2;
    const attestName = `element36Tier${tier}`;

    uPort.attestCredentials({
      sub: uportAddress,
      claim: {
        [attestName]: {
          'Name': name,
          'Tier': tier,
          'verified on': new Date() }
      }
    }).then((att) => {
      this.props.confirmAttestation({ claim: { [attestName]: att } });
    });
  }

  render () {
    const { user, user: { username, avatarUri, name, kycLevel, kycProcessStatus }, alt } = this.props;
    const { showVerification } = this.state;

    return (
      <div className={`user-profile ${alt ? 'user-profile--alt' : ''}`}>
        <Verification isVisible={showVerification} user={user} close={this.closeVerification} />
        <div className='user-profile__avatar'>
          {avatarUri ? <img src={avatarUri} alt={name} /> : <div><i className='fas fa-user' /></div>}
          { kycLevel && <div className={`user-profile__avatar__badge ${tiers[kycLevel].badgeClass}`} /> }
          <span className={kycLevel} />
        </div>
        <div className='user-profile__info'>
          <p>
            <span>{name}</span> ({kycLevel && tiers[kycLevel].text} user)
            {kycLevel !== 'Tier_2' && <i className='fas fa-exclamation-triangle' />}
          </p>
          <p>
            {username}
          </p>
          <div className='user-profile__buttons'>
            {kycLevel && kycLevel !== 'Tier_2' && kycProcessStatus !== 'AWAITING_VERIFICATION' && <DefaultButton variant='raised' onClick={this.toggleVerification}>{tiers[kycLevel].btnText}</DefaultButton>}
            {kycProcessStatus === 'AWAITING_VERIFICATION' && <div className='user-profile__buttons--awaiting'>Awaiting Verification</div>}
            {this.renderAttestUser()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user, attesting } }) => ({ user, attesting });

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  alt: PropTypes.bool,
  attestationProgress: PropTypes.func,
  confirmAttestation: PropTypes.func
};

export default connect(mapStateToProps, { confirmAttestation, attestationProgress })(UserProfile);