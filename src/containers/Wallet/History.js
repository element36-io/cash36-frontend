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
import { connect } from "react-redux";
import WalletUserProfile from "../../components/WalletUserProfile";
import { API_ROOT } from "../../config/Api";
import Tooltip from "@material-ui/core/Tooltip";
import ExitToApp from "@material-ui/icons/ExitToApp";


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

        let token = localStorage.getItem('access_token');

        fetch(`${this.state.backendUrl}/tokens/history`, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token,
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
                <WalletUserProfile tokens={tokens}/>
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
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CircularProgress className={classes.progress}
                                                          style={{ color: '#199FC6' }} thickness={7}/>
                                    </div>
                                    }
                                    {!this.state.loadingHistory &&
                                    <Table className={classes.table}>
                                        <TableHead style={{ backgroundColor: 'black' }}>
                                            <TableRow>
                                                <TableCell style={{ color: 'white' }} numeric>Block</TableCell>
                                                <TableCell style={{ color: 'white' }}>Action</TableCell>
                                                <TableCell style={{ color: 'white' }} numeric>Amount</TableCell>
                                                <TableCell style={{ color: 'white' }}>Token</TableCell>
                                                <TableCell style={{ color: 'white' }}></TableCell>
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
                                                        <TableCell>
                                                            <Tooltip id="tooltip-bottom" title="See on Etherscan"
                                                                     placement="bottom">
                                                                <a href={`https://rinkeby.etherscan.io/tx/${n.txHash}`}
                                                                   target='_blank'>
                                                                    <ExitToApp style={{
                                                                        color: '#67B6F4',
                                                                        fontSize: '100%'
                                                                    }}/>
                                                                </a>
                                                            </Tooltip>
                                                        </TableCell>
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
