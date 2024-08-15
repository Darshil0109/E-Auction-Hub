import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#e5e5e5] border-b border-[#F7C59F] fixed top-0 w-full z-50">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./media/logo.png" className="h-16" alt="Logo" />
        </a>
        <button 
          onClick={handleToggle}
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-[#004E89] rounded-lg md:hidden border-none bg-transparent" 
          aria-controls="navbar-default" 
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        <div className={`md:flex md:w-auto ${isOpen ? 'block' : 'hidden'} w-full`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="/" className="block py-2 px-3 text-[#004E89] text-lg md:text-xl bg-[#FF6B35] rounded md:bg-transparent md:text-[#004E89] md:p-0" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/about" className="block py-2 px-3 text-[#004E89] text-lg md:text-xl rounded hover:bg-[#F7C59F] md:hover:bg-transparent md:border-0 md:hover:text-[#004E89] md:p-0">About</a>
            </li>
            <li>
              <a href="/products" className="block py-2 px-3 text-[#004E89] text-lg md:text-xl rounded hover:bg-[#F7C59F] md:hover:bg-transparent md:border-0 md:hover:text-[#004E89] md:p-0">Auctions</a>
            </li>
            <li>
              <a href="/contact" className="block py-2 px-3 text-[#004E89] text-lg md:text-xl rounded hover:bg-[#F7C59F] md:hover:bg-transparent md:border-0 md:hover:text-[#004E89] md:p-0">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
