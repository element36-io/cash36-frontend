import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Button,
    CircularProgress, FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper, Select,
    TextField,
    Typography
} from '@material-ui/core';
import TokenBalance from "../../components/TokenBalance";
import UserProfile from "../../components/UserProfile";
import { connect } from "react-redux";
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
});

class SellTokens extends React.Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            sellAmount: '',
            sellAmountError: false,
            selectedToken: '',
            selectedTokenError: false,
            baseFee: 0.015,
            exchanging: false,
            backendUrl: url,
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
        this.setState({snackOpen: false});
    }

    sellTokens = () => {
        // Validate input
        let sellAmountError = false;
        let selectedTokenError = false;

        if (this.state.sellAmount === '') {
            sellAmountError = true;
        }
        if (this.state.selectedToken === '') {
            selectedTokenError = true;
        }

        if (sellAmountError || selectedTokenError) {
            this.setState({ sellAmountError: sellAmountError, selectedTokenError: selectedTokenError });
            return;
        }

        this.setState({ exchanging: true });

        let amount = this.state.sellAmount;
        fetch(`${this.state.backendUrl}/payments/${this.state.selectedToken}/?amount=${amount}&fromAddress=${this.props.loggedInAddress}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            this.setState({ exchanging: false, sellAmount: '', selectedToken: '', snackOpen: true });
            this.props.updateTokens();
        }).then((data) => {
        });
    };

    render() {
        const { classes, tokens } = this.props;

        return (
            <div className={classes.root}>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackOpen}
                    onClose={this.closeSnack}
                    autoHideDuration={5000}
                    message={"Request received - You will be notified once it's processed"}
                />
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
                        <Paper style={{ width: '100%', minHeight: 400, padding: 35 }} elevation={1}>
                            <Grid container direction="column" wrap="nowrap" spacing={40}>
                                <Grid item>
                                    <Typography variant="title">SELL TOKENS</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.body} variant='body1'>
                                        Here you can sell your cash36 Tokens. Selling cash36 Tokens involves an Exchange
                                        Fee of {this.state.baseFee * 100}%
                                        which will be deducted from the payed out amount.
                                        Once you confirm, your Tokens will be destroyed and a bank transfer
                                        with the calculated amount will be triggered.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container alignItems='center' justify='space-between' spacing={16}>
                                        <Grid item xs={10}>
                                            <form className={classes.formControl}>
                                                <TextField
                                                    error={this.state.sellAmountError}
                                                    id="sellAmount"
                                                    label="Choose Amount"
                                                    type="number"
                                                    value={this.state.sellAmount}
                                                    onChange={this.handleChangeAmount('sellAmount')}
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
                                        <Grid item xs={10} style={{ marginLeft: 10 }}>
                                            <Grid container alignItems={'center'}>
                                                <Grid item xs={6}>
                                                    <Typography variant="subheading" color="secondary">
                                                        Exchange Fee (1.5%)
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subheading" align="right"
                                                                color="secondary">
                                                        -{this.state.sellAmount * this.state.baseFee} {this.state.selectedToken.substr(0,3)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={10} style={{ marginLeft: 10, marginTop: -5 }}>
                                            <Grid container alignItems={'center'}>
                                                <Grid item xs={6}>
                                                    <Typography variant="subheading" style={{fontWeight: 700, fontSize: '110%'}}>
                                                        You will receive
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="subheading" style={{fontWeight: 700, fontSize: '110%'}} align="right">
                                                        {this.state.sellAmount - (this.state.sellAmount * this.state.baseFee)} {this.state.selectedToken.substr(0,3)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
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
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

SellTokens.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loggedInAddress: state.user.loggedInAddress,
});

export default connect(
    mapStateToProps,
)(withStyles(styles)(SellTokens));