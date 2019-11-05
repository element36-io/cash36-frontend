import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import MobileDetect from 'mobile-detect';
import { Dialog, Slide } from '@material-ui/core';
import { getQueryStringValue } from '../helpers/wallet.helpers';
import Responsive from '../components/Responsive';
import NewWallet from '../components/NewWallet';

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export const AddWalletContext = React.createContext();

const AddWalletProvider = props => {
  const [open, setOpen] = useState(false);
  const [isUportWallet, setIsUportWallet] = useState(false);
  const md = useRef(new MobileDetect(window.navigator.userAgent));
  const location = useLocation();
  const history = useHistory();
  const onClose = () => {
    setOpen(false);
    if (isUportWallet) {
      setIsUportWallet(false);
      history.replace(location.pathname);
    }
  };
  const onOpen = () => setOpen(true);

  useEffect(() => {
    if (
      location.hash.includes('access_token') &&
      getQueryStringValue(location.search, 'type') === 'wallet' &&
      md.current.mobile() &&
      !md.current.tablet()
    ) {
      setIsUportWallet(true);
      setOpen(true);
    }
  }, []);

  return (
    <AddWalletContext.Provider
      value={{ onClose, onOpen, isUportWallet, setIsUportWallet, md }}
    >
      {props.children}
      <Responsive isMobile>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth={false}
          TransitionComponent={Transition}
          fullScreen
        >
          <NewWallet onClose={onClose} />
        </Dialog>
      </Responsive>
      <Responsive>
        <Dialog open={open} onClose={onClose} maxWidth={false}>
          <NewWallet onClose={onClose} />
        </Dialog>
      </Responsive>
    </AddWalletContext.Provider>
  );
};

export default AddWalletProvider;
