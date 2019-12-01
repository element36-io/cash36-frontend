import { useEffect, useState, useRef } from 'react';

export default (getFunction, defaultState = {}) => {
  const mounted = useRef(true);
  const [data, setData] = useState(defaultState);
  const [error, setError] = useState('');

  const get = async () => {
    try {
      const data = await getFunction();
      if (mounted.current) setData(data);
    } catch (error) {
      if (mounted.current) setError(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getFunction();
        if (mounted.current) setData(data);
      } catch (error) {
        if (mounted.current) setError(error);
      }
    };

    getData();

    return () => {
      mounted.current = false;
    };
  }, []);

  return [data, error];
};
