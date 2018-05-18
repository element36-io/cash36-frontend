import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    Grid,
    Paper, TextField, Typography,
} from "@material-ui/core";
import logoImage from '../../assets/logo-w.svg';

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
    logo: {
        height: 80,
    },
});

class AdminLogin extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    handleChange = name => event => {
        this.setState({ [ name ]: event.target.value });
    };

    login() {
        this.props.handleLogin(this.state.username, this.state.password);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={6} lg={5}>
                        <Paper className={classes.paper}>
                            <Grid container alignItems='center' justify='space-around'>
                                <Grid item>
                                    <Grid container direction="column" alignItems={"center"}>
                                        <Grid item>
                                            <img className={classes.logo} src={logoImage} alt={"LOGO"}/>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant={"caption"}
                                                        style={{ fontWeight: 700 }}>ADMIN</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" spacing={16}>
                                        <form>
                                            <Grid item>
                                                <TextField
                                                    label="Username"
                                                    type="text"
                                                    value={this.state.username}
                                                    onChange={this.handleChange('username')}
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <TextField
                                                    label="Password"
                                                    type="password"
                                                    value={this.state.password}
                                                    onChange={this.handleChange('password')}
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                        </form>
                                        <Grid item>
                                            <Grid container alignItems='center' justify='flex-end'>
                                                <Grid item>
                                                    <Button onClick={this.login.bind(this)}>Login</Button>
                                                </Grid>
                                            </Grid>
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

AdminLogin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminLogin);
