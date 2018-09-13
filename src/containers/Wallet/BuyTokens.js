import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    CircularProgress,
    FormControl,
    Grid,
    InputLabel, MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import { connect } from "react-redux";
import WalletUserProfile from "../../components/WalletUserProfile";
import { API_ROOT } from "../../config/Api";
import Snackbar from "@material-ui/core/Snackbar";


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
    selectToken: {
        minWidth: 125,
    },
    formControl: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
    },
    textField: {
        margin: 8,
        width: '45%',
    },
    helper: {
        color: 'red',
    },
});

class BuyTokens extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            buyAmount: '',
            buyAmountError: false,
            selectedToken: '',
            selectedTokenError: false,
            preparing: false,
            prepared: false,
            backendUrl: `${API_ROOT}/cash36`,
            transferInstructions: {},
            snackOpen: false,
        }
    }

    handleChangeAmount = name => event => {
        this.setState({ [ name ]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [ name ]: event.target.value });
    };

    closeSnack = () => {
        this.setState({ snackOpen: false });
    };

    validateInput() {
        // Validate input
        let buyAmountError = false;
        let selectedTokenError = false;

        if (this.state.buyAmount === '') {
            buyAmountError = true;
        }
        if (this.state.selectedToken === '') {
            selectedTokenError = true;
        }

        if (buyAmountError || selectedTokenError) {
            this.setState({ buyAmountError: buyAmountError, selectedTokenError: selectedTokenError });
            return false;
        }
        return true;
    }

    preparePayment() {
        if (this.validateInput()) {
            this.setState({ preparing: true });

            fetch(`${this.state.backendUrl}/buy/`, {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                        "symbol": this.state.selectedToken,
                        "amount": this.state.buyAmount
                    })
            }).then((response) => {
                return response.json();
            }).then((data) => {
                this.setState({
                    transferInstructions: {
                        amount: data.amount,
                        bankName: data.bankName,
                        bankBic: data.bankBic,
                        bankAddress: data.bankAddress,
                        bankCountry: data.bankCountry,
                        receipientName: data.receipientName,
                        receipientIban: data.receipientIban,
                        receipientAddress: data.receipientAddress,
                        paymentReferenceId: data.paymentReferenceId
                    },
                    preparing: false,
                    prepared: true
                });
            });
        }
    }

    simulatePayment() {
        fetch(`${this.state.backendUrl}/payments/payment-simulation`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:
                JSON.stringify({
                    senderIban: this.props.loggedInAddress,
                    purpose: this.state.transferInstructions.paymentReferenceId,
                    amount: this.state.transferInstructions.amount,
                    currency: this.state.selectedToken ? this.state.selectedToken.substr(0, 3) : ''
                })
        }).then((response) => {
            this.setState({
                transferInstructions: {},
                preparing: false,
                prepared: false,
                buyAmount: '',
                selectedToken: '',
                snackOpen: true,
            });
        }).then((data) => {
        });
    }

    reset() {
        this.setState({
            transferInstructions: {},
            preparing: false,
            prepared: false,
            buyAmount: '',
            selectedToken: '',
        });
    }

    render() {
        const { classes, tokens } = this.props;

        return (
            <div className={classes.root}>
                <WalletUserProfile tokens={tokens}/>
                <Grid container justify="center" spacing={40} style={{ paddingBottom: 60 }}>
                    <Grid item xs={12} md={10} lg={8}>
                        <Paper style={{ width: '100%', minHeight: 650, padding: 35 }} elevation={1}>
                            <Grid container direction="column" spacing={40}>
                                <Grid item>
                                    <Typography variant="title">BUY TOKENS</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.body} variant='body1'>
                                        Buying cash36 Tokens is as simple as a
                                        bank transfer. First choose amount and type of Token you wish to
                                        buy. After that you will receive the transfer instructions.
                                        Once we receive the amount, the Tokens will be credited to your
                                        account.</Typography>
                                </Grid>
                                {!this.state.prepared &&
                                <Grid item>
                                    <Grid container alignItems='center' justify='space-between'>
                                        <Grid item>
                                            <form className={classes.formControl}>
                                                <TextField
                                                    error={this.state.buyAmountError}
                                                    id="buyAmount"
                                                    label="Choose Amount"
                                                    type="number"
                                                    value={this.state.buyAmount}
                                                    onChange={this.handleChangeAmount('buyAmount')}
                                                    className={classes.amountField}
                                                    required
                                                    disabled={this.state.prepared}
                                                />
                                                <FormControl error={this.state.selectedTokenError} required>
                                                    <InputLabel htmlFor="selectedToken">Select Token</InputLabel>
                                                    <Select
                                                        id="selectedToken"
                                                        className={classes.selectToken}
                                                        value={this.state.selectedToken}
                                                        onChange={this.handleChange('selectedToken')}
                                                        disabled={this.state.prepared}
                                                    >
                                                        {tokens.length > 0 && tokens.map((token, key) =>
                                                            <MenuItem key={key}
                                                                      value={token.symbol}>{token.symbol}</MenuItem>
                                                        )}
                                                    </Select>
                                                </FormControl>
                                            </form>
                                        </Grid>
                                        <Grid item>
                                            <div style={{ paddingTop: 20 }}>
                                                {!this.state.preparing &&
                                                <Button onClick={() => this.preparePayment()}
                                                        disabled={this.state.prepared}>Prepare Payment</Button>}
                                                {this.state.preparing &&
                                                <CircularProgress className={classes.progress}
                                                                  style={{ color: '#199FC6' }} thickness={7}/>}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                }
                                {this.state.prepared &&
                                <Grid item>
                                    <Grid container alignItems='center' justify='space-between'>
                                        <Grid item>
                                            <Typography variant='subheading'>Transfer instructions</Typography>
                                        </Grid>
                                        <form className={classes.formControl}>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    disabled
                                                    label="Bank Name"
                                                    type="text"
                                                    value={this.state.transferInstructions.bankName}
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Swift/BIC"
                                                    type="text"
                                                    value={this.state.transferInstructions.bankBic}
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    disabled
                                                    label="Bank Address"
                                                    type="text"
                                                    value={this.state.transferInstructions.bankAddress}
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Bank Country"
                                                    type="text"
                                                    value={this.state.transferInstructions.bankCountry}
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    disabled
                                                    label="Receipient Name"
                                                    type="text"
                                                    value={this.state.transferInstructions.receipientName}
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Receipient IBAN"
                                                    type="text"
                                                    value={this.state.transferInstructions.receipientIban}
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    disabled
                                                    label="Receipient Address"
                                                    type="text"
                                                    value={this.state.transferInstructions.receipientAddress}
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    disabled
                                                    label="Amount"
                                                    type="text"
                                                    value={`${this.state.transferInstructions.amount} ${this.state.selectedToken.substr(0, 3)}`}
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <TextField
                                                    disabled
                                                    label="Reference Number/Purpose"
                                                    helperText={<span style={{ color: 'red' }}>This must be included exactly for your transfer to work</span>}
                                                    type="text"
                                                    value={this.state.transferInstructions.paymentReferenceId}
                                                    className={classes.textField}
                                                    style={{ width: '60%' }}
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <div style={{ paddingTop: 40 }}>
                                                    <Grid container alignItems="center" justify="flex-end" spacing={16}>
                                                        <Grid item>
                                                            <a onClick={this.reset.bind(this)}
                                                               style={{ cursor: 'pointer' }}>
                                                                <Typography variant="caption"
                                                                            style={{ textDecoration: 'underline' }}>
                                                                    Reset
                                                                </Typography>
                                                            </a>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button onClick={() => this.simulatePayment()}
                                                                    disabled={!this.state.prepared}>Simulate
                                                                Payment</Button>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Grid>
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackOpen}
                    onClose={this.closeSnack}
                    autoHideDuration={5000}
                    message={"Request received - You will be notified once it's processed"}
                />
            </div>
        );
    }
}

BuyTokens.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loggedInAddress: state.user.loggedInAddress,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(BuyTokens));