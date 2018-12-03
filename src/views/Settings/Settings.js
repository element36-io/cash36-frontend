import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserProfile from '../../components/UserProfile';
import BalanceCards from '../../components/BalanceCards';
import PersonalInformation from './PersonalInformation';
import { getTokens } from '../../store/tokens/tokens.actions';
import { getCountries } from '../../store/countries/countries.actions';

import './Settings.scss';

class Settings extends Component {
  componentDidMount () {
    this.props.getTokens();
    this.props.getCountries();
  }

  render () {
    const { user } = this.props;
    const { kycLevel } = user;
    return (
      <div className='settings'>
        <div className='wrapper'>
          <div className='settings__profile'>
            <UserProfile />
          </div>
          <div className='settings__buttons'>
            <BalanceCards />
          </div>
          <div className='settings__personal-information'>
            {kycLevel === 'Tier_0' &&
              <div className='paper settings__personal-information--tier0'>
                In order to see and edit your personal data, please verify your account.
              </div>
            }
            {kycLevel !== 'Tier_0' &&
              <PersonalInformation user={user} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth: { user }, tokens: { tokens = [] } }) => ({ tokens, user });

export default connect(mapStateToProps, { getTokens, getCountries })(Settings);
