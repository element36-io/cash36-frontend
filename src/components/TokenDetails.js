import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import ExitToApp from "@material-ui/icons/ExitToApp"
import Tooltip from "@material-ui/core/Tooltip";


const styles = theme => ({
    paper: {
        boxSizing: 'content-box',
        padding: theme.spacing.unit * 2,
        opacity: 1,
    },
    avatar: {
        color: 'white',
        borderRadius: 100,
        border: '1px solid black',
        fontSize: '60%',
        background: 'linear-gradient(110deg, #67B6F4, #000000)',
    },
    caption: {
        fontSize: '0.8rem',
        fontWeight: 700,
        lineHeight: '1.375em',
        opacity: 0.7,
    },
    gridItemReverse: {
        flexDirection: 'row',
        [ theme.breakpoints.down('sm') ]: {
            flexDirection: 'column',
        },
    },
});

class TokenDetails extends React.Component {

    render() {
        const { classes, token } = this.props;

        return (
            <Paper className={classes.paper} elevation={1}>
                <Grid container wrap="nowrap" spacing={16}>
                    <Grid item xs={2}>
                        <Avatar className={classes.avatar}>{token.symbol}</Avatar>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="subheading">
                                    {token.name}
                                </Typography>
                            </Grid>
                            <Grid container spacing={16}>
                                <Grid item xs={10} zeroMinWidth>
                                    <Typography variant="caption" noWrap>
                                        {token.tokenAddress}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Tooltip id="tooltip-bottom" title="See on Etherscan" placement="bottom">
                                        <a style={{ cursor: 'pointer' }}
                                           href={`https://rinkeby.etherscan.io/token/${token.tokenAddress}`}
                                           target='_blank'>
                                            <ExitToApp style={{ fontSize: '100%', color: '#67B6F4' }}/>
                                        </a>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={16}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={10}>
                        <Grid container wrap="nowrap" spacing={8} className={classes.gridItemReverse}>
                            <Grid item xs={12} md={6}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Total Supply
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="title">
                                            {token.totalSupply} <span className={classes.caption}>{token.symbol}</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container direction={'column'}>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Balance Bank Account
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="title">
                                            {token.totalSupply} <span className={classes.caption}>{token.fiat}</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

TokenDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TokenDetails);