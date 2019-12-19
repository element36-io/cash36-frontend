import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';

const BaseButton = props => {
  const { children } = props;

  return (
    <ButtonBase
      {...props}
      style={{ ...props.style, fontFamily: '"Rubik", sans-serif' }}
    >
      {children}
    </ButtonBase>
  );
};

BaseButton.propTypes = {
  style: PropTypes.object
};

export default BaseButton;
