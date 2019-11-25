import { useEffect, useState, useRef } from 'react';

export default getFunction => {
  const mounted = useRef(true);
  const [data, setData] = useState({});
  const [error, setError] = useState('');

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
