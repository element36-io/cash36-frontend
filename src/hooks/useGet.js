import { useEffect, useRef } from 'react';

export default (getFunction, errorCallback) => {
  const mounted = useRef(true);

  const get = async () => {
    try {
      await getFunction();
    } catch (error) {
      if (mounted.current) {
        errorCallback(error);
      }
    }
  };

  useEffect(() => {
    get();

    return () => {
      mounted.current = false;
    };
  }, []);
};
