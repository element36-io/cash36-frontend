import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';

import Responsive from '../Responsive';

import './ButtonDialog.scss';

const ButtonDialog = ({ button, children }) => {
  const [open, setOpen] = useState(false);
  console.log(open);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return (
    <div className="button-dialog-wrapper">
      <span onClick={onOpen}>{button}</span>
      <Responsive isMobile>
        <div className={`button-dialog ${open ? '--open' : ''}`}>
          <CloseIcon className="button-dialog__close" onClick={onClose} />
          {children}
        </div>
      </Responsive>
      <Responsive>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth={false}
          className="button-dialog"
        >
          <CloseIcon className="button-dialog__close" onClick={onClose} />
          {cloneElement(children, { closeDialog: onClose })}
        </Dialog>
      </Responsive>
    </div>
  );
};

ButtonDialog.propTypes = {
  button: PropTypes.any,
  children: PropTypes.any
};

export default ButtonDialog;
