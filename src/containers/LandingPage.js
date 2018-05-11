import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Avatar, Grid, Paper, Typography } from "material-ui";
import CopyIcon from '@material-ui/icons/ContentCopy';
import Subheader from "../components/Subheader";
import hand from '../assets/hand.png';
import yin from '../assets/yin.png';
import screw from '../assets/screw.png';


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
        minWidth: 200,
        maxWidth: 250,
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
});

class LandingPage extends Component {

    constructor(props) {
        super(props);

        const url = (process.env.NODE_ENV === 'development')
            ? 'http://localhost:8080/cash36'
            : 'https://cash36-backend.herokuapp.com/cash36';

        this.state = {
            loading: false,
            tokens: {},
            backendUrl: url,
        }
    }

    componentDidMount() {
        this.updateTokens();
    }

    updateTokens() {
        this.setState({ loading: true });
        fetch(`${this.state.backendUrl}/token`).then(results => {
            return results.json();
        }).then(data => {
            // Load History data
            // for (let i = 0; i < data.length; i++) {
            //     this.getHistory(data[ i ].symbol).then(() => {
            //         this.setState({ loadingHistory: false });
            //     });
            // }
            this.setState({ loading: false, tokens: data });
        });
    }

    // async getHistory(symbol) {
    //     fetch(`${this.state.backendUrl}/token/${symbol}/total-supply/history`).then(results => {
    //         return results.json();
    //     }).then(data => {
    //         let history = this.state.tokenHistory;
    //         history[ symbol ] = data;
    //         return this.setState({ tokenHistory: history });
    //     });
    // }

    render() {
        const { classes } = this.props;
        const { tokens } = this.state;

        return (
            <div className={classes.root}>
                <Subheader/>
                {tokens.length === 0 && 'No Tokens available'}
                {tokens.length !== 0 &&
                <Grid container justify="center" alignItems={'center'} spacing={40} style={{ marginTop: -50 }}>
                    {tokens.length > 0 && tokens.map((token, key) =>
                        <Grid item key={key}>
                            <Paper className={classes.paper} elevation={1}>
                                <Grid container alignItems={'center'} wrap="nowrap" spacing={16}>
                                    <Grid item>
                                        <Avatar className={classes.avatar}>{token.symbol}</Avatar>
                                    </Grid>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Typography variant="subheading">
                                                {token.name}
                                            </Typography>
                                        </Grid>
                                        <Grid container spacing={16}>
                                            <Grid item>
                                                <div style={{ maxWidth: 170 }}>
                                                    <Typography variant="caption" noWrap>
                                                        {token.tokenAddress}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item>
                                                <a style={{ cursor: 'pointer' }}><CopyIcon
                                                    style={{ fontSize: '100%', color: '#67B6F4' }}/></a>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container direction={'column'} style={{ paddingTop: 25 }}>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Total Supply
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="title">
                                            {token.totalSupply} <span className={classes.caption}>{token.symbol}</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container direction={'column'} style={{ paddingTop: 25 }}>
                                    <Grid item>
                                        <Typography variant="caption">
                                            Balance Bank Account
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="title">
                                            {token.totalSupply} <span className={classes.caption}>{token.fiat}</span>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {/*{loadingHistory &&*/}
                                {/*<Grid container justify="center" alignItems={'center'}*/}
                                      {/*style={{ marginTop: 45, marginBottom: 45 }}>*/}
                                    {/*<Grid item>*/}
                                        {/*<CircularProgress className={classes.progress}*/}
                                                          {/*style={{ color: '#199FC6' }} thickness={7}/>*/}
                                    {/*</Grid>*/}
                                {/*</Grid>*/}
                                {/*}*/}
                                {/*{!loadingHistory &&*/}
                                {/*<Grid container style={{ marginLeft: -15 }}>*/}
                                    {/*<Grid item>*/}
                                        {/*<AreaChart width={280} height={100} data={tokenHistory[ token.symbol ]}*/}
                                                   {/*margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>*/}
                                            {/*<defs>*/}
                                                {/*<linearGradient id="stroke" x1="0" y1="0" x2="1" y2="1">*/}
                                                    {/*<stop offset="0%" stopColor="#F4E05F" stopOpacity={1}/>*/}
                                                    {/*<stop offset="90%" stopColor="#F4E05F" stopOpacity={1}/>*/}
                                                {/*</linearGradient>*/}
                                                {/*<linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">*/}
                                                    {/*<stop offset="15%" stopColor="#F4E05F" stopOpacity={0.8}/>*/}
                                                    {/*<stop offset="100%" stopColor="#B93E4F" stopOpacity={0}/>*/}
                                                {/*</linearGradient>*/}
                                            {/*</defs>*/}
                                            {/*<Area type="monotone" dataKey="totalSupply" stroke="url(#stroke)"*/}
                                                  {/*fillOpacity={1}*/}
                                                  {/*fill="url(#fill)"/>*/}
                                        {/*</AreaChart>*/}
                                    {/*</Grid>*/}
                                {/*</Grid>*/}
                                {/*}*/}
                            </Paper>
                        </Grid>
                    )}
                </Grid>
                }
                <Grid container justify="space-around" spacing={40} style={{ padding: 50 }}>
                    <Grid item xs={12} md={4}>
                        <Grid container direction="column" alignItems="center" spacing={40} >
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
                        <Grid container direction="column" alignItems="center" spacing={40} >
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
                        <Grid container direction="column" alignItems="center" spacing={40} >
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

export default withStyles(styles)(LandingPage);