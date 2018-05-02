import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, withStyles } from 'material-ui';

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
        paddingRight: '15px',
        paddingLeft: '15px',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    footer: {
        bottom: '0',
        borderTop: '1px solid #e7e7e7',
        padding: '15px 0',
        marginTop: 50,
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
        <footer className={classes.footer}>
            <div className={classes.container}>
                <div className={classes.left}>
                    <List className={classes.list}>
                        <ListItem className={classes.inlineBlock}>
                            <a href='#home' className={classes.block}>
                                Home
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href='#company' className={classes.block}>
                                Company
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href='#portfolio' className={classes.block}>
                                Portfolio
                            </a>
                        </ListItem>
                        <ListItem className={classes.inlineBlock}>
                            <a href='#blog' className={classes.block}>
                                Blog
                            </a>
                        </ListItem>
                    </List>
                </div>
                <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{' '}
              element36
          </span>
                </p>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(Footer);
