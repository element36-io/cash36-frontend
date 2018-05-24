import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';


const styles = theme => ({
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: 67,
        padding: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit,
    },
    caption: {
        fontSize: '0.8rem',
        fontWeight: 700,
        lineHeight: '1.375em',
        opacity: 0.7,
    },
    avatar: {
        color: 'white',
        borderRadius: 100,
        border: '1px solid black',
        fontSize: '60%',
        background: 'linear-gradient(110deg, #67B6F4, #000000)',
    },
});

class TokenBalance extends React.Component {

    render() {
        const { classes, token } = this.props;

        return (
            <Paper className={classes.paper} elevation={1}>
                <Grid container alignItems="center" spacing={16}>
                    <Grid item xs={2}>
                        <Avatar className={classes.avatar}>{token.symbol}</Avatar>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container direction={'column'}>
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