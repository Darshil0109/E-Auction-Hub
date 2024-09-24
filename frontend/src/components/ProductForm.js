import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
  fetchAuctionCategory,
  fetchTokenData,
  isUserAuthenticated,
  placeItemToAuction,
} from "../services/apiServices";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

// Form to Add Own Products for auction
const ProductForm = () => {
  const [categoryData, setCategory] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const categorydata = await fetchAuctionCategory();
      setCategory(categorydata);
    };
    if (isUserAuthenticated) {
      fetchData();
    }
  }, []);
  if (!isUserAuthenticated()) {
    return <Navigate to="/auth/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get Data from token stored inside cookie
    const token = JSON.parse(Cookies.get('data') || '{}').access_token;
    const user = fetchTokenData(token);
    var title = e.target.title.value;
    var description = e.target.description.value;
    var category = e.target.category.value;
    var image_url = e.target.image_url.files[0];
    var starting_bid = e.target.starting_bid.value;
    var date = e.target.date.value;
    var time = e.target.time.value;
    // validate category selection
    if (category === "defaultCategory") {
      alert("Please select a valid category!");
      return;
    }
    const dateTimeString = `${date}T${time}`;
    const isoString = new Date(dateTimeString).toISOString();
    var currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 30);
    currentDate = currentDate.toISOString();
    if (currentDate > isoString) {
      alert("Minimum time should be 30 minutes for auction");
    } else {
      const item = {
        title: title,
        description: description,
        category: category,
        starting_bid: starting_bid,
        image_url: image_url,
        seller: 2,
        end_time: isoString,
      };
      const data = await placeItemToAuction(item, user.user_id);
      if (data.length > 0) {
        alert("Product Added");
        navigate("/products");
      }
    }
  };
  return (
    <div className="dark:bg-[#121212]">
      <Navbar
        links={["", "products", "services", "help"]}
        navs={["Home", "Auctions", "Services", "Help"]}
      />
      <div className="max-w-2xl mx-3 mt-8 sm:mx-auto bg-white p-4 shadow-md rounded-lg dark:bg-[#262626]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 dark:text-[#E0E0E0]">
          Product Information
        </h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Product Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0]"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Product Description
            </label>
            <textarea
              rows={10}
              cols={300}
              name="description"
              id="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0]"
              required
            ></textarea>
          </div>
          <div className="sm:flex justify-around gap-2">

            <div className="mb-4 sm:w-1/2">
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
              >
                Product's Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={"defaultCategory"}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#2C2C2C] dark:text-[#E0E0E0]"
                required
              >
                <option value="defaultCategory" disabled>
                  Choose a category
                </option>
                {categoryData.length === 0 ? (
                  <></>
                ) : (
                  categoryData.map((itemcategory) => {
                    return (
                      <option key={itemcategory.id} value={itemcategory.id}>
                        {itemcategory.category}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
            <div className="mb-4 sm:w-1/2">
              <label
                htmlFor="starting_bid"
                className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0] "
              >
                Product's Starting Bid
              </label>
              <input
                type="number"
                id="starting_bid"
                name="starting_bid"
                min={1}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0]"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image_url"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Product Image
            </label>
            <input
              type="file"
              id="image_url"
              name="image_url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0]"
              accept="image/*"
              content="multipart/form-data"
              required
            />
          </div>
          <div className="mb-4  justify-around gap-4">
            <label
              htmlFor="date"
              className="block text-gray-700 font-medium mb-2 dark:text-[#E0E0E0]"
            >
              Auction Ending Date & Time
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                id="date"
                name="date"
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] dark:[color-scheme:dark]"
                required
              />

              <input
                type="time"
                id="time"
                name="time"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-[#2C2C2C] dark:text-[#E0E0E0] dark:[color-scheme:dark]"
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
  );
};

export default ProductForm;
