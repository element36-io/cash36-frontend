import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MmCheck = ({ onSuccess = () => {} }) => {
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
      setCheckCompleted(true);
      setHasMetamask(true);

      setTimeout(() => {
        onSuccess(accounts[0]);
      }, 1000);
    } catch (err) {
      setCheckCompleted(true);
      setHasMetamask(false);
    }
  };

  useEffect(() => {
    checkForMetamask();
  }, []);

  return (
    <>
      <p>
        Checking for MetaMask...
        {(checkCompleted && hasMetamask && 'Successful') ||
          (checkCompleted && !hasMetamask && 'Failed')}
      </p>
      {!hasMetamask && checkCompleted && (
        <p>
          We could not find your MetaMask Account, please make sure MetaMask is
          running and you are logged in.
        </p>
      )}
    </>
  );
};

MmCheck.propTypes = {
  onSuccess: PropTypes.func
};

export default MmCheck;
