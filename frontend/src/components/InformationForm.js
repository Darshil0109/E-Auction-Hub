import React ,{useEffect, useState} from 'react'
import { fetchAuctionCategory, fetchTokenData, getBidsById, getUserById, getUserInfoById, isUserAuthenticated } from '../services/apiServices';

import axios from 'axios';
const apiToken = process.env.REACT_APP_API_TOKEN;
const InformationForm = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userData, setUserData] = useState(null);
    const [fetched, setFetched] = useState(false);
    useEffect(() => {
        const getData = async () => {
          const token = localStorage.getItem("access_token");
          const user = fetchTokenData(token);
          const userinfo = await getUserInfoById(user.user_id);
          const data = await getUserById(user.user_id);
          setFetched(true);
          setUserData(data);
          setUserInfo(userinfo[0] || null); 
        };
    
        if (isUserAuthenticated()) {
          getData();
        }
    }, []);
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        const data = {
            "username" : e.target.username.value,
            "first_name" : e.target.first_name.value,
            "last_name" : e.target.last_name.value,
            "email" : e.target.email.value,
        }
        try {
            
            const response = await axios.post(
                `http://127.0.0.1:8000/api/userinfo/`,
                {
                  "user_id": userData.id,
                  "profileimage_url": e.target.profileimage_url.files[0],
                  "mobile": e.target.mobile.value,
                  "dateofbirth": e.target.dateofbirth.value,
                  "city": e.target.city.value,
                  "state": e.target.state.value,
                  "country": e.target.country.value,
                  "description": e.target.description.value,
                  "gender": e.target.gender.value,
                  "address": e.target.address.value,
                  "zipcode": e.target.zipcode.value,
                  "about_user": e.target.about_user.value,
                  "joining_date": userInfo.joining_date,
                },
                {
                    headers: {
                        'Authorization': `Token ${apiToken}`,
                        'Content-Type' : `multipart/form-data`
                    }
                }
            );
    
            const result = response.data; 
            console.log(result); 
        } catch (error) {
            console.error('Error updating user info:', error); // Improved error handling
        }
        
    }

  return (
    !fetched ? (<></>) : 
    (<div>
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
        Username
      </label>
      <input
        type="text"
        id="username"
        defaultValue={userData.username}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>
    <div className="mb-4">
      <label htmlFor="first_name" className="block text-gray-700 font-medium mb-2">
        Firstname
      </label>
      <input
        type="text"
        id="first_name"
        defaultValue={userData.first_name}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>
    <div className="mb-4">
      <label htmlFor="last_name" className="block text-gray-700 font-medium mb-2">
        Lastname
      </label>
      <input
        type="text"
        id="last_name"
        defaultValue={userData.last_name}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>
    
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
        Email
      </label>
      <input
        type="email"
        id="email"
        defaultValue={userData.email}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>
    
    

    <div className="mb-4">
        <label htmlFor="profileimage_url" className="block text-gray-700 font-medium mb-2">
            Profile Image
        </label>
        <input
            type="file"
            id="profileimage_url"
            name="profileimage_url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            accept="image/*"
            content='multipart/form-data'
        />
        </div>
    
    <div className="mb-4">
      <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
        Mobile
      </label>
      <input
        type="text"
        id="mobile"
        defaultValue={userInfo?.mobile}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>

    <div className="mb-4">
      <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
        Gender
      </label>
      <input
        type="text"
        id="gender"
        defaultValue={userInfo?.gender}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>
    <div className="mb-4">
      <label htmlFor="dateofbirth" className="block text-gray-700 font-medium mb-2">
        Date of Birth
      </label>
      <input
        type="text"
        id="dateofbirth"
        defaultValue={userInfo?.dateofbirth}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>

    <div className="mb-4">
      <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
        Address
      </label>
      <textarea
        id="address"
        rows="4"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        defaultValue={userInfo?.address}
        
      >
      </textarea>
    </div>

    <div className="mb-4">
      <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
        City
      </label>
      <input
        type="text"
        id="city"
        defaultValue={userInfo?.city}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>

    <div className="mb-4">
      <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
        State
      </label>
      <input
        type="text"
        id="state"
        defaultValue={userInfo?.state}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>

    <div className="mb-4">
      <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
        Country
      </label>
      <input
        type="text"
        id="country"
        defaultValue={userInfo?.country}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>

    <div className="mb-4">
      <label htmlFor="zipcode" className="block text-gray-700 font-medium mb-2">
        Zipcode
      </label>
      <input
        type="text"
        id="zipcode"
        defaultValue={userInfo?.zipcode}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      />
    </div>

    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
        Description
      </label>
      <textarea
        id="description"
        rows="4"
        defaultValue={userInfo?.description}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
        
      >
       
      </textarea>
    </div>

    <div className="mb-4">
      <label htmlFor="about_user" className="block text-gray-700 font-medium mb-2">
        About
      </label>
      <textarea
        id="about_user"
        rows="6"
        defaultValue={userInfo?.about_user}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        
      >
        
      </textarea>
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
)
  )
}

export default InformationForm
