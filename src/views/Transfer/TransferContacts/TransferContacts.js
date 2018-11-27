import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TransferContacts extends Component {
  render () {
    return (
      <div>
        contact list
      </div>
    );
  }
}

TransferContacts.propTypes = {
  contactsList: PropTypes.array,
  clickCallback: PropTypes.func
};

export default TransferContacts;
