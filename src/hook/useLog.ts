import { useEffect, useState } from 'react';

// Hook
import { useFetch } from './useFetch';

export function useLog() {
  const { response, error, loading, fetchData } = useFetch('http://192.168.4.1/log');
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    response && setData(response);
  }, [response]);

  return { data, error, loading, fetchData };
}
