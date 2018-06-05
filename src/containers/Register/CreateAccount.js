import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";
import QRCode from 'qrcode.react'
import { Connect, MNID, SimpleSigner } from "uport-connect";
import LoginWithUport from "../../components/LoginWithUport";
import { API_ROOT } from "../../config/Api";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Link } from "react-router-dom";
import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root: {
        marginTop: -50,
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        borderRadius: 2,
    },
    button: {
        position: 'relative',
        float: 'right',
        top: 60,
    },
});

function TransitionUp(props) {
    return <Slide {...props} direction="up"/>;
}

class CreateAccount extends Component {

    constructor(props) {
        super(props);

        this.state = {
            backendUrl: `${API_ROOT}/cash36`,
            uri: '',
            snackOpen: false,
        };

        this.uPortURIHandler = this.uPortURIHandler.bind(this);
        this.uport = new Connect('cash36', {
            clientId: '2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6',
            network: 'rinkeby',
            signer: SimpleSigner('98fe93a539f8ed46def934713918f888df1e088dc0ec6c58333f131b4f4ca358')
        });
    }

    handleCloseSnack = () => {
        this.setState({ snackOpen: false });
    };

    componentWillMount() {
        this.uport.requestCredentials({
            requested: [ 'name', 'avatar', 'cash36KYC' ],
            notifications: true,
            //accountType: 'segregated'
        }, this.uPortURIHandler).then((credentials) => {

            let address = MNID.decode(credentials.address).address;

            fetch(`${this.state.backendUrl}/users/is-registered/?address=${address}`)
                .then(response => {
                    console.log(response);
                    if (response.ok) {
                        // User found --> already registered --> show error
                        this.setState({ snackOpen: true });
                    } else {
                        // User no found --> so not yet registered --> proceed
                        if (response.status === 404) {
                            this.props.afterValid(credentials);
                        }
                    }
                })
        });
    }

    uPortURIHandler(uri) {
        this.setState({ uri });
    }

    render() {
        if (this.props.currentStep !== 2) {
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
                                <Grid item>
                                    <Grid container direction="column" justify="center" alignItems="center" spacing={16}>
                                        <Grid item style={{ borderRadius: 7 }}>
                                            <QRCode value={this.state.uri} size={300}/>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Snackbar
                    TransitionComponent={TransitionUp}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackOpen}
                    onClose={this.handleCloseSnack}
                    autoHideDuration={5000}
                >
                    <SnackbarContent
                        message={
                            <span style={{ color: 'white' }}>
                                This uport address is already registered, please try a different uport address or proceed to login
                            </span>
                        }
                        action={
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button style={{ color: 'white', backgroundColor: '#313131' }} size="small">
                                    Go to Login
                                </Button>
                            </Link>
                        }
                    />
                </Snackbar>
            </div>
        );
    }
}

CreateAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateAccount);