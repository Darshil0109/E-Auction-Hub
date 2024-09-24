import React, { useEffect, useState } from "react";
import {
  fetchTokenData,
  getUserById,
  getUserInfoById,
  getUsernames,
  isUserAuthenticated,
} from "../services/apiServices";

import axios from "axios";
import Navbar from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const apiToken = process.env.REACT_APP_API_TOKEN;

// Information Form for More Information From user 
const InformationForm = () => {
  // to store more info of user
  const [userInfo, setUserInfo] = useState(null);
  // to store Basic info given by user at signup  
  const [userData, setUserData] = useState(null);
  // to check if all data is fetched or not
  const [fetched, setFetched] = useState(false);
  // to store the message like username exist or valid username at onChange event on username
  const [usernameMessage, setUsernameMessage] = useState("");
  // to store all usernames from database
  const [usernames, setUsernames] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const token = JSON.parse(Cookies.get('data') || '{}').access_token;
      const user = fetchTokenData(token);
      const userinfo = await getUserInfoById(user.user_id);
      const data = await getUserById(user.user_id);
      const fetchedUsernames = await getUsernames();
      setUsernames(fetchedUsernames);
      setFetched(true);
      setUserData(data);
      setUserInfo(userinfo[0] || null);
    };

    // if user is authenticated then get All data from database
    if (isUserAuthenticated()) {
      getData();
    }
  }, []);

  // return to /auth/login url endpoint if user is not authenticated
  if (!isUserAuthenticated()) {
    return <Navigate to="/auth/login" />;
  }
  // handle username while changing name
  const handleUsername = async (event) => {
    let username = event.target.value.toLowerCase();

    if (username.indexOf(" ") !== -1) {
      setUsernameMessage("Space Not allowed");
    } else if (username === "" || username === userData.username) {
      setUsernameMessage("");
    } else {
      setUsernameMessage(
        usernames.has(username)
          ? "Username Already Taken"
          : /^[a-zA-Z0-9@._-]{3,20}$/.test(username)
          ? "Username is Valid"
          : "Username is Invalid"
      );
    }
  };

  // to get all information of user from Information Form and change it by sending put request at database server
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let zipcode = e.target.zipcode.value.trim();
      let username = e.target.username.value.trim();
      let email = e.target.email.value.trim();
      let mobile = e.target.mobile.value.trim();

      let validData = true;

      if (
        usernameMessage !== "Username is Valid" &&
        userData.username !== username
      ) {
        e.target.username.value = "";
        validData = false;
      }
      if (!/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}$/.test(email)) {
        e.target.email.value = "";
        validData = false;
      }
      if (!/^\d{6}$/.test(zipcode)) {
        e.target.zipcode.value = "";
        validData = false;
      }
      if (!/^\d{10}$/.test(mobile)) {
        e.target.mobile.value = "";
        validData = false;
      }
      if (validData) {
        const userDataResponse = await axios.put(
          `http://127.0.0.1:8000/api/users/${userData.id}/`,
          {
            username: e.target.username.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
          },
          {
            headers: {
              Authorization: `Token ${apiToken}`,
              "Content-Type": `multipart/form-data`,
            },
          }
        );
        const response = await axios.put(
          `http://127.0.0.1:8000/api/userinfo/${userInfo.id}/`,
          {
            user_id: userInfo.user_id,
            profileimage_url: e.target.profileimage_url.files[0],
            mobile: e.target.mobile.value,
            dateofbirth: e.target.dateofbirth.value,
            city: e.target.city.value,
            state: e.target.state.value,
            country: e.target.country.value,
            description: e.target.description.value,
            gender: e.target.gender.value,
            address: e.target.address.value,
            zipcode: e.target.zipcode.value,
            about_user: e.target.about_user.value,
            joining_date: userInfo.joining_date,
          },
          {
            headers: {
              Authorization: `Token ${apiToken}`,
              "Content-Type": `multipart/form-data`,
            },
          }
        );
        if (userDataResponse.status === 200 && response.status === 200) {
          navigate("/profile");
        }
      } else {
        alert("Invalid Data");
      }
    } catch (error) {
      console.error("Error updating user info:", error); // Improved error handling
    }
  };

  // if data is fetched then show Form
  return !fetched ? (
    <></>
  ) : (
    <div className="dark:bg-[#121212]">
      <Navbar
        links={["", "products", "services", "help"]}
        navs={["Home", "Auctions", "Services", "Help"]}
      />
      <div className="max-w-2xl my-6 mx-auto bg-white px-8 pt-4 pb-8 shadow-md rounded-lg dark:bg-[#262626]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-[#E0E0E0]">
          Profile Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              defaultValue={userData.username}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              onChange={handleUsername}
              required
            />
            <p
              className={`text-sm font-medium ${
                usernameMessage === "Username is Valid"
                  ? " text-green-400"
                  : "text-red-400"
              } `}
            >
              {usernameMessage}
            </p>
          </div>
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Firstname
            </label>
            <input
              type="text"
              id="first_name"
              defaultValue={userData.first_name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Lastname
            </label>
            <input
              type="text"
              id="last_name"
              defaultValue={userData.last_name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={userData.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="profileimage_url"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Profile Image
            </label>
            <input
              type="file"
              id="profileimage_url"
              name="profileimage_url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              accept="image/*"
              content="multipart/form-data"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              defaultValue={userInfo?.mobile}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            />
          </div>

          <label
            htmlFor="Male"
            className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
          >
            Gender
          </label>
          <div className="mb-4 flex flex-col">
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="Male"
                name="gender"
                value="Male"
                required
                defaultChecked={userInfo ? userInfo.gender === "Male" : false}
              />
              <label
                htmlFor="Male"
                className="block text-gray-700 font-medium dark:text-[#E0E0E0]"
              >
                Male
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="Female"
                name="gender"
                value="Female"
                defaultChecked={userInfo ? userInfo.gender === "Female" : false}
              />
              <label
                htmlFor="Female"
                className="block text-gray-700 font-medium dark:text-[#E0E0E0]"
              >
                Female
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                id="Others"
                name="gender"
                value="Others"
                defaultChecked={userInfo ? userInfo.gender === "Others" : false}
              />
              <label
                htmlFor="Others"
                className="block text-gray-700 font-medium dark:text-[#E0E0E0]"
              >
                Others
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="dateofbirth"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Date of Birth (Select Only From DatePicker)
            </label>

            <input
              type="date"
              id="dateofbirth"
              name="dateofbirth"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] dark:[color-scheme:dark]"
              max={new Date().toISOString().split("T")[0]}
              defaultValue={userInfo?.dateofbirth}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Address
            </label>
            <textarea
              id="address"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              defaultValue={userInfo?.address}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              defaultValue={userInfo?.city}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              defaultValue={userInfo?.state}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              defaultValue={userInfo?.country}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="zipcode"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Zipcode
            </label>
            <input
              type="number"
              id="zipcode"
              defaultValue={userInfo?.zipcode}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              defaultValue={userInfo?.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="about_user"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              About
            </label>
            <textarea
              id="about_user"
              rows="6"
              defaultValue={userInfo?.about_user}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] "
              required
            ></textarea>
          </div>

          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InformationForm;
