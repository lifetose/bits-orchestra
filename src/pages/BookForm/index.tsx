import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
        }
      };
      fetchBook();
    }
  }, [id, isEditMode]);

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
      id: isEditMode ? id : "",
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
    <div className='book-form'>
      <header>
        <h1>{isEditMode ? "Edit Book" : "Add a Book"}</h1>
        <Link to='/'>Back to Dashboard</Link>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Title</label>
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && <span className='error'>{errors.title}</span>}
        </div>

        <div>
          <label>Author Name</label>
          <input
            type='text'
            name='author'
            value={form.author}
            onChange={handleChange}
          />
          {errors.author && <span className='error'>{errors.author}</span>}
        </div>

        <div>
          <label>Category</label>
          <select name='category' value={form.category} onChange={handleChange}>
            <option value=''>Select Category</option>
            <option value='Fiction'>Fiction</option>
            <option value='Non-Fiction'>Non-Fiction</option>
            <option value='Sci-Fi'>Sci-Fi</option>
            <option value='Biography'>Biography</option>
          </select>
          {errors.category && <span className='error'>{errors.category}</span>}
        </div>

        <div>
          <label>ISBN</label>
          <input
            type='number'
            name='isbn'
            value={form.isbn}
            onChange={handleChange}
          />
          {errors.isbn && <span className='error'>{errors.isbn}</span>}
        </div>

        <button type='submit'>{isEditMode ? "Edit Book" : "Add a Book"}</button>
      </form>
    </div>
  );
};

export default BookForm;
