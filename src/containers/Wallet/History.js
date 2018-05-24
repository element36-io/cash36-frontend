import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import {
    CircularProgress,
    Grid,
    Paper,
    Table, TableBody, TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import TokenBalance from "../../components/TokenBalance";
import UserProfile from "../../components/UserProfile";
import { connect } from "react-redux";


const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    amountField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    textField: {
        margin: 8,
        width: '40%',
    },
    formControl: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
    },
    helper: {
        color: 'red',
    },
    caption: {
        fontSize: '1.1rem',
        fontWeight: 700,
        lineHeight: '1.375em',
        opacity: 0.7,
    },
    avatar: {
        color: 'black',
        borderRadius: 7,
        fontSize: '60%',
        background: 'linear-gradient(110deg, #F4E05F, #F6BA39)',
    },
    paper: {
        backgroundColor: 'white',
        width: '100%',
        height: 150,
        padding: theme.spacing.unit,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#f5f5f5',
        },
    },
});

class History extends React.Component {

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

        fetch(`${this.state.backendUrl}/tokens/history?userAddress=${this.props.loggedInAddress}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            return response.json();
        }).then((data) => {
            data = _.orderBy(data, [ 'blockNumber' ], [ 'desc' ]);
            this.setState({ history: data, loadingHistory: false })
        });
    }

    render() {
        const { classes, tokens } = this.props;

        return (
            <div className={classes.root}>
                <Grid container justify="center" spacing={40}>
                    <Grid item xs={12} sm={6} md={5} lg={4}>
                        <UserProfile/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5} lg={4}>
                        <Grid container className={classes.gridItem} spacing={16}>
                            {tokens.length > 0 && tokens.map((token, key) =>
                                <Grid item key={key} xs={12}>
                                    <TokenBalance token={token}/>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="center" spacing={40} style={{ paddingBottom: 60 }}>
                    <Grid item xs={12} md={10} lg={8}>
                        <Paper style={{ width: '100%', minHeight: 280, padding: 35 }}
                               elevation={1}>
                            <Grid container direction="column" wrap="nowrap" spacing={40}>
                                <Grid item>
                                    <Typography variant='title'>TRANSACTION HISTORY</Typography>
                                </Grid>
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
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

History.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loggedInAddress: state.user.loggedInAddress,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(History));
