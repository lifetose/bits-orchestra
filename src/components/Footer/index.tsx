const Footer = () => {
  return (
    <div className='h-[70px] bg-blue-600'>
      <footer className='flex flex-col justify-center items-center h-full w-full max-w-[1350px] mx-auto p-[10px] gap-2'>
        <a
          href='https://github.com/lifetose?tab=repositories'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white text-sm font-semibold hover:text-yellow-300 hover:underline transition duration-300'
        >
          sashalehedza
        </a>
      </footer>
    </div>
  );
};

export default Footer;
