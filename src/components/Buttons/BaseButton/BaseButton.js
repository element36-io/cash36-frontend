import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

const BaseButton = props => {
  const { children } = props;

  return (
    <ButtonBase {...props} style={{ ...props.style, fontFamily: '"Rubik", sans-serif' }}>
      {children}
    </ButtonBase>
  );
};

export default BaseButton;
