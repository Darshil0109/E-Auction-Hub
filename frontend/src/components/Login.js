import React, { useEffect, useState } from "react";
import { isUserAuthenticated, loginUserData } from "../services/apiServices";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate=useNavigate()
  
  useEffect(() => {
    if (isUserAuthenticated()) {
      navigate('/profile')
    }
  }, [navigate]);
  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setIsClicked(true);
    let email=event.target.email.value;
    let password=event.target.password.value
    let response=await loginUserData(email,password)
    
    if (response.status===200){
        const cookieData = { access_token: response.data.access };
        // Set the cookie named 'data' with the cookieData object
        Cookies.set('data', JSON.stringify(cookieData), { expires: 1 });


      window.location.href='/'
    }
    else if (response.status === 401){
      alert('Invalid Email-Id or Password');
      setIsClicked(false);
    }
    else {
      console.log("User Login Failed");
      setIsClicked(false);
    }
    
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen dark:bg-[#121212]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full dark:bg-[#262626]">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6 dark:text-[#E0E0E0]">
          Login to Your Account
        </h2>
        <form method="post" onSubmit={handleLoginSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#B3B3B3]" >
              Your email
            </label>
            <input type="email" id="email" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] " placeholder="name@swiftbids.com" required />
          </div>
          <div className="mb-5 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#B3B3B3]" >
              Your password
            </label>
            <input type={passwordVisible ? "text" : "password"} id="password" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] " required />
            <i onClick={togglePasswordVisibility} className={`absolute top-10 right-3 text-gray-500 cursor-pointer dark:text-[#B3B3B3] ${ passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"}`}></i>
          </div>
          <div className="flex items-center mb-5">
            <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300" checked={termsAccepted} onChange={handleTermsChange} />
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-[#B3B3B3]"
            >
              I accept the{" "}
              <Link to="/terms" className="text-blue-600 hover:underline dark:text-[#6A6FFF] ">
                Terms and Conditions
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ${
              !termsAccepted | isClicked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!termsAccepted | isClicked}
          >
            {isClicked ? "Submitting..." : "Submit"}
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-6 dark:text-[#B3B3B3]">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-600 hover:underline  dark:text-[#6A6FFF] ">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
