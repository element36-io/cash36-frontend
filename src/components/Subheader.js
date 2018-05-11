import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import { Paper } from 'material-ui';
import Grid from "material-ui/Grid";

const styles = {
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 250,
        background: 'linear-gradient(180deg, #000000 80%,#333333 100%)',
        borderRadius: 0
    },
    grid: {
        paddingTop: 20,
    },
};

class Subheader extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={0}>
                    <Grid className={classes.grid} container justify="center">
                        <Grid item style={{textAlign: 'center'}} xs={6}>
                            <Typography variant="title" style={{color: 'white'}}>Fiat and Crypto United</Typography>
                            <Typography variant="subheading" style={{color: 'white', marginTop: 10}}>We offer Swiss Frank (CHF) and Euro (EUR) as ERC20
                                compatible tokens, symbols are CHF36 and EUR36 - others will follow when we
                                enter new markets. Each of our tokens are attached to an already identified
                                person. Using our token means, that you can work with real FIAT on the Blockchain
                                and consider KYC (anti money laundering) processes already DONE!</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }
}

Subheader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Subheader);