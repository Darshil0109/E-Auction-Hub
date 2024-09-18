import React, { useState } from "react";
import { loginUserData } from "../services/apiServices";
import { Link } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleTermsChange = (e) => {
    setTermsAccepted(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    let email=event.target.email.value;
    let password=event.target.password.value
    let response=await loginUserData(email,password)
    
    if (response.status===200){
      localStorage.setItem('access_token', response.data.access);
      window.location.href='/'
    }
    else if (response.status === 401){
      alert('Invalid Email-Id or Password');
    }
    else {
      console.log("User Login Failed");
    }
    
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Login to Your Account
        </h2>
        <form method="post" onSubmit={handleLoginSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900" >
              Your email
            </label>
            <input type="email" id="email" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@flowbite.com" required />
          </div>
          <div className="mb-5 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900" >
              Your password
            </label>
            <input type={passwordVisible ? "text" : "password"} id="password" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10" required />
            <i onClick={togglePasswordVisibility} className={`absolute top-10 right-3 text-gray-500 cursor-pointer ${ passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"}`}></i>
          </div>
          <div className="flex items-center mb-5">
            <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300" checked={termsAccepted} onChange={handleTermsChange} />
            <label
              htmlFor="terms"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              I accept the{" "}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
              !termsAccepted ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!termsAccepted}
          >
            Submit
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
