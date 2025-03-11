import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks, updateBook, deleteBook, IBook } from "../../api/books";
import BookTable from "../../components/BookTable";

const Dashboard = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [filter, setFilter] = useState("active");

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
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
    await updateBook(updatedBook);
    fetchBooks();
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    fetchBooks();
  };

  const filteredBooks = books.filter((book) => {
    if (filter === "all") return true;
    return filter === "active" ? book.active : !book.active;
  });

  return (
    <div className='flex flex-col items-start w-full max-w-[1350px] mx-auto p-[10px] gap-2'>
      <h1>Book List</h1>
      <Link to='/book'>Add a Book</Link>

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
    </div>
  );
};

export default Dashboard;
