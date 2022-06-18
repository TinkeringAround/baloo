import { useCallback, useEffect, useState } from 'react';

// Hook
import { useFetch } from './useFetch';
import { BalooDataEntry, INITIAL_STATE } from '../context';

export function useData() {
  const { response, error, loading, fetchData } = useFetch('http://192.168.4.1/data');
  const [data, setData] = useState<BalooDataEntry | null>(null);

  useEffect(() => {
    if (response) {
      try {
        setData(JSON.parse(response));
      } catch (e) {
        console.error(e);
        setData(INITIAL_STATE);
      }
    } else {
      setData(null);
    }
  }, [response]);

  const consume = useCallback(() => {
    setData(null);
  }, [setData]);

  return { data, error, loading, fetchData, consume };
}
