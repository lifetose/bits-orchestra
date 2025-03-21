import { ChangeEvent } from "react";
import ErrorMessage from "./ErrorMessage";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}: InputProps) => (
  <div>
    <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className='mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

export default Input;
