import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Notification from '@material-ui/icons/Notifications';
import withStyles from "@material-ui/core/styles/withStyles";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
    margin: {
        marginRight: theme.spacing.unit,
    },
});

class NotificationsMenu extends React.Component {

    handleClick = () => {
        this.props.openDrawer();
        this.props.reset();
    };

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <IconButton className={classes.margin} onClick={this.handleClick} style={{ width: 24 }}>
                    {this.props.notificationsBadge > 0 &&
                    <Badge className={classes.badge} badgeContent={this.props.notificationsBadge} color="primary">
                        <Notification style={{ color: 'white' }}/>
                    </Badge>
                    }
                    {this.props.notificationsBadge === 0 &&
                    <Notification style={{ color: 'white' }}/>
                    }
                </IconButton>
            </div>
        );
    }
}

NotificationsMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationsMenu);