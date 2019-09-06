import { useRef, useEffect } from 'react';

export default (getFunction, errorCallback, stateSetter) => {
  const mounted = useRef(true);

  const get = async () => {
    try {
      const response = await getFunction();

      if (mounted.current) {
        stateSetter(response);
      }
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
