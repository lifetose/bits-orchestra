import { useCallback } from "react";
import useFetch from "./useFetch";
import { getBookById, IBook } from "../api/books";

const useBook = (id: string, { skip = false }: { skip?: boolean }) => {
  const fetchBook = useCallback(() => getBookById(id), [id]);

  const { data, loading, error, refetch } = useFetch<IBook | null>(fetchBook, {
    skip,
  });

  return { data, loading, error, refetch };
};

export default useBook;
