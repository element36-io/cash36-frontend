import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import {
    CircularProgress,
    Grid,
    Paper, Table, TableBody, TableCell, TableHead, TableRow,
    Typography
} from '@material-ui/core';
import { connect } from "react-redux";
import WalletUserProfile from "../../components/WalletUserProfile";
import WalletTokenDetails from "../../components/WalletTokenDetails";
import { API_ROOT } from "../../config/Api";

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

        this.state = {
            backendUrl: `${API_ROOT}/cash36`,
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
            data = data.slice(0, 5);
            this.setState({ history: data, loadingHistory: false })
        });
    }

    render() {
        const { classes, tokens } = this.props;

        return (
            <div className={classes.root}>
                <WalletUserProfile tokens={tokens}/>
                <WalletTokenDetails tokens={tokens}/>
                <Grid container justify="center" spacing={40} style={{ paddingBottom: 60 }}>
                    <Grid item xs={12} md={10} lg={8}>
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
                                                <CircularProgress style={{ color: '#199FC6' }} thickness={7}/>
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