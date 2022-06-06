import { useCallback, useEffect, useState } from 'react';

export function useFetch(url: string, options?: RequestInit) {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(url, options);
      const text = await res.text();
      setResponse(text);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, options, setResponse, setError, setLoading]);

  const clearState = useCallback(() => {
    setResponse(null);
    setError(null);
  }, [setResponse, setError]);

  useEffect(() => {
    clearState();
    fetchData();
  }, [clearState, fetchData]);

  return { response, error, loading, fetchData };
}
