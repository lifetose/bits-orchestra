import { useCallback } from "react";
import useFetch from "./useFetch";
import { getBookById, IBook } from "../api/books";

const useBook = (
  id: string | undefined,
  { skip = false }: { skip?: boolean },
) => {
  const fetchBook = useCallback(
    () => (id ? getBookById(id) : Promise.resolve(null)),
    [id],
  );

  const { data, loading, error, refetch } = useFetch<IBook | null>(fetchBook, {
    skip: skip || !id,
  });

  return { data, loading, error, refetch };
};

export default useBook;
