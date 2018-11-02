import React, { Component } from 'react';
import editIcon from '../../../assets/icons/edit-icon.svg';

import './PersonalInformation.scss';

class PersonalInformation extends Component {
  state = {
    formEnabled: false
  }
  render () {
    return (
      <div className='personal-information'>
        <h2>Personal Information</h2>
        <form className='paper'>
          <div>
            <h3>Tier 1 Verification - Complete</h3>
            <button>
              <img src={editIcon} alt='' />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default PersonalInformation;
