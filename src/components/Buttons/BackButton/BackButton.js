import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack';
import useStyles from './MuiStyles';

const BackButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Button
      data-testid="back-button"
      className={classes.root}
      variant="contained"
      onClick={onClick}
    >
      <ArrowBackwardIcon data-testid="back-button__arrow" />
    </Button>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default BackButton;
