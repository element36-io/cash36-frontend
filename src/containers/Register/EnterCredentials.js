import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@material-ui/core";

const styles = theme => ({
    root: {
        marginTop: -50,
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        width: 200,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
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
            firstName: '',
            lastName: '',
            email: '',
            birthDate: '',
            nationality: '',
            street: '',
            zip: '',
            city: '',
            country: '',
            phone: '',
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

    _validate() {
        this.props.afterValid()
    }

    render() {
        const { classes } = this.props;

        if (this.props.currentStep !== 3) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={12} md={6}>
                        <Paper className={classes.paper}>
                            <Typography variant="title">Enter your information</Typography>
                            <form className={classes.container} noValidate autoComplete="off">
                                <TextField
                                    required
                                    id="firstname"
                                    label="Firstname"
                                    className={classes.textField}
                                    value={this.state.firstName}
                                    onChange={this.handleChange('firstName')}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    id="lastname"
                                    label="Lastname"
                                    className={classes.textField}
                                    value={this.state.lastName}
                                    onChange={this.handleChange('lastName')}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    id="email"
                                    label="Email"
                                    className={classes.textField}
                                    value={this.state.email}
                                    onChange={this.handleChange('email')}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    id="birthDate"
                                    label="Date of birth"
                                    className={classes.textField}
                                    value={this.state.birthDate}
                                    onChange={this.handleChange('birthDate')}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    id="street"
                                    label="Street"
                                    className={classes.textField}
                                    value={this.state.street}
                                    onChange={this.handleChange('street')}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    id="zip"
                                    label="Zip Code"
                                    className={classes.textField}
                                    value={this.state.zip}
                                    onChange={this.handleChange('zip')}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    id="city"
                                    label="City"
                                    className={classes.textField}
                                    value={this.state.city}
                                    onChange={this.handleChange('city')}
                                    margin="normal"
                                />
                                <TextField
                                    required
                                    id="country"
                                    label="Country"
                                    className={classes.textField}
                                    value={this.state.country}
                                    onChange={this.handleChange('country')}
                                    margin="normal"
                                />
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
                            </form>
                            <Button className={classes.button} onClick={this._validate.bind(this)}>Next</Button>
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