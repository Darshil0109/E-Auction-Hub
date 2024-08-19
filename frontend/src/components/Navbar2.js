import React from 'react';

const Navbar2 = (props) => {
  return (
    <>
          <header class="shadow bg-white">
    <div class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse w-16 lg:w-20">
          <img src="./media/logo.png" className="rounded-full w-full " alt="Logo" />
        </a>
      <a href="/" class="hidden lg:flex items-center whitespace-nowrap text-2xl font-bold">
        <span class="text-gray-700">SwiftBids</span>
      </a>
      <input type="checkbox" class="peer hidden" id="navbar-open" />
      <label class="absolute top-5 right-7 cursor-pointer md:hidden items-center" for="navbar-open">
        <span class="sr-only">Toggle Navigation</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <nav aria-label="Header Navigation" class="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
        <ul class="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
          <li class="text-gray-600 md:mr-12 hover:text-blue-600"><a href={`/${props.links[0]}`}>{props.navs[0]}</a></li>
          <li class="text-gray-600 md:mr-12 hover:text-blue-600"><a href={`/${props.links[1]}`}>{props.navs[1]}</a></li>
          <li class="text-gray-600 md:mr-12 hover:text-blue-600"><a href={`/${props.links[2]}`}>{props.navs[2]}</a></li>
          <li class="text-gray-600 md:mr-12 hover:text-blue-600"><a href={`/${props.links[3]}`}>{props.navs[3]}</a></li>
          <li class="text-gray-600 md:mr-12 hover:text-blue-600">
            <button class="rounded-md border-2 border-blue-600 px-6 py-1 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">Login</button>
          </li>
        </ul>
      </nav>
    </div>
  </header>

    </>
  );
};

export default Navbar2;
