import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';

const BaseButton = props => {
  const { children } = props;

  return (
    <ButtonBase {...props}>
      {children}
    </ButtonBase>
  );
};

export default BaseButton;
