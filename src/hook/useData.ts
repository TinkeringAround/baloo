import { useEffect, useState } from 'react';

// Hook
import { useFetch } from './useFetch';

// Store
import { BalooDataEntry, BalooStore } from '../store';

// Util
import { toBalooStore } from '../store/model';

export function useData() {
  const { response, error, loading, fetchData } = useFetch('http://192.168.4.1/data');
  const [data, setData] = useState<BalooStore | null>(null);

  useEffect(() => {
    response && setData(toBalooStore(response as BalooDataEntry[]));
  }, [response]);

  return { data, error, loading, fetchData };
}
