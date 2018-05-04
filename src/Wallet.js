import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { withStyles } from 'material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    Avatar,
    Grid,
    Paper,
    TextField,
    Typography,
    Button,
    CircularProgress,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    MenuItem,
    TableHead,
    TableRow, TableCell, TableBody, Table,
} from "material-ui";

const styles = theme => ({
    root: {
        marginTop: -50,
        flexGrow: 1,
    },
    paper: {
        backgroundColor: '#2E3046',
        margin: theme.spacing.unit,
        padding: theme.spacing.unit,
        borderRadius: 7,
        minWidth: 250,
    },
    expansion: {
        backgroundColor: '#2E3046',
        boxShadow: 'none',
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
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '0.8rem',
        fontWeight: 400,
        lineHeight: '1.375em'
    },
    body: {
        color: 'rgba(255, 255, 255, 0.7)',
    },
});

class Wallet extends Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            dialogOpen: false,
            sellAmount: '',
            buyAmount: '',
            selectedToken: '',
            baseFee: 0.015,
            exchanging: false,
            loadingHistory: false,
            history: [],
            backendUrl: url,
        }
    }

    componentDidMount() {
        if (this.props.loggedInAddress !== '') {
            this.getTransferHistory();
        }
    }

    handleChangeAmount = name => event => {
        this.setState({ [ name ]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [ name ]: event.target.value });
    };

    openDialog() {
        this.setState({ dialogOpen: true })
    }

    handleClose() {
        this.setState({ dialogOpen: false })
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

    preparePayment() {
        console.log(this.state.selectedToken);
        console.log(this.state.buyAmount);
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
            console.log(data);
            this.setState({ history: data, loadingHistory: false })
        });
    }

    sellTokens() {
        this.setState({ exchanging: true });

        let amount = this.state.sellAmount;
        fetch(`${this.state.backendUrl}/token/${this.state.selectedToken}/?amount=${amount}&fromAddress=${this.props.loggedInAddress}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            this.props.updateTokens();
            this.getTransferHistory();
            this.setState({ exchanging: false, sellAmount: '', selectedToken: '' });
        }).then((data) => {
        });
    }

    buyTokens() {
        this.setState({ exchanging: true });

        let amount = this.state.buyAmount;
        fetch(`${this.state.backendUrl}/token/${this.state.selectedToken}/?amount=${amount}&forAddress=${this.props.loggedInAddress}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            this.props.updateTokens();
            this.getTransferHistory();
            this.setState({ exchanging: false, buyAmount: '', selectedToken: '' });
        }).then((data) => {
        });
    }

    render() {
        const { classes, tokens } = this.props;

        return (
            <div className={classes.root}>
                {tokens.length === 0 && 'No Tokens available'}
                {tokens.length !== 0 &&
                <Grid container justify="center" alignItems={'center'} spacing={40} style={{ paddingBottom: 45 }}>
                    {tokens.length > 0 && tokens.map((token, key) =>
                        <Grid item key={key}>
                            <Paper className={classes.paper} elevation={2}>
                                <Grid container alignItems={'center'} wrap="nowrap" spacing={16}>
                                    <Grid item>
                                        <Avatar className={classes.avatar}>{token.symbol}</Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction={'column'}>
                                            <Grid item>
                                                <Typography variant="caption">
                                                    Your balance
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
                        </Grid>
                    )}
                </Grid>
                }
                <Grid container justify="center" alignItems={'center'} spacing={16}>
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper} elevation={2} style={{ width: '100%' }}>
                            <ExpansionPanel className={classes.expansion}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography variant="subheading">BUY TOKENS</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container direction="column" wrap="nowrap" spacing={16}>
                                        <Grid item>
                                            <Typography className={classes.body} variant='body1'>Buying Tokens is as simple as a
                                                bank transfer. Please choose,
                                                which Token you would like to buy:</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems={'center'}>
                                                <Grid item xs={12}>
                                                    <form className={classes.formControl}>
                                                        <TextField
                                                            id="buyAmount"
                                                            label="Choose Amount"
                                                            type="number"
                                                            value={this.state.buyAmount}
                                                            onChange={this.handleChangeAmount('buyAmount')}
                                                            className={classes.amountField}
                                                            style={{ width: '50%' }}
                                                            required
                                                        />
                                                        <TextField
                                                            select
                                                            id="selectedToken"
                                                            label="Select Token"
                                                            className={classes.amountField}
                                                            value={this.state.selectedToken}
                                                            onChange={this.handleChange('selectedToken')}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    className: classes.menu,
                                                                },
                                                            }}
                                                            style={{ width: '30%' }}
                                                            required
                                                        >
                                                            {tokens.length !== 0 && tokens.map((option, key) => (
                                                                <MenuItem key={key} value={option.symbol}>
                                                                    {option.symbol}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </form>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems='center' justify='flex-end'>
                                                <Grid item>
                                                    {!this.state.exchanging &&
                                                    <Button onClick={() => this.preparePayment()}>Get transfer
                                                        instructions</Button>}
                                                    {this.state.exchanging &&
                                                    <CircularProgress className={classes.progress}
                                                                      style={{ color: '#199FC6' }} thickness={7}/>}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Typography className={classes.body} variant='body1'>Transfer
                                                instructions</Typography>
                                            <form className={classes.formControl}>
                                                <TextField
                                                    disabled
                                                    label="Swift/BIC"
                                                    type="text"
                                                    value="XYZABC123"
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Bank Name"
                                                    type="text"
                                                    value="Universal Bank"
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Bank Address"
                                                    type="text"
                                                    value="Börsenstrasse 15, 8022 Zürich"
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Bank Country"
                                                    type="text"
                                                    value="Switzerland"
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Receipient IBAN"
                                                    type="text"
                                                    value="CH123456232442342342"
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Receipient Name"
                                                    type="text"
                                                    value="element36 GmbH"
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Receipient Address"
                                                    type="text"
                                                    value="Bahnmatt 25, 6340 Baar"
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Amount"
                                                    type="text"
                                                    value={this.state.buyAmount}
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Reference Number/Purpose"
                                                    helperText={<span style={{ color: 'red' }}>This must be included exactly for your transfer to work</span>}
                                                    type="text"
                                                    value="ABCDEF1234567890"
                                                    className={classes.textField}
                                                />
                                            </form>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems='center' justify='flex-end'>
                                                <Grid item>
                                                    {!this.state.exchanging &&
                                                    <Button onClick={() => this.buyTokens()}>SIMULATE BUY</Button>}
                                                    {this.state.exchanging &&
                                                    <CircularProgress className={classes.progress}
                                                                      style={{ color: '#199FC6' }} thickness={7}/>}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper} elevation={2} style={{ width: '100%' }}>
                            <ExpansionPanel className={classes.expansion}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography variant="subheading">SELL TOKENS</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container direction="column" wrap="nowrap" spacing={16}>
                                        <Grid item>
                                            <Grid container alignItems={'center'}>
                                                <Grid item xs={12}>
                                                    <form className={classes.formControl}>
                                                        <TextField
                                                            id="sellAmount"
                                                            label="Choose Amount"
                                                            type="number"
                                                            value={this.state.sellAmount}
                                                            onChange={this.handleChangeAmount('sellAmount')}
                                                            style={{ width: '50%' }}
                                                            required
                                                        />
                                                        <TextField
                                                            select
                                                            id="selectedToken"
                                                            label="Select Token"
                                                            className={classes.amountField}
                                                            value={this.state.selectedToken}
                                                            onChange={this.handleChange('selectedToken')}
                                                            SelectProps={{
                                                                MenuProps: {
                                                                    className: classes.menu,
                                                                },
                                                            }}
                                                            style={{ width: '30%' }}
                                                            required
                                                        >
                                                            {tokens.length !== 0 && tokens.map((option, key) => (
                                                                <MenuItem key={key} value={option.symbol}>
                                                                    {option.symbol}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </form>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems={'center'}>
                                                <Grid item xs={6}>
                                                    <Typography variant="subheading" color="secondary">
                                                        Exchange Fee (1.5%)
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subheading" align="right"
                                                                color="secondary">
                                                        -{this.state.sellAmount * this.state.baseFee} CHF36
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems={'center'}>
                                                <Grid item xs={6}>
                                                    <Typography variant="subheading">
                                                        You will receive
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subheading" align="right">
                                                        {this.state.sellAmount - (this.state.sellAmount * this.state.baseFee)} CHF
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Grid container alignItems='center' justify='flex-end'>
                                                <Grid item>
                                                    {!this.state.exchanging &&
                                                    <Button onClick={() => this.sellTokens()}>SELL</Button>}
                                                    {this.state.exchanging &&
                                                    <CircularProgress className={classes.progress}
                                                                      style={{ color: '#199FC6' }} thickness={7}/>}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper} elevation={2} style={{ width: '100%' }}>
                            <ExpansionPanel className={classes.expansion}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                    <Typography variant="subheading">TRANSACTION HISTORY</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Grid container direction="column" wrap="nowrap" spacing={16}>
                                        <Grid item>
                                            <Typography variant='body1'>Transaction history</Typography>
                                        </Grid>
                                        <Grid item>
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
                                                    {this.state.loadingHistory &&
                                                    <CircularProgress className={classes.progress}
                                                                      style={{ color: '#199FC6' }} thickness={7}/>
                                                    }
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
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Wallet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wallet);