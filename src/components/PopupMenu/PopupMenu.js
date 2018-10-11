import React from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
const PopupMenu = props => {
    const {placement, open, anchor, handleClose, children} = props;

    return (
        <Popper open={open} anchorEl={anchor} transition disablePortal placement={placement}>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            {children}
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    )
};

PopupMenu.propTypes = {
    placement: PropTypes.string,
    open: PropTypes.bool.isRequired,
    anchor: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    children: PropTypes.object
};

export default PopupMenu;