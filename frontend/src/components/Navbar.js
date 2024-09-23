import React, { useEffect, useState } from 'react';
import { fetchTokenData, getUserInfoById, isUserAuthenticated } from '../services/apiServices';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const Navbar = (props) => {
  const handleClick = () => {
    if (props.isAuthenticated) {
      Cookies.remove('data');
    }
  };
  
  const [userInfo,setUserInfo] = useState({
    "user_id": '',
    "profileimage_url": "",
    "mobile": "",
    "dateofbirth": "",
    "city": "",
    "state": "",
    "country": "",
    "description": "",
    "gender": "",
    "address": "",
    "zipcode": "",
    "about_user": "",
    "joining_date": ""
  })
  useEffect(()=>{
    const getData = async()=>{

      const token = JSON.parse(Cookies.get('data') || '{}').access_token;
      const user = fetchTokenData(token);
      const userinfo=await getUserInfoById(user.user_id)
      setUserInfo(userinfo[0] || null)
    }
    if (isUserAuthenticated()) {
      getData()
    }
  },[])
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('dark-mode');
    return storedMode === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('dark-mode', newMode.toString());
      return newMode;
    });
  };
return (
  <header className="shadow bg-slate-100/60 dark:bg-[#1A1A1A] sticky top-0 z-50 backdrop-blur-[40px] backdrop-filter dark:border-gray-700 dark:backdrop-blur-[100px] ">
    <div className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center">
      <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse w-16 lg:w-20">
        <img src="/media/logo.png" className="rounded-full w-full" alt="Logo" />
      </Link>
      <Link to="/" className="hidden lg:flex items-center whitespace-nowrap text-2xl font-bold">
        <span className="text-gray-700 dark:text-[#E0E0E0]">SwiftBids</span>
      </Link>
      <input type="checkbox" className="peer hidden" id="navbar-open" />
      <label className="flex gap-3 absolute top-5 right-7 cursor-pointer md:hidden items-center" htmlFor="navbar-open">
        <div className='flex gap-5 items-center'>
          <li className="list-none text-gray-600 dark:text-[#E0E0E0] md:mr-12 hover:text-blue-600 md:hidden">
                <button onClick={toggleDarkMode}>
                  <i className="fas fa-solid fa-moon"></i>
                </button>
          </li>
          {isUserAuthenticated() ? (
            <Link to='/profile'>
              <img
                src={userInfo && userInfo.profileimage_url ? userInfo.profileimage_url : '/media/defaultuser.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </Link>
          ) : (<></>)}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 dark:text-[#E0E0E0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <nav aria-label="Header Navigation" className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
        <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
          <li className="text-gray-600 dark:text-[#E0E0E0] md:mr-12 hover:text-blue-600 font-medium">
            <Link to={`/${props.links[0]}`}>{props.navs[0]}</Link>
          </li>
          <li className="text-gray-600 dark:text-[#E0E0E0] md:mr-12 hover:text-blue-600 font-medium">
            <Link to={`/${props.links[1]}`}>{props.navs[1]}</Link>
          </li>
          <li className="text-gray-600 dark:text-[#E0E0E0] md:mr-12 hover:text-blue-600 font-medium">
            <Link to={`/${props.links[2]}`}>{props.navs[2]}</Link>
          </li>
          <li className="text-gray-600 dark:text-[#E0E0E0] md:mr-12 hover:text-blue-600 font-medium">
            <Link to={`/${props.links[3]}`}>{props.navs[3]}</Link>
          </li>
          <li className="text-gray-600 dark:text-[#E0E0E0] md:mr-12 hover:text-blue-600 hidden md:flex">
            <button onClick={toggleDarkMode}>
              <i className="fas fa-solid fa-moon"></i>
            </button>
          </li>
          
          <li className="text-gray-600 dark:text-[#E0E0E0] md:mr-12 hover:text-blue-600 hidden md:flex">
            {isUserAuthenticated() ? (
              <Link to='/profile'>
                <img
                  src={userInfo && userInfo.profileimage_url ? userInfo.profileimage_url : '/media/defaultuser.png'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </Link>
            ) : (
              <Link to="/auth/login">
                <button
                  type="button"
                  className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleClick}
                >
                  Login
                </button>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  </header>


  );
};

export default Navbar;
