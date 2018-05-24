import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SwapHoriz from '@material-ui/icons/SwapVerticalCircle';
import withStyles from "@material-ui/core/styles/withStyles";
import ListItemText from "@material-ui/core/ListItemText";
import Info from "@material-ui/icons/Info";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    margin: {
        marginRight: theme.spacing.unit,
    },
});

const mapItem = (notifications) => {
    if (notifications && notifications.length > 0) {
        notifications = _.orderBy(notifications, [ 'creationDate' ], [ 'desc' ]);
        return notifications.map((n, key) => (
            <ListItem key={key}>
                <ListItemIcon>
                    <SwapHoriz/>
                </ListItemIcon>
                <ListItemText disableTypography inset
                              primary={
                                  <Typography style={{ fontWeight: n.new ? 700 : 400, fontSize: '110%' }}>{n.header}</Typography>
                              }
                              secondary={
                                  <Typography style={{ fontWeight: n.new ? 700 : 400, opacity: 0.7 }}>{n.message}</Typography>
                              }/>
            </ListItem>
        ));
    } else {
        return <ListItem>
            <ListItemIcon>
                <Info/>
            </ListItemIcon>
            <ListItemText inset primary="No notifications"/>
        </ListItem>
    }
};

class NotificationList extends React.Component {

    render() {
        return (
            <Drawer anchor="right" open={this.props.drawerOpen} onClose={this.props.closeDrawer}>
                <List style={{ width: 350 }}>
                    {mapItem(this.props.notifications)}
                </List>
            </Drawer>
        );
    }
}

NotificationList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationList);