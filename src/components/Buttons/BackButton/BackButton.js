import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack';
import styles from './MuiStyles';

const BackButton = ({ onClick, classes }) => (
  <Button
    className={classes.root}
    variant="raised"
    onClick={onClick}
  >
    <ArrowBackwardIcon />
  </Button>
);

BackButton.propTypes = {
  classes: PropTypes.object,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(BackButton);
