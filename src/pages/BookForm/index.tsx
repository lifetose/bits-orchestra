import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addBook, updateBook, IBook } from "../../api/books";
import useBook from "@/hooks/useBook";
import Input from "@/components/Input";
import Select from "@/components/Select";
import ErrorMessage from "@/components/ErrorMessage";

interface IFormData {
  title: string;
  author: string;
  category: string;
  isbn: number;
}

interface IFormErrors {
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

  const [formData, setFormData] = useState<IFormData>({
    title: "",
    author: "",
    category: "",
    isbn: 0,
  });

  const [errors, setErrors] = useState<IFormErrors>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        isbn: book.isbn,
      });
    }
  }, [book]);

  useEffect(() => {
    const trimmedData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      isbn: formData.isbn,
    };

    const isFormValid =
      Object.values(trimmedData).every((value) => value) &&
      Object.values(errors).every((error) => !error);

    setIsValid(isFormValid);
  }, [formData, errors]);

  const validateField = (field: keyof IFormData, value: string | number) => {
    let errorMsg: string | undefined;

    switch (field) {
      case "title":
        if (!value || value.toString().trim().length < 5) {
          errorMsg = "Title must be at least 5 characters long";
        }
        break;
      case "author":
        if (!value || value.toString().trim().length < 5) {
          errorMsg = "Author name must be at least 5 characters long";
        }
        break;
      case "category":
        if (!value) errorMsg = "Category is required";
        break;
      case "isbn":
        if (!value || typeof value !== "number" || value < 1000) {
          errorMsg = "ISBN must be at least 4 digits long";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: errorMsg,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const fieldValue = name === "isbn" ? parseInt(value, 10) || 0 : value;

    validateField(name as keyof IFormData, fieldValue);

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    const nowUtc = new Date().toISOString();
    const bookData: Omit<IBook, "id"> = {
      ...formData,
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
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <ErrorMessage message={errors.title} />}

            <Input
              label='Author Name'
              name='author'
              value={formData.author}
              onChange={handleChange}
            />
            {errors.author && <ErrorMessage message={errors.author} />}

            <Input
              label='ISBN'
              name='isbn'
              type='number'
              value={formData.isbn ? formData.isbn.toString() : ""}
              onChange={handleChange}
            />
            {errors.isbn && <ErrorMessage message={errors.isbn} />}

            <Select
              label='Category'
              name='category'
              value={formData.category}
              onChange={handleChange}
              options={categoryOptions}
            />
            {errors.category && <ErrorMessage message={errors.category} />}

            <button
              type='submit'
              disabled={!isValid}
              className={`w-full mt-4 py-2 px-4 rounded-md ${
                isValid
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
