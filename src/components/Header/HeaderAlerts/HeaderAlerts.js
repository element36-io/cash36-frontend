import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Notification from '../../Notification';
import PopupMenu from '../../PopupMenu';
import './HeaderAlerts.scss';

class HeaderAlerts extends Component {
  state = {
    anchorEl: null,
    isOpen: false
  };

  openNotifications = evt => {
    this.setState({isOpen: true, anchorEl: evt.currentTarget});
    console.log()
  };

  closeNotifications = () => {
    this.setState({isOpen: false, anchorEl: null});
    localStorage.setItem('lastRead', new Date());
  };


  render() {
    // if(!this.props.notifications) return null;
    const {notifications: {badgeCount, notifications}} = this.props;
    const {isOpen, anchorEl} = this.state;

    return (
      <div>
        <span className='header__alerts' onClick={this.openNotifications}>
        <i className='fas fa-bell'/>
          {badgeCount > 0 && <span className="header__alerts__counter">{badgeCount}</span>}
          </span>
        {notifications && notifications.length && (
          <PopupMenu handleClose={this.closeNotifications} open={isOpen} anchor={anchorEl} placement='bottom-end'>
            <div className="header__alerts__content">
            {notifications && notifications.map(n => (
              <Notification {...n} key={n.creationDate}/>
            ))}
            </div>
          </PopupMenu>
        )}
      </div>

    );
  }
}

HeaderAlerts.propTypes = {
  notifications: PropTypes.object
};

export default HeaderAlerts;
