import { useCallback } from "react";
import useFetch from "./useFetch";
import { getBookById, IBook } from "../api/books";

const useBook = (id: string, { skip }: { skip?: boolean }) => {
  const fetchBook = useCallback(() => {
    return skip ? Promise.resolve(null) : getBookById(id);
  }, [id, skip]);

  const { data, loading, error, refetch } = useFetch<IBook | null>(fetchBook);

  return { data, loading, error, refetch };
};

export default useBook;
