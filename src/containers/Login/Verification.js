import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, CircularProgress, Grid, Paper, Typography, } from "material-ui";
import VerfifiedUser from '@material-ui/icons/VerifiedUser';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { MNID } from "uport-connect";
import * as actions from "../../actions/user";
import { bindActionCreators } from "redux";

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
    helper: {
        color: 'red',
    },
    caption: {
        fontSize: '0.8rem',
        fontWeight: 400,
        lineHeight: '1.375em'
    },
    body: {},
});

class Verification extends Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            backendUrl: url,
            verified: false,
            verifying: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentStep !== nextProps.currentStep) {
            this.setState({ verifying: true });

            let userAddress = MNID.decode(nextProps.credentials.address).address;

            let verified = false;
            if (nextProps.credentials.cash36KYC && nextProps.credentials.cash36KYC['Name'] === nextProps.credentials.name) {
                verified = true;
            }

            if (verified) {
                this.props.actions.userLoggedIn(nextProps.credentials, userAddress);
            }
            this.setState({ verified: verified, verifying: false });
        }
    }

    render() {
        const { classes } = this.props;

        if (this.props.currentStep !== 2) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            {this.state.verifying &&
                            <CircularProgress className={classes.progress}
                                              style={{ color: '#199FC6' }} thickness={7}/>}
                            {!this.state.verifying && this.state.verified ?
                                <Grid container direction="column" alignItems="center" justify="space-between" spacing={40}>
                                    <Grid item>
                                        <Typography variant="title">Welcome back to cash36!</Typography>
                                    </Grid>
                                    <Grid item>
                                        <VerfifiedUser style={{ color: 'green', fontSize: '200%' }}/>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/wallet" style={{ textDecoration: 'none' }}>
                                            <Button>Continue</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container direction="column" alignItems="center" justify="center" spacing={40}>
                                    <Grid item>
                                        <Typography variant="title">You are not yet verified</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">Please register first</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/register" style={{ textDecoration: 'none' }}>
                                            <Button>Proceed to Register</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            }
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Verification.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(
    ()=>{return{}},
    mapDispatchToProps
)(withStyles(styles)(Verification));