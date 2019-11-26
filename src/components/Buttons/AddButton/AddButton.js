import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';

import BaseButton from '../BaseButton';

import './AddButton.scss';

const AddButton = ({ text, onClick }) => (
  <BaseButton className="add-button" onClick={onClick}>
    <span className="add-button__inner">
      <span>
        <AddIcon />
      </span>
      <span>{text}</span>
    </span>
  </BaseButton>
);

AddButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string
};

export default AddButton;
