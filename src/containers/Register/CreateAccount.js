import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from "@material-ui/core";
import QRCode from 'qrcode.react'
import { Connect, SimpleSigner } from "uport-connect";
import LoginWithUport from "../../components/LoginWithUport";

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

class CreateAccount extends Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            backendUrl: url,
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
        this.uport.requestCredentials({
            requested: [ 'name', 'avatar', 'cash36KYC' ],
            notifications: true,
            //accountType: 'segregated'
        }, this.uPortURIHandler).then((credentials) => {
            this.props.afterValid(credentials);
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
            </div>
        );
    }
}

CreateAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateAccount);