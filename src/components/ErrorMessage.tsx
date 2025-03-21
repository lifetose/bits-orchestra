interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <span className='text-red-600 text-sm'>{message}</span>
);

export default ErrorMessage;
