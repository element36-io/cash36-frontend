import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import './AddContact.scss';

const AddContact = props => {
  const { clickHandler } = props;

  return (
    <div className='contacts__add-btn' onClick={clickHandler}>
      <span><AddIcon /></span>
      <span>New Contact</span>
    </div>
  );
};

AddContact.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default AddContact;
