import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import * as actions from "../../actions/login";
import { bindActionCreators } from "redux";
import { MNID } from "uport-connect";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/es/Input/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";

const styles = theme => ({
    root: {
        marginTop: -50,
        flexGrow: 1,
        paddingBottom: 50,
    },
    textField: {
        margin: theme.spacing.unit,
        flexBasis: 200,
    },
    helper: {
        color: 'red'
    },
    paper: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        minHeight: 170,
        borderRadius: 2,
    },
    button: {
        position: 'relative',
        float: 'right',
    },
});

class Password extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordError: false,
            passwordErrorMessage: '',
            showPassword: false,
        };
    }

    handleChange = name => event => {
        this.setState({
            [ name ]: event.target.value,
        });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    validateInput() {
        let error = false;
        let mustFields = [ 'password' ];

        const updatedState = {};
        mustFields.forEach(f => {
            error = error || this.state[ f ] === '';
            updatedState[ `${f}Error` ] = this.state[ f ] === '';
            this.setState({
                ...this.state,
                ...updatedState,
            });
        });
        return error;
    }

    submit() {
        if (!this.validateInput()) {
            let userAddress = MNID.decode(this.props.credentials.address).address;
            this.props.actions.requestToken(userAddress, this.state.password)
                .then((response) => {
                    console.log(response);
                    if (response !== undefined) {
                        this.props.afterValid();
                    } else {
                        this.setState({password: '', passwordError: true});
                    }

            });
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
                            <Grid container alignItems='center' justify='space-around' spacing={16}>
                                <Grid item md={12}>
                                    <form>
                                        <FormControl className={classes.textField}>
                                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                                            <Input
                                                required
                                                id="adornment-password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                error={this.state.passwordError}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="Toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                            onMouseDown={this.handleMouseDownPassword}
                                                        >
                                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                            <FormHelperText className={classes.helper} id="password-helper-text">{this.props.login.errorMessage}</FormHelperText>
                                        </FormControl>
                                    </form>
                                    {this.props.login.isFetching &&
                                    <Typography variant={'body1'} style={{color: 'grey'}}>Logging in...</Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Button className={classes.button} onClick={this.submit.bind(this)}>Next</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Password.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
    login: state.login,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Password));

