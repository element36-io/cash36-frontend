import { useEffect, useState, useRef, useCallback } from 'react';

export default (getFunction, defaultState = {}) => {
  const mounted = useRef(true);
  const [data, setData] = useState(defaultState);
  const [error, setError] = useState('');

  const getData = useCallback(async () => {
    try {
      const data = await getFunction();
      if (mounted.current) setData(data);
    } catch (error) {
      if (mounted.current) setError(error);
    }
  }, [mounted]);

  useEffect(() => {
    getData();

    return () => {
      mounted.current = false;
    };
  }, []);

  return [data, error, getData];
};
