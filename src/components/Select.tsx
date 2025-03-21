import { ChangeEvent } from "react";
import ErrorMessage from "./ErrorMessage";

interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
}

const Select = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
}: SelectProps) => (
  <div>
    <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
      {label}
    </label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className='mt-1 px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
    >
      <option value=''>Select {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <ErrorMessage message={error} />}
  </div>
);

export default Select;
