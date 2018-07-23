import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import { API_ROOT } from "../../config/Api";
import { MNID } from "uport-connect";


const styles = theme => ({
    root: {
        //marginTop: -50,
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 200,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        minWidth: 200,
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

class EnterCredentials extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedInAddress: '',
            firstName: '',
            firstNameError: false,
            lastName: '',
            lastNameError: false,
            email: '',
            emailError: false,
            birthDate: '',
            nationality: '',
            street: '',
            zip: '',
            city: '',
            country: '',
            countryError: false,
            phone: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentStep !== nextProps.currentStep && typeof nextProps.credentials.address === 'string') {
            this.setState({ loggedInAddress: MNID.decode(nextProps.credentials.address).address });
        }
    }

    handleChange = name => event => {
        this.setState({
            [ name ]: event.target.value,
        });
    };

    handleDateChange = (date) => {
        this.setState({ birthDate: date });
    };

    validateInput() {
        let error = false;
        let mustFields = [ 'firstName', 'lastName', 'email', 'country' ];

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

    registerUser() {
        if (!this.validateInput()) {
            console.log('fetch userdata');
            fetch(`${API_ROOT}/users/user-data`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:
                    JSON.stringify({
                        ethereumAddress: this.state.loggedInAddress,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        country: this.state.country,
                    })
            }).then((response) => {
                console.log(response);
                if (response.ok) {
                    this.props.afterValid();
                } else {
                    console.log(response);
                    switch (response.status) {
                        default:
                            console.log('Error: request rejected from server');
                    }
                }
            });
        }
    }

    render() {
        const { classes } = this.props;

        if (this.props.currentStep !== 4) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="title">Enter your information</Typography>
                            <form className={classes.container} noValidate autoComplete="off">
                                <Grid container alignItems='center' justify='space-between'>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="firstname"
                                            label="Firstname"
                                            className={classes.textField}
                                            value={this.state.firstName}
                                            onChange={this.handleChange('firstName')}
                                            margin="normal"
                                            error={this.state.firstNameError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="lastname"
                                            label="Lastname"
                                            className={classes.textField}
                                            value={this.state.lastName}
                                            onChange={this.handleChange('lastName')}
                                            margin="normal"
                                            error={this.state.lastNameError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="email"
                                            label="Email"
                                            className={classes.textField}
                                            value={this.state.email}
                                            onChange={this.handleChange('email')}
                                            margin="normal"
                                            error={this.state.emailError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="country"
                                            label="Country"
                                            className={classes.textField}
                                            value={this.state.country}
                                            onChange={this.handleChange('country')}
                                            margin="normal"
                                            error={this.state.countryError}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="street"
                                            label="Street"
                                            className={classes.textField}
                                            value={this.state.street}
                                            onChange={this.handleChange('street')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="zip"
                                            label="Zip Code"
                                            className={classes.textField}
                                            value={this.state.zip}
                                            onChange={this.handleChange('zip')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="city"
                                            label="City"
                                            className={classes.textField}
                                            value={this.state.city}
                                            onChange={this.handleChange('city')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            id="birthDate"
                                            label="Date of birth"
                                            className={classes.textField}
                                            value={this.state.birthDate}
                                            onChange={this.handleChange('birthDate')}
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="nationality">Nationality</InputLabel>
                                            <Select
                                                value={this.state.nationality}
                                                onChange={this.handleChange('nationality')}
                                                inputProps={{
                                                    id: 'nationality',
                                                }}
                                            >
                                                <MenuItem value='CH'>Switzerland</MenuItem>
                                                <MenuItem value='DE'>Germany</MenuItem>
                                                <MenuItem value='AT'>Austria</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </form>
                            <Button className={classes.button} onClick={this.registerUser.bind(this)}>Next</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

EnterCredentials.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnterCredentials);