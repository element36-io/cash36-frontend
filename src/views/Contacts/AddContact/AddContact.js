import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import BaseButton from '../../../components/Buttons/BaseButton';
import './AddContact.scss';

const AddContact = props => {
  const { clickHandler } = props;

  return (
    <BaseButton className='contacts__add-btn' onClick={clickHandler}>
      <span className='contacts__add-btn__inner'>
        <span><AddIcon /></span>
        <span>New Contact</span>
      </span>
    </BaseButton>
  );
};

AddContact.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default AddContact;
