import { useEffect, useState, useRef } from 'react';

export default getFunction => {
  const mounted = useRef(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const get = async () => {
    try {
      const data = await getFunction();
      if (mounted.current) setData(data);
    } catch (error) {
      if (mounted.current) setError(error);
    }
  };

  useEffect(() => {
    get();

    return () => {
      mounted.current = false;
    };
  }, []);

  return [data, error];
};
