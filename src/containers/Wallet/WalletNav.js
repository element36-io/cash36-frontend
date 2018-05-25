import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Tab, Tabs } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
        zIndex: 500,
    },
    paper: {
        height: 50,
        backgroundColor: 'black',
        position: 'relative',
    },
    tabsIndicator: {
        height: 3,
        backgroundColor: '#67B6F4',
    },
    tabRoot: {
        marginBottom: 2,
        textTransform: 'initial',
        color: '#67B6F4',
        '&:hover': {
            color: '#67B6F4',
            opacity: 1,
        },
        '&:focus': {
            color: '#67B6F4',
            backgroundColor: '#333333',
            opacity: 0.8,
        },
    },
};

class WalletNav extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Tabs
                        value={this.props.tabIndex}
                        onChange={this.props.changeTab}
                        classes={{ indicator: classes.tabsIndicator }}
                        centered
                    >
                        <Tab classes={{ root: classes.tabRoot }}
                             label='OVERVIEW'/>
                        <Tab classes={{ root: classes.tabRoot }}
                             label='BUY'/>
                        <Tab classes={{ root: classes.tabRoot }}
                             label='SELL'/>
                        <Tab classes={{ root: classes.tabRoot }}
                             label='HISTORY'/>
                    </Tabs>
                </Paper>
            </div>
        );
    }
}

WalletNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WalletNav);