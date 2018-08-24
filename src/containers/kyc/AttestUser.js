import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from "@material-ui/core";
import QRCode from 'qrcode.react'
import { Connect, SimpleSigner } from "uport-connect";
import { API_ROOT } from "../../config/Api";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../actions/user";
import { Redirect } from "react-router-dom";

const styles = theme => ({
    root: {
        //marginTop: -50,
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
        };

        this.uPortURIHandler = this.uPortURIHandler.bind(this);
        this.uport = new Connect('cash36', {
            clientId: '2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6',
            network: 'rinkeby',
            signer: SimpleSigner('98fe93a539f8ed46def934713918f888df1e088dc0ec6c58333f131b4f4ca358')
        });
    }

    componentWillMount() {
        let claim = { 'Name': this.props.credentials.name, 'Level': 1, 'verified on': new Date() };
        this.uport.attestCredentials({
            sub: this.props.credentials.address,
            claim: { 'cash36KYC': claim }
        }, this.uPortURIHandler).then((att) => {
            this.props.actions.userAttested(claim);
        })
    }

    uPortURIHandler(uri) {
        this.setState({ uri });
    }

    render() {
        const { classes } = this.props;

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
                                        Please scan the QR Code below with your uPort app
                                        to receive our verification.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <QRCode value={this.state.uri} size={300}/>
                                </Grid>
                            </Grid>
                            {this.props.attested && <Redirect to={"/wallet"}/>}
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

const mapStateToProps = state => ({
    loggedInAddress: state.user.loggedInAddress,
    credentials: state.user.credentials,
    attested: state.user.attested,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AttestUser));
