import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, Grid, Paper, Typography } from "material-ui";
import { Link } from "react-router-dom";
import QRCode from 'qrcode.react'
import { Connect, SimpleSigner } from "uport-connect";

const styles = theme => ({
    root: {
        marginTop: -50,
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        borderRadius: 7,
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

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            backendUrl: url,
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

    _validate() {
        this.props.afterValid()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentStep === 5) {
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

        if (this.props.currentStep !== 5) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <Grid container direction="column" spacing={16}>
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