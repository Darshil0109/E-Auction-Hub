import React from 'react';

const Navbar2 = (props) => {
  return (
    <>
          <header className="shadow bg-white">
    <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse w-16 lg:w-20">
          <img src="./media/logo.png" className="rounded-full w-full " alt="Logo" />
        </a>
      <a href="/" className="hidden lg:flex items-center whitespace-nowrap text-2xl font-bold">
        <span className="text-gray-700">SwiftBids</span>
      </a>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label className="absolute top-5 right-7 cursor-pointer md:hidden items-center" htmlFor="navbar-open">
        <span className="sr-only">Toggle Navigation</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <nav aria-label="Header Navigation" className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
        <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
          <li className="text-gray-600 md:mr-12 hover:text-blue-600"><a href={`/${props.links[0]}`}>{props.navs[0]}</a></li>
          <li className="text-gray-600 md:mr-12 hover:text-blue-600"><a href={`/${props.links[1]}`}>{props.navs[1]}</a></li>
          <li className="text-gray-600 md:mr-12 hover:text-blue-600"><a href={`/${props.links[2]}`}>{props.navs[2]}</a></li>
          <li className="text-gray-600 md:mr-12 hover:text-blue-600"><a href={`/${props.links[3]}`}>{props.navs[3]}</a></li>
          <li className="text-gray-600 md:mr-12 hover:text-blue-600">
            <a href="/auth/login"><button type="button" className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login </button></a>
          </li>
        </ul>
      </nav>
    </div>
  </header>

    </>
  );
};

export default Navbar2;
