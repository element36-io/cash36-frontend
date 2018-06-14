import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";
import Subheader from "../components/Subheader";
import hand from '../assets/hand.png';
import yin from '../assets/yin.png';
import screw from '../assets/screw.png';
import { update } from "../actions/token";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TokenDetails from "../components/TokenDetails";
import { API_ROOT } from "../config/Api";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flex: '0 0 auto',
    },
    paper: {
        boxSizing: 'content-box',
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
        borderRadius: 2,
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
    gridItemReverse: {
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
});

class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            backendUrl: `${API_ROOT}/cash36`,
        };
    }

    componentDidMount() {
        this.props.updateTokens(this.state.backendUrl);
    }

    render() {
        const { classes, tokens } = this.props;

        return (
            <div className={classes.root}>
                <Subheader/>
                {tokens.length === 0 && 'No Tokens available'}
                {tokens.length !== 0 &&
                <Grid container justify="center" spacing={40} style={{marginTop: -50}}>
                    {tokens.length > 0 && tokens.map((token, key) =>
                        <Grid key={key} item xs={11} sm={5} md={5} lg={4}>
                            <TokenDetails token={token}/>
                        </Grid>
                    )}
                </Grid>
                }
                <Grid container justify="space-around" spacing={40} style={{ padding: 50 }}>
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column" alignItems="center" spacing={40}>
                            <Grid item>
                                <img className={classes.img} src={yin} alt={'yin'}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"title"}>FIAT AND TRANSPARENCY</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"body2"}>
                                    FIAT currency (EUR/CHF) pegged 1:1 on a Swiss bank account.
                                    Market cap of crypto-fiat will always be same as balance of bank account.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column" alignItems="center" spacing={40}>
                            <Grid item>
                                <img className={classes.img} src={hand} alt={'hand'}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"title"}>WHITE WALLETS</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"body2"}>
                                    Holding tokens of element36 means you have successfully identified yourself and are
                                    entitled for doing investments. Any smart contract using our token will
                                    get the checked ID of the investor.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column" alignItems="center" spacing={40}>
                            <Grid item>
                                <img className={classes.img} src={screw} alt={'screw'}/>
                            </Grid>
                            <Grid item>
                                <Typography variant={"title"}>ERC20</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant={"body2"}>
                                    Made to be used in smart contracts. It means that:
                                    You can use stable Fiat in your contracts
                                    You do not have to worry about the onboarding process (KYC)!
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction={"column"} spacing={40} style={{ padding: 50 }}>
                    <Grid item>
                        <Typography variant={"title"}>Usage</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"}>
                            To use our tokens in your project/product, you need the following:
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"}>
                            1) The address of the token you wish to use - you can copy the value from above.<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;The tokens are ERC20 compatible, so just instantiate an ERC20 Token (we use <br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;the contracts from open-zeppelin library) with the address<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;and you can use the token as any other ERC20 Token.<br/><br/>
                            2) Public address of our cash36 uport application: <strong>2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6</strong><br/><br/>
                            3) uport - As we use identities managed by uport, include <a href="https://uport.me">uport</a>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={"body2"}>
                            Every user who gets identified by cash36 receive an uport attestation `cash36KYC` including<br/>
                            users name and the verification date.<br/>

                            We recommend the following way to request credentials. Further we encourage you to verify<br/>
                            the issuer of `cash36` which should equal the public address of our cash36 uport application:<br/><br/>

                            <code>
                            uport.requestCredentials({'{'}<br/>
                            &nbsp;&nbsp;requested: [ 'name', 'avatar' ],<br/>
                            &nbsp;&nbsp;verified: [ 'cash36KYC' ],<br/>
                            &nbsp;&nbsp;notifications: {"true"} <br/>
                            }).then((credentials) => {'{'}<br/>
                            &nbsp;&nbsp;...<br/>
                            &nbsp;&nbsp;if (credentials.address === credentials.verified[0].sub &&<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;credentials.verified[0].iss === '2ozGXFqx3eKzmg7zQQZuTnEW6EeAVUzyUu6') {'{'}<br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;console.log('user verified by cash36')<br/>
                                &nbsp;&nbsp;{'}'}
                            </code>
                            <br/><br/>
                            Note: No matter if you make this check, our Smart contract will only allow identified users<br/>
                            to own/receive our tokens. Therefore transaction to unidentified addresses will fail.
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        updateTokens: bindActionCreators(update, dispatch),
    };
};

const mapStateToProps = state => ({
    tokens: state.token.tokens,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LandingPage));