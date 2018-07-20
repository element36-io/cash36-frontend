import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper, Typography,
} from "@material-ui/core";
import QRCode from 'qrcode.react'
import { Connect, SimpleSigner } from "uport-connect";
import { AppleAppStore, GooglePlayStore } from '../../icons';
import LoginWithUport from "../../components/LoginWithUport";

const styles = theme => ({
    root: {
        marginTop: -50,
        flexGrow: 1,
        paddingBottom: 50,
    },
    paper: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        borderRadius: 2,
    },
});

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uri: '',
        };

        this.uPortURIHandler = this.uPortURIHandler.bind(this);

        this.uport = new Connect('cash36', {
            clientId: '2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6',
            network: 'rinkeby',
            signer: SimpleSigner('98fe93a539f8ed46def934713918f888df1e088dc0ec6c58333f131b4f4ca358')
        });

        window.web3.setProvider(this.uport.getProvider());
    }

    componentWillMount() {
        this.uport.requestCredentials({
            requested: [ 'name', 'avatar' ],
            verified: [ 'cash36KYC' ],
            notifications: true
        }, this.uPortURIHandler).then((credentials) => {
            // Next step
            this.props.afterValid(credentials);
        });
    }

    uPortURIHandler(uri) {
        this.setState({ uri });
    }

    render() {
        const { classes } = this.props;

        if (this.props.currentStep !== 1) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={6} lg={5}>
                        <Paper className={classes.paper}>
                            <Grid container alignItems='center' justify='space-around' spacing={16}>
                                <Grid item md={4}>
                                    <LoginWithUport />
                                </Grid>
                                <Grid item md={8}>
                                    <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
                                        <Grid item style={{ borderRadius: 7 }}>
                                            <QRCode value={this.state.uri} size={300}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="caption">Need a uPort
                                                Account?</Typography>
                                        </Grid>
                                        <Grid item>
                                            <div>
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href="https://play.google.com/store/apps/details?id=com.uportMobile"
                                                >
                                                    <GooglePlayStore/>
                                                </a>
                                                <a
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    href="https://itunes.apple.com/us/app/uport-id/id1123434510"
                                                >
                                                    <AppleAppStore/>
                                                </a>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
