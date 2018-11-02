import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserProfile from '../../components/UserProfile';
import DefaultButton from '../../components/Buttons/DefaultButton';
import BalanceCards from '../../components/BalanceCards';
import PersonalInformation from './PersonalInformation';
import { getTokens } from '../../store/tokens/tokens.actions';
import plusIcon from '../../assets/icons/plus-icon.svg';

import './Settings.scss';

class Settings extends Component {
  componentDidMount () {
    this.props.getTokens();
  }

  handleAddCurrencyClick = () => {
    console.log('Add Currency Clicked');
  }
  render () {
    return (
      <div className='settings'>
        <div className='wrapper'>
          <div className='settings__profile'>
            <UserProfile />
          </div>
          <div className='settings__buttons'>
            <BalanceCards />
            <DefaultButton
              onClick={this.handleAddCurrencyClick}
              className='settings__add-currency'
            >
              <img src={plusIcon} alt='' />
              Add Currency
            </DefaultButton>
          </div>
          <div className='settings__personal-information'>
            <PersonalInformation />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tokens: { tokens = [] } }) => ({ tokens });

export default connect(mapStateToProps, { getTokens })(Settings);
