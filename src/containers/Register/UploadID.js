import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, Grid, Paper, Typography } from "material-ui";

const styles = theme => ({
    root: {
        marginTop: -50,
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 2,
        borderRadius: 7,
        minHeight: 430,
    },
    button: {
        position: 'relative',
        float: 'right',
        top: 250,
    },
});

class UploadID extends React.Component {

    _validate() {
        this.props.afterValid()
    }

    render() {
        const { classes } = this.props;

        if (this.props.currentStep !== 4) {
            return null;
        }

        return (
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item xs={8}>
                        <Paper className={classes.paper}>
                            <Typography variant="title">ID/Passport upload</Typography>
                            <Typography variant="body2">In order to verify your identity, we need you to upload a copy of your ID/Passport</Typography>
                            <Button className={classes.button} onClick={this._validate.bind(this)} >Next</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

UploadID.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadID);