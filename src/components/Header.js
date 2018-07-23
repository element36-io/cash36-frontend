import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Tooltip, Typography } from '@material-ui/core';
import logoImage from '../assets/logo-w-cash.svg';
import Grid from '@material-ui/core/Grid';
import { Link, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions/user";
import UserMenu from "./UserMenu";
import AccountBalanceWallet from "@material-ui/icons/AccountBalanceWallet";
import Home from "@material-ui/icons/Home";
import NotificationsMenu from "./NotificationsMenu";

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1000,
    },
    header: {
        //background: 'linear-gradient(0deg, #000000 80%,#333333 100%)',
    },
    avatar: {
        //color: 'white',
        color: 'black',
        fontSize: '70%',
    },
    logo: {
        height: 55,
        marginTop: 3,
    },
});

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedOut: false,
        };
    }

    logout = () => {
        this.props.actions.logout();

        this.setState({ loggedOut: true })
    };

    render() {
        const { classes } = this.props;
        const path = this.props.location.pathname;

        return (
            <div className={classes.root}>
                {this.state.loggedOut && <Redirect to="/"/>}
                <AppBar className={classes.header} position='static' color='inherit'>
                    <Toolbar>
                        <Grid container justify='space-between' alignItems='center' spacing={40}>
                            <Grid item>
                                <Link to={'/'}>
                                    <img className={classes.logo} src={logoImage} alt={'LOGO'}/>
                                </Link>
                            </Grid>
                            {!this.props.loggedIn &&
                            <Grid item>
                                <Grid container alignItems='center' spacing={16}>
                                    <Grid item>
                                        <Link to={'/register'}>
                                            <Typography variant="caption" style={{
                                                color: '#62757E',
                                                fontSize: 14,
                                                textDecoration: 'underline'
                                            }}>Register</Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="caption" style={{ color: '#62757E' }}>or</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Link to={'/login'} style={{ textDecoration: 'none' }}>
                                            <Button>Login</Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                            }
                            {this.props.loggedIn &&
                            <Grid item>
                                <Grid container alignItems='center' spacing={16}>
                                    {path === '/wallet' &&
                                    <Grid item>
                                        <Tooltip id="tooltip-bottom" title="Home" placement="bottom">
                                            <Link to={'/'} style={{ textDecoration: 'none' }}>
                                                <Home style={{ color: '#62757E' }}/>
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                    }
                                    {path !== '/wallet' &&
                                    <Grid item>
                                        <Tooltip id="tooltip-bottom" title="Wallet" placement="bottom">
                                            <Link to={'/wallet'} style={{ textDecoration: 'none' }}>
                                                <AccountBalanceWallet style={{ color: '#62757E' }}/>
                                            </Link>
                                        </Tooltip>
                                    </Grid>
                                    }
                                    {path === '/wallet' &&
                                    <Grid item>
                                        <NotificationsMenu openDrawer={this.props.openDrawer}
                                                           badgeCount={this.props.badgeCount}/>
                                    </Grid>
                                    }
                                    <Grid item>
                                        <img src={this.props.credentials.avatar.uri} alt={'avatar'}
                                             style={{ width: 50, borderRadius: 100, border: '1px solid black' }}/>
                                    </Grid>
                                    <Grid item>
                                        <UserMenu logout={this.logout.bind(this)}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            }
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    credentials: state.user.credentials,
    loggedIn: state.user.loggedIn,
    badgeCount: state.notification.badgeCount,
});

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Header));
