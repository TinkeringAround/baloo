import { useEffect, useState } from 'react';

// Hook
import { useFetch } from './useFetch';
import { BalooDataEntry, BalooState, INITIAL_STATE } from '../context';

// Util
import { toBalooStateWithSnapshot } from '../context/model';

export function useData() {
  const { response, error, loading, fetchData } = useFetch('http://192.168.4.1/data');
  const [data, setData] = useState<BalooState | null>(null);

  useEffect(() => {
    if (response) {
      try {
        const balooDataEntries = JSON.parse('[' + response + ']') as BalooDataEntry[];
        setData(toBalooStateWithSnapshot(balooDataEntries));
      } catch (e) {
        console.error(e);
        setData(INITIAL_STATE);
      }
    }
  }, [response]);

  return { data, error, loading, fetchData };
}
