import React from "react";
import { useNavigate } from "react-router-dom";

import { IBook } from "@/api/books";
import { formatDate } from "@/utils/date";

interface BookTableProps {
  books: IBook[];
  onToggleActive: (book: IBook) => void;
  onDelete: (id: string) => void;
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  onToggleActive,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <table className='book-table'>
      <thead>
        <tr>
          <th>Book Title</th>
          <th>Author Name</th>
          <th>Category</th>
          <th>ISBN</th>
          <th>Created At</th>
          <th>Modified/Edited At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id} className={!book.active ? "deactivated" : ""}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.category}</td>
            <td>{book.isbn}</td>
            <td>{formatDate(book.createdAt)}</td>
            <td>{book.modifiedAt ? formatDate(book.modifiedAt) : null} </td>
            <td>
              <button onClick={() => navigate(`/edit/${book.id}`)}>Edit</button>
              <button onClick={() => onToggleActive(book)}>
                {book.active ? "Deactivate" : "Re-Activate"}
              </button>
              {!book.active && (
                <button onClick={() => onDelete(book.id)}>Delete</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
