import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Avatar, CircularProgress, Grid, Paper, Typography } from "material-ui";
import { Area, AreaChart } from "recharts";
import CopyIcon from '@material-ui/icons/ContentCopy';


const styles = theme => ({
    root: {
        marginTop: -50,
        overflowX: 'auto',
        flexGrow: 1,
    },
    title: {
        flex: '0 0 auto',
    },
    paper: {
        backgroundColor: '#2E3046',
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
        borderRadius: 7,
        opacity: 1,
        minWidth: 200,
        maxWidth: 250,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    avatar: {
        borderRadius: 7,
        fontSize: '60%',
        background: 'linear-gradient(110deg, #F4E05F, #F6BA39)',
    },
    amountField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    tabs: {
        flexGrow: 1,
        borderRadius: 8,
        minWidth: 350,
    },
    caption: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.8rem',
        fontWeight: 400,
        lineHeight: '1.375em'
    }
});

class Main extends Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            dialogOpen: false,
            loading: false,
            tabIndex: 0,
            tabTokenIndex: 0,
            sellAmount: '',
            buyAmount: '',
            selectedToken: 'CHF36',
            baseFee: 0.015,
            exchanging: false,
            backendUrl: url
        }
    }

    createToken(symbol, name) {
        this.setState({ loading: true });

        var data = {
            "symbol": symbol,
            "name": name
        }

        fetch(`${this.state.backendUrl}/token/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return "";
        }).then((data) => {
            this.setState({ dialogOpen: false })
            this.props.updateTokens();
        });
    }

    sellTokens(symbol) {
        this.setState({ exchanging: true });

        let amount = this.state.sellAmount;
        fetch(`${this.state.backendUrl}/token/${symbol}/?amount=${amount}&fromAddress=${this.props.loggedInAddress}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            this.props.updateTokens();
            this.setState({ exchanging: false, sellAmount: '' });
        }).then((data) => {
        });
    }

    buyTokens(symbol) {
        this.setState({ exchanging: true });

        let amount = this.state.buyAmount;
        fetch(`${this.state.backendUrl}/token/${symbol}/?amount=${amount}&forAddress=${this.props.loggedInAddress}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            this.props.updateTokens();
            this.setState({ exchanging: false, buyAmount: '' });
        }).then((data) => {
        });
    }

    render() {
        const { classes, tokens, tokenHistory, loadingHistory } = this.props;

        return (
            <div className={classes.root}>
                {tokens.length === 0 && 'No Tokens available'}
                {tokens.length !== 0 &&
                <Grid container justify="center" alignItems={'center'} spacing={40}>
                    {tokens.length > 0 && tokens.map((token, key) =>
                        <Grid item key={key}>
                            <Paper className={classes.paper} elevation={2}>
                                <Grid container alignItems={'center'} wrap="nowrap" spacing={16}>
                                    <Grid item>
                                        <Avatar className={classes.avatar}>{token.symbol}</Avatar>
                                    </Grid>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Typography variant="subheading">
                                                {token.name}
                                            </Typography>
                                        </Grid>
                                        <Grid container spacing={16}>
                                            <Grid item>
                                                <div style={{ maxWidth: 170 }}>
                                                    <Typography variant="caption" noWrap>
                                                        {token.tokenAddress}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <a style={{ cursor: 'pointer' }}><CopyIcon
                                                    style={{ fontSize: '100%', color: '#F6BA39' }}/></a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction={'column'} style={{ paddingTop: 25 }}>
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
                                <Grid container direction={'column'} style={{ paddingTop: 25 }}>
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
                                {loadingHistory &&
                                <Grid container justify="center" alignItems={'center'}
                                      style={{ marginTop: 45, marginBottom: 45 }}>
                                    <Grid item>
                                        <CircularProgress className={classes.progress}
                                                          style={{ color: '#199FC6' }} thickness={7}/>
                                    </Grid>
                                </Grid>
                                }
                                {!loadingHistory &&
                                <Grid container style={{ marginLeft: -15 }}>
                                    <Grid item>
                                        <AreaChart width={280} height={200} data={tokenHistory[token.symbol]}
                                                   margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="1">
                                                    <stop offset="0%" stopColor="#F4E05F" stopOpacity={1}/>
                                                    <stop offset="90%" stopColor="#F4E05F" stopOpacity={1}/>
                                                </linearGradient>
                                                <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="15%" stopColor="#F4E05F" stopOpacity={0.8}/>
                                                    <stop offset="100%" stopColor="#B93E4F" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="totalSupply" stroke="url(#stroke)"
                                                  fillOpacity={1}
                                                  fill="url(#fill)"/>
                                        </AreaChart>
                                    </Grid>
                                </Grid>
                                }
                            </Paper>
                        </Grid>
                    )}
                </Grid>
                }
            </div>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);