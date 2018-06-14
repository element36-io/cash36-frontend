import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, CircularProgress, Grid, Paper, Typography, } from "@material-ui/core";
import VerfifiedUser from '@material-ui/icons/VerifiedUser';
import { Link, Redirect } from "react-router-dom";
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
        borderRadius: 2,
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

        this.state = {
            verified: false,
            verifying: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentStep !== nextProps.currentStep) {
            this.setState({ verifying: true });

            let userAddress = MNID.decode(nextProps.credentials.address).address;

            console.log(nextProps.credentials);

            let verified = false;
            if (nextProps.credentials.verified.length > 0 &&
                nextProps.credentials.address === nextProps.credentials.verified[0].sub &&
                nextProps.credentials.verified[0].iss === '2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6' &&
                nextProps.credentials.verified[0].claim['cash36KYC']['Name'] === nextProps.credentials.name) {

                console.log('user verified by cash36');
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
                    <Grid item xs={12} md={6} lg={5}>
                        <Paper className={classes.paper}>
                            {this.state.verifying &&
                            <CircularProgress className={classes.progress}
                                              style={{ color: '#199FC6' }} thickness={7}/>}
                            {!this.state.verifying && this.state.verified ?
                                <Grid container direction="column" alignItems="center" justify="space-between" spacing={40}>
                                    <Grid item>
                                        <VerfifiedUser style={{ color: 'green', fontSize: '500%' }}/>
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
                        {this.state.verified && <Redirect to={"/wallet"}/>}
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