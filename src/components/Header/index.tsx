import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='h-[70px] bg-blue-600'>
      <header className='flex flex-col justify-center items-start h-full w-full max-w-[1350px] mx-auto p-[10px] gap-2'>
        <ul className='flex space-x-6'>
          <li>
            <Link
              to='/'
              className='text-white text-sm font-semibold hover:text-yellow-300 hover:underline transition duration-300'
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to='/book'
              className='text-white text-sm font-semibold hover:text-yellow-300 hover:underline transition duration-300'
            >
              Add Book
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
