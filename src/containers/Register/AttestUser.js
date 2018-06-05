import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import QRCode from 'qrcode.react'
import { Connect, SimpleSigner } from "uport-connect";
import { API_ROOT } from "../../config/Api";

const styles = theme => ({
    root: {
        marginTop: -50,
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        borderRadius: 2,
        minHeight: 430,
    },
    button: {
        position: 'relative',
        float: 'right',
    },
});

class AttestUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            backendUrl: `${API_ROOT}/cash36`,
            uri: '',
            attested: false,
        };

        this.uPortURIHandler = this.uPortURIHandler.bind(this);
        this.uport = new Connect('cash36', {
            clientId: '2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6',
            network: 'rinkeby',
            signer: SimpleSigner('98fe93a539f8ed46def934713918f888df1e088dc0ec6c58333f131b4f4ca358')
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentStep === 4) {
            this.uport.attestCredentials({
                sub: this.props.credentials.address,
                claim: { 'cash36KYC': { 'Name': this.props.credentials.name, 'verified on': new Date() } }
            }, this.uPortURIHandler).then((att) => {
                this.setState({ attested: true })
            })
        }
    }

    uPortURIHandler(uri) {
        this.setState({ uri });
    }

    render() {
        const { classes } = this.props;

        if (this.props.currentStep !== 4) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column" alignItems={'center'} spacing={16}>
                                <Grid item>
                                    <Typography variant="title">
                                        Verification with uport app
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2">
                                        Identification was successful, please scan the QR Code below with your uport app
                                        to receive our verification.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {!this.state.attested &&
                                        <QRCode value={this.state.uri} size={300}/>
                                    }
                                    {this.state.attested &&
                                    <div>
                                        <Typography variant="body2">'Done, ready to go...'</Typography>
                                        <Link to="/login" style={{ textDecoration: 'none' }}>
                                            <Button className={classes.button}>Continue to Login</Button>
                                        </Link>
                                    </div>
                                    }
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

AttestUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AttestUser);