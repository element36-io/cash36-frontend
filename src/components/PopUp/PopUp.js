import React from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { CSSTransition } from 'react-transition-group';

const PopUp = props => {
  const {children, open, timeout, classNames, onClickAway} = props;

  return (
    <CSSTransition in={open} timeout={timeout} classNames={classNames} unmountOnExit>
      <ClickAwayListener onClickAway={onClickAway}>
        {children}
      </ClickAwayListener>
    </CSSTransition>
  );
};

PopUp.propTypes = {
  children: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  timeout: PropTypes.number.isRequired,
  classNames: PropTypes.string.isRequired,
  onClickAway: PropTypes.func.isRequired
};

export default PopUp;
