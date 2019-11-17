import React from 'react';
import PropTypes from 'prop-types';
import { Slide, Dialog } from '@material-ui/core';
import Responsive from '../Responsive';

export const SlideRight = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export const ResponsiveDialog = ({ children, open, onClose }) => (
  <>
    <Responsive isMobile>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        TransitionComponent={SlideRight}
        fullScreen
      >
        {children}
      </Dialog>
    </Responsive>
    <Responsive>
      <Dialog open={open} onClose={onClose} maxWidth={false}>
        {children}
      </Dialog>
    </Responsive>
  </>
);

ResponsiveDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func
};
