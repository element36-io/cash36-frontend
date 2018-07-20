import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import { connect } from "react-redux";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import { Link } from "react-router-dom";


const styles = theme => ({
    paper: {
        width: '100%',
        height: 150,
        padding: theme.spacing.unit * 2,
    },
    avatar: {
        width: 70,
        borderRadius: 100,
        border: '1px solid black',
    }
});

class UserProfile extends React.Component {

    render() {
        const { classes } = this.props;
        let verified;
        if (this.props.credentials.cash36KYC) {
            verified = new Date(this.props.credentials.cash36KYC[ "verified on" ]);
        } else {
            verified = undefined;
        }

        return (
            <Paper className={classes.paper} elevation={1}>
                <Grid container alignItems="center" spacing={40}>
                    <Grid item xs={3} md={3}>
                        <img className={classes.avatar} src={this.props.credentials.avatar.uri} alt={'avatar'}/>
                    </Grid>
                    <Grid item xs={9} md={9}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="subheading">{this.props.credentials.name}'s
                                    Wallet</Typography>
                            </Grid>
                            <Grid item zeroMinWidth>
                                <Typography variant="caption" noWrap>{this.props.loggedInAddress}</Typography>
                            </Grid>
                            <Divider style={{ marginTop: 20, marginBottom: 10 }}/>
                            <Grid item>
                                {verified !== undefined &&
                                <Grid container alignItems="center" spacing={16}>
                                    <Grid item>
                                        <VerifiedUser style={{ color: 'green' }}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">Verified
                                            on {`${verified.getDate()}.${verified.getMonth() + 1}.${verified.getFullYear()}`}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                }
                                {verified === undefined &&
                                <Grid container alignItems="center" spacing={16}>
                                    <Grid item>
                                        <VerifiedUser style={{ color: 'red' }}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption">Not yet Verified</Typography>
                                        <Link to="/attest">
                                            <Typography variant="caption">Get verified</Typography>
                                        </Link>
                                    </Grid>
                                </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    credentials: state.user.credentials,
    loggedInAddress: state.user.loggedInAddress,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(UserProfile));
