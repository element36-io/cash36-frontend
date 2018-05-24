import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Notification from '@material-ui/icons/Notifications';
import withStyles from "@material-ui/core/styles/withStyles";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";


const styles = theme => ({
    margin: {
        marginRight: theme.spacing.unit,
    },
});

class NotificationsMenu extends React.Component {

    handleClick = () => {
        this.props.openDrawer();
    };

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        const { classes, badgeCount } = this.props;

        return (
            <Tooltip id="tooltip-bottom" title="Notifications" placement="bottom">
                <IconButton className={classes.margin} onClick={this.handleClick} style={{ width: 24 }}>
                    {badgeCount > 0 &&
                    <Badge className={classes.badge} badgeContent={badgeCount} color="primary">
                        <Notification style={{ color: 'white' }}/>
                    </Badge>
                    }
                    {badgeCount === 0 &&
                    <Notification style={{ color: 'white' }}/>
                    }
                </IconButton>
            </Tooltip>
        );
    }
}

NotificationsMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationsMenu);