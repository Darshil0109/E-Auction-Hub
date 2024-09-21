import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust the import according to your file structure
import { useEffect, useState } from "react";
import {
  isUserAuthenticated,
  fetchTokenData,
  getUserInfoById,
  getUserById,
  getBidsById,
  getItemById,
  fetchAuctionCategory,
  getAuctions,
} from "../services/apiServices";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([]);
  const [userBids, setBids] = useState([]);
  const [categories, setCategories] = useState([]);
  const [auctionsWon, setAuctionsWon] = useState([]);
  const [auctionsSold, setAuctionsSold] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const token = localStorage.getItem("access_token");
      const user = fetchTokenData(token);
      const userinfo = await getUserInfoById(user.user_id);
      const data = await getUserById(user.user_id);
      const bids = await getBidsById(user.user_id);
      const categorydata = await fetchAuctionCategory();
      var auctions = await getAuctions();
      auctions = auctions.sort(
        (a, b) => new Date(b.end_time) - new Date(a.end_time)
      );
      var soldAuctions = auctions
        .filter((value) => {
          return value.seller === user.user_id;
        })
        .slice(0, 3);
      auctions = auctions
        .filter((value) => {
          return value.winner === user.user_id;
        })
        .slice(0, 3);
      setAuctionsSold(soldAuctions);
      setAuctionsWon(auctions);
      setCategories(categorydata);
      const items = await Promise.all(
        bids.map(async (bid) => {
          const item = await getItemById(bid.item_id);
          return item;
        })
      );
      setBids(bids);
      setItems(items);
      setUserData(data);
      setUserInfo(userinfo[0] || null); // Handle case when userinfo array is empty
    };

    if (isUserAuthenticated()) {
      getData();
    }
  }, []);

  const getCategoryName = (id) => {
    const category = categories.find((value) => value.id === id);
    return category ? category.category : "Unknown Category";
  };

  const getItemData = (id) => {
    const bidItems = items.find((value) => value.id === id);
    return bidItems || {};
  };

  const handleClick = () => {
    localStorage.removeItem("access_token");
  };

  if (!isUserAuthenticated()) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Navbar
        links={["", "products", "services", "help"]}
        navs={["Home", "Auctions", "Services", "Help"]}
      />
      <div className="bg-gray-100 min-h-screen dark:bg-[#121212]">
        <div className="p-2 w-full">
          <div className="md:flex no-wrap w-full justify-around">
            {/* Left Side */}
            <div className="w-full md:w-3/12 md:mx-2 mb-4 md:mb-0">
              {/* Profile Card */}
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500 dark:bg-[#262626]">
                <div className="text-center my-2">
                  <img
                    className="h-32 w-32 rounded-full mx-auto"
                    src={
                      userInfo && userInfo.profileimage_url
                        ? userInfo.profileimage_url
                        : "./media/defaultuser.png"
                    }
                    alt="Profile"
                  />
                </div>
                <div className="text-center mt-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-[#E0E0E0]">
                    @{userData?.username || ""}
                  </h1>
                  <p className="mt-3 text-sm text-gray-500 dark:text-[#B3B3B3]">
                    {userInfo?.description || "No description available."}
                  </p>
                </div>
                <ul className="bg-gray-50 mt-6 rounded-lg shadow-sm divide-y divide-gray-200 ">
                  <li className="flex justify-between items-center py-3 px-4 flex-col xl:flex-row dark:bg-[#333333] rounded ">
                    <span className="text-gray-700 dark:text-[#E0E0E0]">
                      Member since
                    </span>
                    <span className="text-gray-500 dark:text-[#B3B3B3]">
                      {userInfo?.joining_date || ""}
                    </span>
                  </li>
                </ul>
              </div>
              {/* End of profile card */}
            </div>
            {/* Right Side */}
            <div className="w-full md:w-8/12 md:mx-2 flex flex-col justify-center ">
              {/* About Section */}
              <div className="overflow-hidden shadow sm:rounded-lg mb-4">
                <div className="px-4 py-5 sm:px-6 bg-white dark:bg-[#262626]">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    User Details
                  </h3>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <tbody className="bg-white dark:bg-[#262626]">
                      <tr>
                        <th
                          scope="row"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Full name
                        </th>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {userData?.first_name } {userData?.last_name}
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-[#333]">
                        <th
                          scope="row"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Gender
                        </th>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {userInfo?.gender || "-"}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Email address
                        </th>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {userData?.email }
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-[#333]">
                        <th
                          scope="row"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          Address
                        </th>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {userInfo?.city !== "N/A" || ""}
                          {userInfo?.state !== "N/A" || ""}
                          {userInfo?.country !== "N/A" || ""}
                          {userInfo?.zipcode || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <th
                          scope="row"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          BirthDate
                        </th>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {userInfo?.dateofbirth || "N/A"}
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-[#333]">
                        <th
                          scope="row"
                          className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                        >
                          About
                        </th>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {userInfo?.about_user ||
                            "No additional information available."}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white dark:bg-[#262626] shadow overflow-x-auto  sm:rounded-lg mb-4 ">
                <div className="px-4 py-5 sm:px-6 dark:bg-[#262626]">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Bid History
                  </h3>
                </div>
                <div>
                  <table className="border-t border-gray-200 dark:border-none min-w-full text-sm text-left text-gray-500 table-auto">
                    <thead className="text-xs text-gray-700 dark:border-t dark:border-gray-700 uppercase bg-gray-50 dark:bg-[#262626]">
                      <tr>
                        <th scope="col" className="px-4 py-3 dark:text-white">
                          Product name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center dark:text-white"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center dark:text-white"
                        >
                          Bid Amount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center dark:text-white"
                        >
                          Date & Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userBids && userBids.length > 0 ? (
                        userBids.map((bid) => (
                          <tr
                            key={bid.id}
                            className="bg-white border-b hover:bg-gray-50 dark:hover:bg-[#444444] dark:even:bg-[#262626] odd:dark:bg-[#333333] dark:border-none"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-[#E0E0E0]">
                              {getItemData(bid.item_id).title}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-[#B3B3B3]">
                              {getCategoryName(
                                getItemData(bid.item_id).category
                              )}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-[#B3B3B3]">
                              {bid.bid_amount}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-[#B3B3B3]">
                              {bid.bid_time}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-3 text-center">
                            No bids found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white dark:bg-[#262626] shadow overflow-x-auto  sm:rounded-lg mb-4 ">
                <div className="px-4 py-5 sm:px-6 dark:bg-[#262626]">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Auctions Won
                  </h3>
                </div>

                <div>
                  <table className="border-t border-gray-200 dark:border-none min-w-full text-sm text-left text-gray-500 table-auto">
                    <thead className="text-xs text-gray-700 dark:border-t dark:border-gray-700  uppercase bg-gray-50 dark:bg-[#262626]">
                      <tr>
                        <th scope="col" className="px-4 py-3 dark:text-white">
                          Product name
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center dark:text-white"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center dark:text-white"
                        >
                          Starting Amount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center dark:text-white"
                        >
                          Final Amount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center dark:text-white"
                        >
                          Date & Time
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center dark:text-white"
                        >
                          view Auction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {auctionsWon && auctionsWon.length > 0 ? (
                        auctionsWon.map((item) => (
                          <tr
                            key={item.id}
                            className="bg-white border-b hover:bg-gray-50 dark:hover:bg-[#444444] dark:even:bg-[#262626] odd:dark:bg-[#333333] dark:border-none"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-[#E0E0E0]">
                              {item.title}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-[#B3B3B3]">
                              {getCategoryName(item.category)}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-[#B3B3B3]">
                              {item.starting_bid}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-[#B3B3B3]">
                              {item.current_bid}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-[#B3B3B3]">
                              {item.end_time}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-purple-400">
                              <Link to={`/products/${item.id}`}>View</Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-3 text-center">
                            No Auctions won.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-white dark:bg-[#262626] shadow overflow-x-auto  sm:rounded-lg mb-4 ">
                <div className="px-4 py-5 sm:px-6 dark:bg-[#262626]">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Auctioned Items{" "}
                  </h3>
                </div>
                <div>
                  <table className="border-t border-gray-200 dark:border-none min-w-full text-sm text-left text-gray-500 table-auto">
                    <thead className="text-xs text-gray-700 dark:border-t dark:border-gray-700  uppercase bg-gray-50 dark:bg-[#262626]">
                      <tr>
                        <th scope="col" className="px-4 py-3 dark:text-white">
                          Product name
                        </th>
                        <th scope="col" className="px-4 py-3 text-center dark:text-white">
                          Category
                        </th>
                        <th scope="col" className="px-4 py-3 text-center dark:text-white">
                          Current Bid
                        </th>
                        <th scope="col" className="px-4 py-3 text-center dark:text-white">
                          view Auction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {auctionsSold && auctionsSold.length > 0 ? (
                        auctionsSold.map((item) => (
                          <tr
                            key={item.id}
                            className="bg-white border-b hover:bg-gray-50 dark:hover:bg-[#444444] dark:even:bg-[#262626] odd:dark:bg-[#333333] dark:border-none"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-[#E0E0E0]">
                              {item.title}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-[#B3B3B3]">
                              {getCategoryName(item.category)}
                            </td>
                            <td className="px-4 py-3 text-center dark:text-[#B3B3B3]">
                              {item.current_bid ? item.current_bid : "N/A"}
                            </td>

                            <td className="px-4 py-3 text-center dark:text-purple-400">
                              <Link to={`/products/${item.id}`}>View</Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-3 text-center">
                            You haven't Added any items to be Auctioned
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="my-4"></div>
              <div className="flex justify-start mb-4 gap-3">
                <Link to="/">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="h-12 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Logout
                  </button>
                </Link>
                <Link to="/profile/edit">
                  <button
                    type="button"
                    className="h-12 focus:outline-none text-white bg-gray-800 hover:bg-gray-900  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-white  dark:hover:bg-gray-200 dark:text-gray-800 dark:border-gray-600"
                  >
                    Edit Profile
                  </button>
                </Link>
                <Link to="/createauction">
                  <button
                    type="button"
                    className="h-12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 "
                  >
                    Create Auction
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
