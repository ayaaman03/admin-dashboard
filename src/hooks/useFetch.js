import { useCallback, useEffect, useState } from 'react';

/**
 * useFetch — generic hook to run an async fetcher function and expose
 * data/loading/error state plus a refetch handle.
 *
 * @param {Function} fetcher - async function that returns data
 * @param {Array} deps - dependency array, refetches when these change
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load data.');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, setData, isLoading, error, refetch: fetchData };
}
