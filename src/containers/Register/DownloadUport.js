import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Grid,
    Paper, Typography,
} from "@material-ui/core";
import { AppleAppStore, GooglePlayStore } from '../../icons';
import LoginWithUport from "../../components/LoginWithUport";

const styles = theme => ({
    root: {
        marginTop: -50,
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        paddingBottom: 50,
        borderRadius: 2,
    },
    button: {
        position: 'relative',
        float: 'right',
    },
});

class DownloadUport extends Component {

    _validate() {
        this.props.afterValid(2)
    }

    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Grid container alignItems='center' justify='space-around' spacing={16}>
                                <Grid item md={4}>
                                    <LoginWithUport />
                                </Grid>
                                <Grid item md={8}>
                                    <Grid container direction="column" justify="space-between" spacing={16}>
                                        <Grid item>
                                            <Typography variant="title">Welcome to cash36</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2">cash36 is based on
                                                <a href="https://uport.me"> uport</a> identity solution.<br/><br/>
                                                To start, please download the app on your phone and follow the
                                                instructions in the app to create a new account. <br/>Then click Continue.
                                            </Typography>
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
                            <Button className={classes.button} onClick={this._validate.bind(this)}>Continue</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

DownloadUport.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DownloadUport);