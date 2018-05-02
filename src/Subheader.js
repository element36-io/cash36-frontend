import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Paper } from 'material-ui';
import Grid from "material-ui/Grid";


const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 150,
        background: '#141420',
    },
    grid: {
        paddingTop: 20,
    },
};

class Subheader extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid className={classes.grid} container justify="center">
                        <Grid item style={{textAlign: 'center'}}>
                            <Typography variant="title">cash36 Exchange Platform</Typography>
                            <Typography variant="subheading">Bridging the Crypto and the Fiat world</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

Subheader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Subheader);