import { useEffect, useState } from 'react';

// Hook
import { useFetch } from './useFetch';
import { BalooDataEntry, BalooState } from '../context';

// Util
import { toBalooStateWithSnapshot } from '../context/model';

export function useData() {
  const { response, error, loading, fetchData } = useFetch('http://192.168.4.1/data');
  const [data, setData] = useState<BalooState | null>(null);

  useEffect(() => {
    response && setData(toBalooStateWithSnapshot(response as BalooDataEntry[]));
  }, [response]);

  return { data, error, loading, fetchData };
}
