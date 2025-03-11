import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { addBook, updateBook, getBooks, IBook } from "../../api/books";

interface IBookForm {
  title: string;
  author: string;
  category: string;
  isbn: number;
}

interface IErrors {
  title?: string;
  author?: string;
  category?: string;
  isbn?: string;
}

const BookForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [form, setForm] = useState<IBookForm>({
    title: "",
    author: "",
    category: "",
    isbn: 0,
  });

  const [errors, setErrors] = useState<IErrors>({});

  useEffect(() => {
    if (isEditMode) {
      const fetchBook = async () => {
        const data = await getBooks();
        const book = data.find((b) => b.id === id);
        if (book) {
          setForm({
            title: book.title,
            author: book.author,
            category: book.category,
            isbn: book.isbn,
          });
        } else {
          navigate("/not-found");
        }
      };
      fetchBook();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "isbn") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = (): boolean => {
    const newErrors: IErrors = {};
    if (!form.title.trim()) newErrors.title = "Book title is required";
    if (!form.author.trim()) newErrors.author = "Author name is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.isbn) newErrors.isbn = "ISBN is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const bookData: IBook = {
      ...form,
      active: true,
      createdAt: new Date().toISOString(),
      modifiedAt: isEditMode ? new Date().toISOString() : null,
      id: isEditMode ? id : uuidv4(),
    };

    if (isEditMode) {
      await updateBook(bookData);
      alert("Book updated successfully!");
    } else {
      await addBook(bookData);
      alert("Book added successfully!");
    }

    navigate("/");
  };

  return (
    <div className='flex flex-col items-start w-full max-w-[1350px] mx-auto p-[10px] gap-2'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-full flex flex-col items-center mb-6'>
          <h1 className='text-2xl font-semibold text-gray-700'>
            {isEditMode ? "Edit Book" : "Add a Book"}
          </h1>
          <Link
            to='/'
            className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300'
          >
            Back to Dashboard
          </Link>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700'
            >
              Book Title
            </label>
            <input
              type='text'
              name='title'
              id='title'
              value={form.title}
              onChange={handleChange}
              className='mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.title && (
              <span className='text-red-600 text-sm'>{errors.title}</span>
            )}
          </div>

          <div>
            <label
              htmlFor='author'
              className='block text-sm font-medium text-gray-700'
            >
              Author Name
            </label>
            <input
              type='text'
              name='author'
              id='author'
              value={form.author}
              onChange={handleChange}
              className='mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.author && (
              <span className='text-red-600 text-sm'>{errors.author}</span>
            )}
          </div>

          <div>
            <label
              htmlFor='category'
              className='block text-sm font-medium text-gray-700'
            >
              Category
            </label>
            <select
              name='category'
              id='category'
              value={form.category}
              onChange={handleChange}
              className='mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            >
              <option value=''>Select Category</option>
              <option value='Fiction'>Fiction</option>
              <option value='Non-Fiction'>Non-Fiction</option>
              <option value='Sci-Fi'>Sci-Fi</option>
              <option value='Biography'>Biography</option>
            </select>
            {errors.category && (
              <span className='text-red-600 text-sm'>{errors.category}</span>
            )}
          </div>

          <div>
            <label
              htmlFor='isbn'
              className='block text-sm font-medium text-gray-700'
            >
              ISBN
            </label>
            <input
              type='number'
              name='isbn'
              id='isbn'
              value={form.isbn}
              onChange={handleChange}
              className='mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            />
            {errors.isbn && (
              <span className='text-red-600 text-sm'>{errors.isbn}</span>
            )}
          </div>

          <div>
            <button
              type='submit'
              className='w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              {isEditMode ? "Edit Book" : "Add a Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
