import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addBook, updateBook, IBook } from "../../api/books";
import useBook from "@/hooks/useBook";
import Input from "@/components/Input";
import Select from "@/components/Select";
import ErrorMessage from "@/components/ErrorMessage";

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

const categoryOptions = [
  { value: "Fiction", label: "Fiction" },
  { value: "Non-Fiction", label: "Non-Fiction" },
  { value: "Sci-Fi", label: "Sci-Fi" },
  { value: "Biography", label: "Biography" },
];

const BookForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const { data: book, loading, error } = useBook(id, { skip: !isEditMode });

  const [form, setForm] = useState<IBookForm>({
    title: "",
    author: "",
    category: "",
    isbn: 0,
  });

  const [errors, setErrors] = useState<IErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (book) {
      setForm({
        title: book.title,
        author: book.author,
        category: book.category,
        isbn: book.isbn,
      });
    }
  }, [book]);

  useEffect(() => {
    const validate = (): boolean => {
      const newErrors: IErrors = {};
      if (!form.title.trim()) newErrors.title = "Book title is required";
      if (!form.author.trim()) newErrors.author = "Author name is required";
      if (!form.category.trim()) newErrors.category = "Category is required";
      if (!form.isbn) newErrors.isbn = "ISBN is required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    setIsFormValid(validate());
  }, [form]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "isbn" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const nowUtc = new Date().toISOString();

    const bookData: Omit<IBook, "id"> = {
      ...form,
      active: true,
      createdAt: isEditMode ? book?.createdAt || nowUtc : nowUtc,
      modifiedAt: isEditMode ? nowUtc : null,
    };

    if (isEditMode) {
      await updateBook(id, bookData);
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
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className='text-red-600'>Error: {error}</div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4 w-full'>
            <Input
              label='Book Title'
              name='title'
              value={form.title}
              onChange={handleChange}
            />
            {errors.title ? <ErrorMessage message={errors.title} /> : null}
            <Input
              label='Author Name'
              name='author'
              value={form.author}
              onChange={handleChange}
            />
            {errors.author ? <ErrorMessage message={errors.author} /> : null}
            <Select
              label='Category'
              name='category'
              value={form.category}
              onChange={handleChange}
              options={categoryOptions}
            />
            {errors.category ? (
              <ErrorMessage message={errors.category} />
            ) : null}
            <Input
              label='ISBN'
              name='isbn'
              type='number'
              value={form.isbn}
              onChange={handleChange}
            />
            {errors.isbn ? <ErrorMessage message={errors.isbn} /> : null}
            <button
              type='submit'
              disabled={!isFormValid}
              className={`w-full mt-4 py-2 px-4 rounded-md ${
                isFormValid
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {isEditMode ? "Edit Book" : "Add a Book"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookForm;
