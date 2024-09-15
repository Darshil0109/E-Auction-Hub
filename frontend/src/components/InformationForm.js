import React ,{useEffect, useState} from 'react'
import { fetchTokenData,  getUserById, getUserInfoById, getUsernames, isUserAuthenticated } from '../services/apiServices';

import axios from 'axios';
import Navbar from './Navbar';
const apiToken = process.env.REACT_APP_API_TOKEN;
const InformationForm = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [userData, setUserData] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState('');
    const [usernames,setUsernames] = useState()
    

    useEffect(() => {
        const getData = async () => {
          const token = localStorage.getItem("access_token");
          const user = fetchTokenData(token);
          const userinfo = await getUserInfoById(user.user_id);
          const data = await getUserById(user.user_id);
          const fetchedUsernames = await getUsernames();
          setUsernames(fetchedUsernames);
          setFetched(true);
          setUserData(data);
          setUserInfo(userinfo[0] || null); 
        };
    
        if (isUserAuthenticated()) {
          getData();
        }
    }, []);
    
    const handleUsername = async(event)=>{
        let username=event.target.value.toLowerCase()

        if (username.indexOf(' ')!==-1){
            setUsernameMessage('Space Not allowed')
            
        }
        else if(username==='' || username === userData.username){
            setUsernameMessage('')
        }
        else{
            setUsernameMessage(((usernames.has(username)) ? 'Username Already Taken' : (/^[a-zA-Z0-9@._-]{3,20}$/.test(username) ?'Username is Valid':'Username is Invalid'))) 
        }
      }


    const handleSubmit = async (e) =>{
        e.preventDefault()  
        try {
          let zipcode = e.target.zipcode.value.trim()
          let username = e.target.username.value.trim()
          let email = e.target.email.value.trim()
          let mobile = e.target.mobile.value.trim()
          
          let validData = true

          if (usernameMessage !== 'Username is Valid' && userData.username !== username)
          {
            e.target.username.value=""
            validData=false
          }
          if (!(/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,}$/.test(email)))
          {
            e.target.email.value=""
            validData=false
          }
          if (!(/^\d{6}$/.test(zipcode)))
          {
            e.target.zipcode.value=""
            validData = false
          }
          if (!(/^\d{10}$/.test(mobile)))
          {
            e.target.mobile.value=""
            validData = false
          }
          if (validData){
              const userDataResponse=await axios.put(
              `http://127.0.0.1:8000/api/users/${userData.id}/`,
                  {
                    "username": e.target.username.value,
                    "first_name": e.target.first_name.value,
                    "last_name": e.target.last_name.value,
                    "email": e.target.email.value,
                },
                  {
                      headers: {
                          'Authorization': `Token ${apiToken}`,
                          'Content-Type' : `multipart/form-data`
                      }
                  }
              );
              const response = await axios.put(
                  `http://127.0.0.1:8000/api/userinfo/${userInfo.id}/`,
                  {
                    "user_id": userInfo.user_id,
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
              if (userDataResponse.status === 200 && response.status === 200) {
                window.location.href='/profile'
              }
            }
            else{
              alert("Invalid Data")
            }
          } catch (error) {
              console.error('Error updating user info:', error); // Improved error handling

          }
        
    }
  
  return (
    !fetched ? (<></>) : 
    (<div>
      <Navbar 
          links={['', 'products', 'services', 'help']} 
          navs={['Home', 'Auctions', 'Services', 'Help']} 
          />
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
                onChange={handleUsername}
                required
              />
              <p className={`text-sm font-medium ${((usernameMessage==='Username is Valid') ? ' text-green-400' : 'text-red-400')} `}>{usernameMessage}</p>
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
                required
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
                required
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
                required
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
                required
              />
            </div>

            <label htmlFor="Male" className="block text-gray-700 font-medium mb-2">
                Gender
            </label>
            <div className="mb-4 flex flex-col">
              <div className='flex gap-2 items-center'>
                <input
                  type="radio"
                  id="Male"
                  name = "gender"
                  value= "Male"
                  required
                  defaultChecked={userInfo ? userInfo.gender === "Male" : false}
                />
                <label htmlFor="Male" className="block text-gray-700 font-medium ">
                  Male
                </label>
              </div>
              <div className='flex gap-2 items-center'>
                <input
                  type="radio"
                  id="Female"
                  name = "gender"
                  value= "Female"
                  defaultChecked={userInfo ? userInfo.gender === "Female" : false}
                />
                <label htmlFor="Female" className="block text-gray-700 font-medium ">
                  Female
                </label>
              </div>
              <div className='flex gap-2 items-center'>
                <input
                  type="radio"
                  id="Others"
                  name = "gender"
                  value= "Others"
                  defaultChecked={userInfo ? userInfo.gender === "Others" : false}
                />
                <label htmlFor="Others" className="block text-gray-700 font-medium ">
                  Others
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="dateofbirth" className="block text-gray-700 font-medium mb-2">
                Date of Birth (Select Only From DatePicker)
              </label>
              
              <input
                type="date"
                id="dateofbirth"
                name="dateofbirth"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                max={new Date().toISOString().split('T')[0]}
                defaultValue ={userInfo?.dateofbirth}
                required
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
                required
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
                required
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
                required
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
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="zipcode" className="block text-gray-700 font-medium mb-2">
                Zipcode
              </label>
              <input
                type="number"
                id="zipcode"
                defaultValue={userInfo?.zipcode}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
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
                required
                
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
                required
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
