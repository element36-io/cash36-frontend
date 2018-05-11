import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Paper } from 'material-ui';

const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 50,
        background: 'linear-gradient(180deg, #000000 80%,#333333 100%)',
    },
    grid: {
        paddingTop: 20,
    },
};

class SubheaderEmpty extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={0} rounded={false}>
                </Paper>
            </div>
        );
    }
}

SubheaderEmpty.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubheaderEmpty);