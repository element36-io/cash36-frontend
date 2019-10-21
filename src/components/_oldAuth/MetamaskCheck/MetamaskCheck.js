import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import './MetamaskCheck.scss';

const MetamaskCheck = ({ callback }) => {
  const [checkCompleted, setCheckCompleted] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);

  const checkForMetamask = async () => {
    if (!window.ethereum) {
      setCheckCompleted(true);
      setHasMetamask(false);
      return;
    }

    try {
      const accounts = await window.ethereum.enable();
      setTimeout(() => {
        callback(accounts[0]);
      }, 4000);
    } catch (error) {
      setCheckCompleted(true);
      setHasMetamask(false);
    }
  };

  useEffect(() => {
    checkForMetamask();
  }, []);

  return (
    <div className="login__metamask">
      <h2>Welcome</h2>
      <p>Checking for MetaMask...{checkCompleted && 'Successful'}</p>
      {!hasMetamask && checkCompleted && (
        <Fragment>
          <p> MetaMask not found</p>
          <p>
            We could not find your MetaMask Account, please make sure MetaMask
            is running and you are logged in.
          </p>
        </Fragment>
      )}
    </div>
  );
};

MetamaskCheck.propTypes = {
  callback: PropTypes.func
};

export default MetamaskCheck;
