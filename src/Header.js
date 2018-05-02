import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { Avatar, Button, Tab, Tabs } from 'material-ui';
import logoImage from './assets/logo.svg';
import Grid from 'material-ui/Grid';
import VerifiedUser from '@material-ui/icons/VerifiedUser';


const styles = {
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: '#141420',
    },
    flex: {},
    avatar: {
        color: 'white',
        fontSize: '70%',
    },
    logo: {
        height: 55,
        marginTop: 12,
    },
    tabsIndicator: {
        backgroundColor: '#F4E05F',
    },
    tabRoot: {
        textTransform: 'initial',
        color: '#67B6F4',
        '&:hover': {
            color: '#F4E05F',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#F4E05F',
        },
        '&:focus': {
            color: '#F4E05F',
        },
    },
    tabSelected: {},
};

class Header extends React.Component {

    render() {
        const props = this.props;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.header} position='static' color='inherit'>
                    <Toolbar>
                        <Grid container justify='space-around' alignItems='center' spacing={40}>
                            <Grid item>
                                <img className={classes.logo} src={logoImage} alt={'LOGO'}/>
                            </Grid>
                            <Grid item>
                                <Tabs
                                    value={this.props.tabIndex}
                                    onChange={this.props.changeTab}
                                    centered
                                    classes={{ indicator: classes.tabsIndicator }}
                                >
                                    <Tab classes={{ root: classes.tabRoot }}
                                         label='Home'/>
                                    <Tab classes={{ root: classes.tabRoot }}
                                         label='Wallet'/>
                                    <Tab classes={{ root: classes.tabRoot }}
                                         label='Administration'/>
                                </Tabs>
                            </Grid>
                            <Grid item>
                                {props.loggedInAddress === '' &&
                                <Button onClick={props.handleLogin}>Login</Button>}
                                {props.loggedInAddress !== '' &&
                                <Grid container justify='flex-end'>
                                    <Grid container direction='column'>
                                        <Grid item>
                                            <Avatar className={classes.avatar}>{props.avatar}</Avatar>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        {props.verfied && <VerifiedUser/>}
                                    </Grid>
                                </Grid>
                                }
                            </Grid>
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

export default withStyles(styles)(Header);