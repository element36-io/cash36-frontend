import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import {
    CircularProgress,
    Grid,
    Paper,
    Table, TableBody, TableCell,
    TableHead,
    TableRow,
    Typography
} from 'material-ui';
import TokenBalance from "../../components/TokenBalance";
import UserProfile from "../../components/UserProfile";
import { connect } from "react-redux";


const styles = theme => ({
    root: {
        paddingTop: 30,
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
                <Grid container justify="center" spacing={40} style={{ paddingBottom: 60 }}>
                    <Grid item xs={12} md={8}>
                        <Paper style={{ width: '100%', minHeight: 280, padding: 15 }}
                               elevation={1}>
                            <Grid container direction="column" wrap="nowrap" spacing={16}>
                                <Grid item>
                                    <Typography variant='title'>Transaction history</Typography>
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
                                        <TableHead>
                                            <TableRow>
                                                <TableCell numeric>Block</TableCell>
                                                <TableCell>Action</TableCell>
                                                <TableCell numeric>Amount</TableCell>
                                                <TableCell>Token</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.history.length > 0 && this.state.history.map((n, key) => {
                                                return (
                                                    <TableRow key={key}>
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
