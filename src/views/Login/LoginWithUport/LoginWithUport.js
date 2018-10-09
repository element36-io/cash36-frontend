import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import QRCode from 'qrcode.react';
import { Connect, SimpleSigner } from 'uport-connect';
import uportLogo from '../../../assets/uport-logo-w.png';
import { AppleAppStore, GooglePlayStore } from '../../../icons';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  headline: {
    fontWeight: '500',
    fontSize: '3rem'
  },
  uportLogo: {
    height: '2rem',
    width: 'auto'
  },
  uportMessage: {
    display: 'flex',
    alignItems: 'center'
  },
  bold: {
    fontWeight: '500'
  },
  qrCode: {
    marginTop: '1rem',
    '&>*': {
      backgroundColor: theme.palette.common.white,
      padding: '2rem',
      width: '200px',
      height: '200px',
      borderRadius: 4
    }
  },
  noAccMessage: {
    margin: '1rem 0'
  },
  appIcons: {
  },
  appIcon: {
    marginRight: '1rem'
  }
});

class LoginWithUport extends Component {
  state = {
    uri: ''
  }
  uport = new Connect('cash36', {
    clientId: '2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6',
    network: 'rinkeby',
    signer: SimpleSigner('98fe93a539f8ed46def934713918f888df1e088dc0ec6c58333f131b4f4ca358')
  })

  uPortURIHandler = (uri) => {
    this.setState({ uri });
  }

  componentWillMount () {
    this.uport.requestCredentials({
      requested: [ 'name', 'avatar' ],
      verified: [ 'cash36KYC' ],
      notifications: true
    }, this.uPortURIHandler).then((credentials) => {
      // Next step
      this.props.afterValid(credentials);
    });
  }

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          variant='title'
          className={classes.headline}
          paragraph
        >
          Welcome
        </Typography>
        <Typography className={classes.subheading}>
          Welcome to <span className={classes.bold}>cash36!</span>
        </Typography>
        <Typography className={classes.uportMessage}>
          In order to use our website, please log in with <img className={classes.uportLogo} src={uportLogo} alt='UPORT' />
        </Typography>
        <div className={classes.qrCode}>
          <QRCode value={this.state.uri} size={270} />
        </div>
        <Typography variant='caption' color='inherit' className={classes.noAccMessage}>Need a uPort Account?</Typography>
        <div className={classes.appIcons}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://itunes.apple.com/us/app/uport-id/id1123434510'
            className={classes.appIcon}
          >
            <AppleAppStore />
          </a>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://play.google.com/store/apps/details?id=com.uportMobile'
            className={classes.appIcon}
          >
            <GooglePlayStore />
          </a>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LoginWithUport);
