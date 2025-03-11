export interface IBook {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: number;
  active: boolean;
  createdAt: string;
  modifiedAt: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

const API_URL = "http://localhost:5000/books";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

export const getBooks = async (): Promise<IBook[]> => {
  try {
    const response = await fetch(API_URL);
    return await handleResponse<IBook[]>(response);
  } catch (error) {
    throw new Error(`Failed to fetch books: ${error}`);
  }
};

export const addBook = async (book: IBook): Promise<IBook | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    return await handleResponse<IBook>(response);
  } catch (error) {
    throw new Error(`Failed to add book: ${error}`);
  }
};

export const updateBook = async (
  id: string,
  book: IBook,
): Promise<IBook | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    return await handleResponse<IBook>(response);
  } catch (error) {
    throw new Error(`Failed to update book: ${error}`);
  }
};

export const deleteBook = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`Failed to delete book with ID ${id}`);
    }
    return true;
  } catch (error) {
    throw new Error(`Failed to delete book: ${error}`);
  }
};
