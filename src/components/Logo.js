import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  logoStyle: {
    marginRight: '1rem',
    backgroundImage: theme.gradients.primary,
    borderRadius: 4,
    width: '3.3rem',
    height: '4.7rem',
    color: theme.palette.common.white,
    fontSize: '1.3rem',
    textAlign: 'right',
    fontWeight: '500',
    padding: '.4rem'
  }
});

const Logo = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.logoStyle}>
      36
    </div>
    <Typography variant='body2' color='default' style={{ fontWeight: '500', fontSize: '1.8rem' }}>
        cash36
    </Typography>
  </div>
);

export default (withStyles(styles)(Logo));
