import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import Responsive from '../../components/Responsive';

import './DialogButton.scss';

const DialogButton = ({ button, children }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <div className="dialog-button-wrapper">
      <span onClick={onOpen}>{button}</span>
      <Responsive isMobile>
        <div className={`dialog-button ${open ? '--open' : ''}`}>
          <CloseIcon className="dialog-button__close" onClick={onClose} />
          {children}
        </div>
      </Responsive>
      <Responsive>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth={false}
          className="dialog-button"
        >
          <CloseIcon className="dialog-button__close" onClick={onClose} />
          {cloneElement(children, { closeDialog: onClose })}
        </Dialog>
      </Responsive>
    </div>
  );
};

DialogButton.propTypes = {
  button: PropTypes.any,
  children: PropTypes.any
};

export default DialogButton;
