import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

class UserMenu extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = event => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        this.props.logout();
    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <IconButton onClick={this.handleClick} style={{ width: 24 }}>
                    <MoreVertIcon style={{ color: 'gray' }}/>
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {/*<MenuItem key={'admin'} component={Link} to={"/admin"}>*/}
                        {/*Admin*/}
                    {/*</MenuItem>*/}
                    <MenuItem key={'logout'} onClick={this.handleLogout}>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default UserMenu;