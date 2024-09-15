import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { fetchAuctionCategory, fetchTokenData, isUserAuthenticated, placeItemToAuction } from '../services/apiServices';
import { Navigate } from 'react-router-dom';

const ProductForm = () => {
    const [categoryData, setCategory] = useState([]);
    useEffect(()=>{
        const fetchData = async () =>{
            const categorydata = await fetchAuctionCategory();
            setCategory(categorydata)
        }
        if(isUserAuthenticated){
            fetchData()
        }
    },[])
    const [minTime, setMinTime] = useState("");

    useEffect(() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30);
        const futureTime = now.toTimeString().split(' ')[0].substring(0, 5);
        setMinTime(futureTime);
    }, []);
    if (!isUserAuthenticated()) {
        return <Navigate to="/auth/login" />;
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        const token = localStorage.getItem("access_token");
        const user = fetchTokenData(token);
        var title = e.target.title.value
        var description = e.target.description.value
        var category = e.target.category.value
        var image_url = e.target.image_url.files[0]
        var starting_bid =e.target.starting_bid.value
        var date = e.target.date.value
        var time = e.target.time.value
        if (category === 'defaultCategory'){
            alert("Please select a valid category!");
            return;
        }
        console.log(image_url);
        
        const dateTimeString = `${date}T${time}`;
        const isoString = new Date(dateTimeString).toISOString();
        const item={
            "title": title,
            "description":description,
            "category": category,
            "starting_bid": starting_bid,
            "image_url": image_url,
            "seller": 2,
            "end_time": isoString,
        }
        placeItemToAuction(item,user.user_id)
        
    }
  return (
    <div>
        <Navbar links={['', 'products', 'services', 'help']} navs={['Home', 'Auctions', 'Services', 'Help']} />
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg my-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Information</h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Product Title
              </label>
              <input
                type="text"
                id="title"
                name='title'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Product Description
              </label>
              <textarea
                rows={10}
                cols={300}
                name='description'
                id="description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                    Product's Category
                </label>
                <select id="category" name='category' defaultValue={'defaultCategory'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required>
                    <option value="defaultCategory" disabled>Choose a category</option>
                    {categoryData.length===0 ? 
                        (<></>):
                        (categoryData.map((itemcategory)=>{
                            return <option key={itemcategory.id} value={itemcategory.id}>{itemcategory.category}</option>
                        }))
                    }
                    
                    
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="starting_bid" className="block text-gray-700 font-medium mb-2">
                    Product's Starting Bid
                </label>
                <input
                type="number"
                id="starting_bid"
                name='starting_bid'
                min={1}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image_url" className="block text-gray-700 font-medium mb-2">
                    Product Image
                </label>
                <input
                    type="file"
                    id="image_url"
                    name="image_url"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    accept="image/*"
                    content='multipart/form-data'
                    required
                />
            </div>
            <div className="mb-4  justify-around gap-4">
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                    Auction Ending Date & Time
                </label>
                <div className='flex gap-2'>

                    <input
                        type="date"
                        id="date"
                        name="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                

                    <input
                        type="time"
                        id="time"
                        name="time"
                        min={minTime}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>  
            </div>
            <div className="mt-10 text-right">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none"
              >
                Add Product to Auction
              </button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default ProductForm
