import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import {
    Avatar, CircularProgress,
    Grid,
    Paper, Table, TableBody, TableCell, TableHead, TableRow,
    Typography
} from '@material-ui/core';
import TokenBalance from "../../components/TokenBalance";
import { connect } from "react-redux";
import UserProfile from "../../components/UserProfile";
import CopyIcon from "@material-ui/icons/ContentCopy"

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    paper: {
        boxSizing: 'content-box',
        padding: theme.spacing.unit * 2,
        opacity: 1,
    },
    img: {
        maxHeight: 100,
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
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
        },
    },
});

class Overview extends React.Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            backendUrl: url,
            history: [],
            loadingHistory: false,
        }
    }

    componentDidMount() {
        this.getTransferHistory();
    }

    getTransferHistory() {
        this.setState({ loadingHistory: true });

        fetch(`${this.state.backendUrl}/token/history?userAddress=${this.props.loggedInAddress}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            data = _.orderBy(data, [ 'blockNumber' ], [ 'desc' ]);
            data = data.slice(0, 5);
            this.setState({ history: data, loadingHistory: false })
        });
    }

    render() {
        const { classes, tokens } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="center" spacing={40}>
                    <Grid item xs={12} md={4}>
                        <UserProfile/>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Grid container direction="column" spacing={16}>
                            {tokens.length > 0 && tokens.map((token, key) =>
                                <Grid item key={key}>
                                    <TokenBalance token={token}/>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="center" spacing={40}>
                    {tokens.length > 0 && tokens.map((token, key) =>
                        <Grid key={key} item xs={12} md={4}>
                            <Paper className={classes.paper} elevation={1}>
                                <Grid container alignItems={'center'} wrap="nowrap" spacing={16}>
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
                                                <Grid item>
                                                    <div>
                                                        <Typography variant="caption" noWrap>
                                                            {token.tokenAddress}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <a style={{ cursor: 'pointer' }}><CopyIcon
                                                        style={{ fontSize: '100%', color: '#67B6F4' }}/></a>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container alignItems={'center'} wrap="nowrap" spacing={16}>
                                    <Grid item xs={2}>
                                    </Grid>
                                    <Grid item xs={5}>
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
                                    <Grid item xs={5}>
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
                            </Paper>
                        </Grid>
                    )}
                </Grid>
                <Grid container justify="center" spacing={40} style={{ paddingBottom: 60 }}>
                    <Grid item xs={12} md={8}>
                        <Paper className={classes.paper} style={{ padding: 35 }} elevation={1}>
                            <Grid container direction="column" spacing={40}>
                                <Grid item>
                                    <Typography variant="title">LAST ACTIVITY</Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="column" wrap="nowrap" spacing={40}>
                                        <Grid item>
                                            {this.state.loadingHistory &&
                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <CircularProgress className={classes.progress}
                                                                  style={{ color: '#199FC6' }} thickness={7}/>
                                            </div>
                                            }
                                            {!this.state.loadingHistory &&
                                            <Table className={classes.table}>
                                                <TableHead style={{backgroundColor: 'black'}}>
                                                    <TableRow>
                                                        <TableCell style={{color: 'white'}} numeric>Block</TableCell>
                                                        <TableCell style={{color: 'white'}}>Action</TableCell>
                                                        <TableCell style={{color: 'white'}} numeric>Amount</TableCell>
                                                        <TableCell style={{color: 'white'}}>Token</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.state.history.length > 0 && this.state.history.map((n, key) => {
                                                        return (
                                                            <TableRow key={key} className={classes.row}>
                                                                <TableCell numeric>{n.blockNumber}</TableCell>
                                                                <TableCell>{n.action}</TableCell>
                                                                <TableCell
                                                                    numeric>{n.action === 'sell' ? '-' : ''}{n.amount}</TableCell>
                                                                <TableCell>{n.token}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                </TableBody>
                                            </Table>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                </Grid>
            </div>
        );
    }
}

Overview.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loggedInAddress: state.user.loggedInAddress,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(Overview));