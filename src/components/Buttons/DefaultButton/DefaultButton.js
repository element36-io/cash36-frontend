import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

const DefaultButton = props => {
  const { disabled, style, children, submitting } = props;

  return (
    <Button
      {...props}
      submitting={submitting ? 1 : 0}
      style={{
        ...style,
        fontFamily: '"Rubik", sans-serif',
        color: '#fff',
        opacity: disabled ? '.5' : 1
      }}
    >
      {submitting ? <CircularProgress color="secondary" size={20} /> : children}
    </Button>
  );
};

DefaultButton.propTypes = {
  style: PropTypes.any,
  children: PropTypes.any,
  submitting: PropTypes.bool,
  disabled: PropTypes.bool
};

export default DefaultButton;
