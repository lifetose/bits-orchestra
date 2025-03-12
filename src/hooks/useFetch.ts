import { useState, useEffect, useCallback } from "react";

const useFetch = <T>(
  fetchFunction: () => Promise<T>,
  { skip = false } = {},
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!skip);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (skip) return;
    setLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
      setError(null);
    } catch (err: unknown) {
      console.error("Fetch error:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred.",
      );
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, skip]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
