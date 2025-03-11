import useFetch from "./useFetch";
import { getBooks, IBook } from "../api/books";

const useBooks = () => {
  const { data, loading, error, refetch } = useFetch<IBook[]>(getBooks);

  return { data, loading, error, refetch };
};

export default useBooks;
