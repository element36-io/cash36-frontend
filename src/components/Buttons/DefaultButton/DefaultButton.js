import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const DefaultButton = props => (
  <Button
    {...props}
    style={{ ...props.style, fontFamily: '"Rubik", sans-serif', color: '#fff' }}
  >
    {props.children}
  </Button>
);

DefaultButton.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any
};

export default DefaultButton;
