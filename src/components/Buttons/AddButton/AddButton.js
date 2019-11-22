import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import BaseButton from '../BaseButton';

import './AddButton.scss';

const AddButton = ({ text, clickHandler }) => (
  <BaseButton className="add-button" onClick={clickHandler}>
    <span className="add-button__inner">
      <span>
        <AddIcon />
      </span>
      <span>{text}</span>
    </span>
  </BaseButton>
);

AddButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string
};

export default AddButton;
