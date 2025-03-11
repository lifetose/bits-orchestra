import React from "react";
import { useNavigate } from "react-router-dom";

import { IBook } from "@/api/books";
import { formatDate } from "@/utils/date";

interface BookTableProps {
  books: IBook[];
  onToggleActive: (id: string, book: IBook) => void;
  onDelete: (id: string) => void;
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  onToggleActive,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full min-w-max'>
        <thead>
          <tr className='bg-gray-100 text-gray-600'>
            <th className='px-4 py-2 text-left'>Book Title</th>
            <th className='px-4 py-2 text-left'>Author Name</th>
            <th className='px-4 py-2 text-left'>Category</th>
            <th className='px-4 py-2 text-left'>ISBN</th>
            <th className='px-4 py-2 text-left'>Created At</th>
            <th className='px-4 py-2 text-left'>Modified/Edited At</th>
            <th className='px-4 py-2 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className='bg-white hover:bg-gray-50'>
              <td className='px-4 py-2'>{book.title}</td>
              <td className='px-4 py-2'>{book.author}</td>
              <td className='px-4 py-2'>{book.category}</td>
              <td className='px-4 py-2'>{book.isbn}</td>
              <td className='px-4 py-2'>{formatDate(book.createdAt)}</td>
              <td className='px-4 py-2'>
                {book.modifiedAt ? formatDate(book.modifiedAt) : "--"}
              </td>
              <td className='flex px-4 py-2'>
                <button
                  onClick={() => navigate(`/book/${book.id}`)}
                  className='px-3 py-1 mr-2 text-sm font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200 focus:outline-none'
                >
                  Edit
                </button>
                <button
                  onClick={() => onToggleActive(book.id, book)}
                  className={`px-3 py-1 mr-2 text-sm font-medium rounded focus:outline-none ${
                    book.active
                      ? "text-yellow-600 bg-yellow-100 hover:bg-yellow-200"
                      : "text-green-600 bg-green-100 hover:bg-green-200"
                  }`}
                >
                  {book.active ? "Deactivate" : "Re-Activate"}
                </button>
                {!book.active ? (
                  <button
                    onClick={() => onDelete(book.id)}
                    className='px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded hover:bg-red-200 focus:outline-none'
                  >
                    Delete
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
