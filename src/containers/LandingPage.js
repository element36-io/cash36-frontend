import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core";
import Subheader from "../components/Subheader";
import hand from '../assets/hand.png';
import yin from '../assets/yin.png';
import screw from '../assets/screw.png';
import { updatePublic } from "../actions/token";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TokenDetails from "../components/TokenDetails";

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
        };
    }

    componentDidMount() {
        this.props.updateTokens();
    }

    render() {
        const { classes, tokens } = this.props;

        return (
            <div className={classes.root}>
                <Subheader/>
                {tokens === undefined && 'No Tokens available'}
                {tokens && tokens.length === 0 && 'No Tokens available'}
                {tokens && tokens.length !== 0 &&
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
            </div>
        );
    }

}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        updateTokens: bindActionCreators(updatePublic, dispatch),
    };
};

const mapStateToProps = state => ({
    tokens: state.token.tokens,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LandingPage));