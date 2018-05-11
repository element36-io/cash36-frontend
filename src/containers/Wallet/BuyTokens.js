import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
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
} from 'material-ui';
import TokenBalance from "../../components/TokenBalance";
import { connect } from "react-redux";
import UserProfile from "../../components/UserProfile";


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

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            buyAmount: '',
            buyAmountError: false,
            selectedToken: '',
            selectedTokenError: false,
            preparing: false,
            prepared: false,
            exchanging: false,
            backendUrl: url,
            transferInstructions: {}
        }
    }

    handleChangeAmount = name => event => {
        this.setState({ [ name ]: event.target.value });
    };

    handleChange = name => event => {
        this.setState({ [ name ]: event.target.value });
    };

    preparePayment() {
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
            return;
        }

        // Call backend
        //this.setState({ preparing: true });

        // then
        this.setState({ transferInstructions: {}, preparing: false, prepared: true });
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
            this.reset();
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
            exchanging: false,
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
                                                    value="Universal Bank"
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Swift/BIC"
                                                    type="text"
                                                    value="XYZABC123"
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
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
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    disabled
                                                    label="Receipient Name"
                                                    type="text"
                                                    value="element36 GmbH"
                                                    className={classes.textField}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Receipient IBAN"
                                                    type="text"
                                                    value="CH123456232442342342"
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    disabled
                                                    label="Receipient Address"
                                                    type="text"
                                                    value="Bahnmatt 25, 6340 Baar"
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={12}>
                                                <TextField
                                                    disabled
                                                    label="Amount"
                                                    type="text"
                                                    value={`${this.state.buyAmount} ${this.state.selectedToken.substr(0, 3)}`}
                                                    className={classes.textField}
                                                />
                                            </Grid>
                                            <Grid item xs={9} md={9}>
                                                <TextField
                                                    disabled
                                                    label="Reference Number/Purpose"
                                                    helperText={<span style={{ color: 'red' }}>This must be included exactly for your transfer to work</span>}
                                                    type="text"
                                                    value="ABCDEF1234567890"
                                                    className={classes.textField}
                                                    style={{ width: '60%' }}
                                                />
                                            </Grid>
                                            <Grid item xs={3} md={3}>
                                                <div style={{ paddingTop: 40 }}>
                                                    {!this.state.exchanging &&
                                                    <Grid container alignItems="center" spacing={16}>
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
                                                            <Button onClick={() => this.buyTokens()}>SIMULATE
                                                                BUY</Button>
                                                        </Grid>
                                                    </Grid>
                                                    }
                                                    {this.state.exchanging &&
                                                    <CircularProgress className={classes.progress}
                                                                      style={{ color: '#199FC6' }} thickness={7}/>}
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