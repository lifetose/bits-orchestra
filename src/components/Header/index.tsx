import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='bg-blue-600'>
      <header className='max-w-[1350px] mx-auto'>
        <ul className='flex space-x-6 p-2'>
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
