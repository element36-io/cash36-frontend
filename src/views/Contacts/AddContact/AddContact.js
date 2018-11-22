import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import BaseButton from '../../../components/Buttons/BaseButton';
import './AddContact.scss';

const AddContact = props => {
  const { clickHandler } = props;

  return (
    <BaseButton className="contacts__add-btn" onClick={clickHandler}>
      <div>
        <span><AddIcon/></span>
        <span>New Contact</span>
      </div>
    </BaseButton>
  );
};

AddContact.propTypes = {
  clickHandler: PropTypes.func.isRequired
};

export default AddContact;
