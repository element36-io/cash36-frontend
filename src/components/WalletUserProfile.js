import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import UserProfile from "./UserProfile";
import TokenBalance from "./TokenBalance";

const styles = theme => ({
    gridItem: {
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'row',
        },
    },
});

class WalletUserProfile extends React.Component {

    render() {
        const { classes, tokens } = this.props;

        return (
            <Grid container justify="center" spacing={40}>
                <Grid item xs={12} sm={6} md={5} lg={4}>
                    <UserProfile/>
                </Grid>
                <Grid item xs={12} sm={6} md={5} lg={4}>
                    <Grid container className={classes.gridItem} spacing={16}>
                        {tokens && tokens.length > 0 && tokens.map((token, key) =>
                            <Grid item key={key} xs={12}>
                                <TokenBalance token={token}/>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

WalletUserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WalletUserProfile);