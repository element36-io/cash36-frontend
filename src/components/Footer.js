import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, withStyles } from '@material-ui/core';
import { Link } from "react-router-dom";


const footerStyle = {
    block: {
        color: 'inherit',
        padding: '15px',
        textTransform: 'uppercase',
        borderRadius: '3px',
        textDecoration: 'none',
        position: 'relative',
        display: 'block',
        fontWeight: '500',
        fontSize: '12px'
    },
    left: {
        display: 'block'
    },
    right: {
        padding: '15px 0',
        margin: '0',
        fontSize: '14px',
    },
    container: {
        background: 'linear-gradient(180deg, #000000 80%,#333333 100%)',
        paddingRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '2px solid #d7d7d7',
        padding: '15px 0',
        marginTop: 30,
    },
    a: {
        textDecoration: 'none',
        backgroundColor: 'transparent'
    },
    list: {
        marginBottom: '0',
        padding: '0',
        marginTop: '0'
    },
    inlineBlock: {
        display: 'inline-block',
        paddingTop: '0px',
        width: 'auto'
    }
};

function Footer({ ...props }) {
    const { classes } = props;

    return (
        <div className={classes.container}>
            <Grid container justify="space-between" spacing={40}>
                <Grid item xs={12} md={4}>
                    <Typography variant="caption" style={{color: 'white'}}>
                        element36 GmbH<br/>
                        Bahnmatt 25<br/>
                        CH 6340 Baar
                    </Typography>
                </Grid>
                <Grid item xs={6} md={4} style={{textAlign: 'center'}}>
                    <Typography variant="caption" style={{color: 'white'}}>
                        Support: ask@element36.io
                    </Typography>
                </Grid>
                <Grid item xs={6} md={4} style={{textAlign: 'right'}}>
                    <Typography variant="caption" style={{color: 'white'}}>
                        &copy; {1900 + new Date().getYear()}{' '} element36
                    </Typography>
                    <Link to={"/admin"}><Typography variant="caption" style={{color: '#67B6F4'}}>Administration</Typography></Link>
                </Grid>
            </Grid>
        </div>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
