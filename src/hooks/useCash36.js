import { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Web3Context } from '../providers/web3.provider';
import E36Provider from '../helpers/e36.provider';

const useCash36 = () => {
  const _isMounted = useRef(true);
  const { web3 } = useContext(Web3Context);
  const { user } = useSelector(({ auth }) => auth);

  const isActive = () => {
    return _isMounted.current;
  };

  const setProvider = () => {
    // TODO: SOLVE THIS TO NOT REDIRECT ON UPORT - GOTTA TELL IT WHEN TO USE METAMASK, by setting this flag to true

    const useMetamask = true;
    if (!user || useMetamask) return;

    const { account, pushToken, boxPub } = user;
    const provider = new E36Provider({
      account,
      pushToken,
      boxPub,
      cancel: () => !isActive()
    });

    web3.setProvider(provider);
  };

  useEffect(() => {
    setProvider();
    return () => {
      _isMounted.current = false;
    };
  }, []);

  return web3;
};

export default useCash36;
