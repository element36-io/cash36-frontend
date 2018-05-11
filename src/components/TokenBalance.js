import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Grid, Paper, Typography } from 'material-ui';


const styles = {
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: 67,
        padding: 10
    },
    caption: {
        fontSize: '0.8rem',
        fontWeight: 700,
        lineHeight: '1.375em',
        opacity: 0.7,
    },
};

class TokenBalance extends React.Component {

    render() {
        const { classes, token } = this.props;

        return (
            <Paper className={classes.paper} elevation={1}>
                <Grid container direction={'column'} spacing={8}>
                    <Grid item>
                        <Typography variant="caption" style={{ fontSize: 14 }}>
                            Your {token.name} balance
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="title">
                            {token.balance} <span
                            className={classes.caption}>{token.symbol}</span>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

TokenBalance.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TokenBalance);