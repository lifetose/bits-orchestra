import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { updateBook, deleteBook, IBook } from "../../api/books";
import BookTable from "../../components/BookTable";
import useBooks from "../../hooks/useBooks";

const Dashboard = () => {
  const { data, loading, error, refetch } = useBooks();
  const [filter, setFilter] = useState("active");

  const toggleActive = async (id: string, book: IBook) => {
    const updatedBook = {
      ...book,
      active: !book.active,
      modifiedAt: new Date().toISOString(),
    };
    await updateBook(id, updatedBook);
    refetch();
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    refetch();
  };

  const filteredBooks = useMemo(() => {
    return (data ?? []).filter(
      (book) => filter === "all" || book.active === (filter === "active"),
    );
  }, [data, filter]);

  return (
    <div className='flex flex-col items-start w-full max-w-[1350px] mx-auto p-[10px] gap-2'>
      {loading ? (
        <div>Loading books...</div>
      ) : error ? (
        <div className='text-red-600'>Error: {error}</div>
      ) : (
        <>
          <h1>Book List</h1>
          <Link
            to='/book'
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300'
          >
            Add a Book
          </Link>
          {data && data.length === 0 ? (
            <div>No books found.</div>
          ) : (
            <>
              <div className='flex gap-2'>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className='border border-gray-300 rounded-md shadow-sm'
                >
                  <option value='all'>Show All</option>
                  <option value='active'>Show Active</option>
                  <option value='deactivated'>Show Deactivated</option>
                </select>
                <span>
                  Showing {filteredBooks?.length} of {data?.length}
                </span>
              </div>
              {filteredBooks?.length === 0 ? (
                <div>No books matching the filter.</div>
              ) : (
                <BookTable
                  books={filteredBooks}
                  onToggleActive={toggleActive}
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
