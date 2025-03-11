import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getBooks, updateBook, deleteBook, IBook } from "../../api/books";
import BookTable from "../../components/BookTable";

const Dashboard = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [filter, setFilter] = useState("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
      setError(null);
    } catch (error: any) {
      setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const toggleActive = async (book: IBook) => {
    const updatedBook = {
      ...book,
      active: !book.active,
      modifiedAt: new Date().toISOString(),
    };
    setBooks((prev) => prev.map((b) => (b.id === book.id ? updatedBook : b)));
    await updateBook(updatedBook);
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    fetchBooks();
  };

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) => filter === "all" || book.active === (filter === "active"),
    );
  }, [books, filter]);

  if (loading) return <div>Loading books...</div>;

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
          <div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value='all'>Show All</option>
              <option value='active'>Show Active</option>
              <option value='deactivated'>Show Deactivated</option>
            </select>
            <span>
              Showing {filteredBooks.length} of {books.length}
            </span>
          </div>
          <BookTable
            books={filteredBooks}
            onToggleActive={toggleActive}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
