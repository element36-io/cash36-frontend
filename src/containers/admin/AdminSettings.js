import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Grid,
    Paper, Typography,
} from "@material-ui/core";
import { API_ROOT } from "../../config/Api";

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
    textField: {
        margin: 8,
    },
});

class AdminSettings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            backendUrl: `${API_ROOT}/cash36`,
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("access_token")

        fetch(`${this.state.backendUrl}/tokens`)
            .then(res => {
                console.log('===> res' + res);
                if (res.ok) {
                    res.json().then(function (data) {
                        console.log(data);
                    });
                } else {
                    console.log("Looks like the response wasn't perfect, got status", res.status);
                }
            })

        fetch(`${this.state.backendUrl}/admin/exchanges/?exchangeAddress=0x123`, {
            headers: {
                'Authorization': token,
            }
        })
            .then(res => {
                console.log('===> res' + res);
                if (res.ok) {
                    res.json().then(function (data) {
                        console.log(data);
                    });
                } else {
                    console.log("Looks like the response wasn't perfect, got status", res.status);
                }
            })
    }

    handleChange = name => event => {
        this.setState({ [ name ]: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={8} lg={8}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={16}>
                                <Grid item xs={12}>
                                    <Typography variant={"title"}>Cash36 Administration</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justify="flex-end">
                                        <Grid item>
                                            <Button onClick={this.props.handleLogout}>Logout</Button>
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

AdminSettings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminSettings);
