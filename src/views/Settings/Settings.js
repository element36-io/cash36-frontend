import React, { Component } from 'react';
import { connect } from 'react-redux';
// import UserProfile from '../../components/UserProfile';
// import Verification from '../../components/Verification';
import DefaultButton from '../../components/Buttons/DefaultButton';
import { getTokens } from '../../store/tokens/tokens.actions';
import plusIcon from '../../assets/icons/plus-icon.svg';

import './Settings.scss';
import BalanceCards from '../../components/BalanceCards';

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
          <div className='settings__buttons'>
            <BalanceCards />
            <DefaultButton
              onClick={this.handleAddCurrencyClick}
              className='settings__add-currency'
            >
              <img src={plusIcon} />
              Add Currency
            </DefaultButton>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ tokens: { tokens = [] } }) => ({ tokens });

export default connect(mapStateToProps, { getTokens })(Settings);
