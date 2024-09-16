import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Adjust the import according to your file structure
import { useEffect, useState } from 'react';
import { isUserAuthenticated, fetchTokenData, getUserInfoById, getUserById, getBidsById, getItemById, fetchAuctionCategory, getAuctions } from '../services/apiServices';

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
      var auctions = await getAuctions()
      auctions=auctions.sort((a, b) => new Date(b.end_time) - new Date(a.end_time))
      var soldAuctions=auctions.filter((value)=>{return value.seller===user.user_id}).slice(0,3);
      auctions=auctions.filter((value)=>{return value.winner===user.user_id}).slice(0,3);
      setAuctionsSold(soldAuctions)
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
    return category ? category.category : 'Unknown Category';
  };

  const getItemData = (id) => {
    const bidItems = items.find((value) => value.id === id);
    return bidItems || {};
  };

  const handleClick = () => {
    localStorage.removeItem('access_token');
  };

  if (!isUserAuthenticated()) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Navbar 
        links={['', 'products', 'services', 'help']} 
        navs={['Home', 'Auctions', 'Services', 'Help']} 
      />
      <div className="bg-gray-100 min-h-screen">
        <div className="p-2 w-full">
          <div className="md:flex no-wrap w-full justify-around">
            {/* Left Side */}
            <div className="w-full md:w-3/12 md:mx-2 mb-4 md:mb-0">
              {/* Profile Card */}
              <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-green-500">
                <div className="text-center my-2">
                  <img
                    className="h-32 w-32 rounded-full mx-auto"
                    src={userInfo && userInfo.profileimage_url ? userInfo.profileimage_url : './media/defaultuser.png'}
                    alt="Profile"
                  />
                </div>
                <div className="text-center mt-4">
                  <h1 className="text-2xl font-bold text-gray-900">@{userData?.username || 'User'}</h1>
                  <p className="mt-3 text-sm text-gray-500">
                    {userInfo?.description || 'No description available.'}
                  </p>
                </div>
                <ul className="bg-gray-50 mt-6 rounded-lg shadow-sm divide-y divide-gray-200">
                  <li className="flex justify-between items-center py-3 px-4 flex-col xl:flex-row">
                    <span className="text-gray-700">Member since</span>
                    <span className="text-gray-500">{userInfo?.joining_date || 'N/A'}</span>
                  </li>
                </ul>
              </div>
              {/* End of profile card */}
            </div>
            {/* Right Side */}
            <div className="w-full md:w-8/12 md:mx-2 flex flex-col justify-center">
              {/* About Section */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Details
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData?.first_name} {userData?.last_name}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Gender</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userInfo?.gender || 'N/A'}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData?.email}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Address</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userInfo?.city!=='N/A' || ''}{userInfo?.state!=='N/A' || ''}{userInfo?.country!=='N/A' || ''}{userInfo?.zipcode || 'N/A'}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">BirthDate</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userInfo?.dateofbirth || 'N/A'}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">About</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {userInfo?.about_user || 'No additional information available.'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              

              <div className="bg-white shadow overflow-x-auto  sm:rounded-lg mb-4 ">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Bid History</h3>
                  </div>
                  <div className="border-t border-gray-200">
                    <table className="border-t border-gray-200 min-w-full text-sm text-left text-gray-500 table-auto">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 ">Product name</th>
                          <th scope="col" className="px-4 py-3 text-center">Category</th>
                          <th scope="col" className="px-4 py-3 text-center">Bid Amount</th>
                          <th scope="col" className="px-4 py-3 text-center">Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userBids && userBids.length > 0 ? (
                          userBids.map((bid) => (
                            <tr key={bid.id} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{getItemData(bid.item_id).title}</td>
                              <td className="px-4 py-3 text-center ">{getCategoryName(getItemData(bid.item_id).category)}</td>
                              <td className="px-4 py-3 text-center">{bid.bid_amount}</td>
                              <td className="px-4 py-3 text-center">{bid.bid_time}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-4 py-3 text-center">No bids found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
              </div>
              <div className="bg-white shadow overflow-x-auto  sm:rounded-lg mb-4 ">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Auctions Won</h3>
                  </div>
                  <div className="border-t border-gray-200">
                    <table className="border-t border-gray-200 min-w-full text-sm text-left text-gray-500 table-auto">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 ">Product name</th>
                          <th scope="col" className="px-4 py-3 text-center">Category</th>
                          <th scope="col" className="px-4 py-3 text-center">Starting Amount</th>
                          <th scope="col" className="px-4 py-3 text-center">Final Amount</th>
                          <th scope="col" className="px-4 py-3 text-center">Date & Time</th>
                          <th scope="col" className="px-4 py-3 text-center">view Auction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auctionsWon && auctionsWon.length > 0 ? (
                          auctionsWon.map((item) => (
                            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{item.title}</td>
                              <td className="px-4 py-3 text-center ">{getCategoryName(item.category)}</td>
                              <td className="px-4 py-3 text-center">{item.starting_bid}</td>
                              <td className="px-4 py-3 text-center">{item.current_bid}</td>
                              <td className="px-4 py-3 text-center">{item.end_time}</td>
                              <td className="px-4 py-3 text-center"><a href={`products/${item.id}`}>View</a></td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-4 py-3 text-center">No Auctions won.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
              </div>
              <div className="bg-white shadow overflow-x-auto  sm:rounded-lg mb-4 ">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Auctioned Items </h3>
                  </div>
                  <div className="border-t border-gray-200">
                    <table className="border-t border-gray-200 min-w-full text-sm text-left text-gray-500 table-auto">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                          <th scope="col" className="px-4 py-3 ">Product name</th>
                          <th scope="col" className="px-4 py-3 text-center">Category</th>
                          <th scope="col" className="px-4 py-3 text-center">Current Bid</th>
                          <th scope="col" className="px-4 py-3 text-center">view Auction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {auctionsSold && auctionsSold.length > 0 ? (
                          auctionsSold.map((item) => (
                            <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{item.title}</td>
                              <td className="px-4 py-3 text-center ">{getCategoryName(item.category)}</td>
                              <td className="px-4 py-3 text-center">{(item.current_bid) ? item.current_bid: 'N/A'}</td>
                              
                              <td className="px-4 py-3 text-center"><a href={`products/${item.id}`}>View</a></td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="px-4 py-3 text-center">You haven't Added any items to be Auctioned</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
              </div>

              <div className="my-4"></div>
                <div className="flex justify-start mb-4 gap-3">
                    <a href='/'>
                      <button type="button" onClick={handleClick} className="h-12 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5">
                          Logout
                      </button>
                    </a>
                    <a href='profile/edit'>
                    <button type="button" className="h-12 focus:outline-none text-white bg-gray-800 hover:bg-gray-900  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 ">Edit Profile</button>
                    </a>
                    <a href='/createauction'>
                    <button type="button" className="h-12 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 ">Create Auction</button>
                    </a>
                </div>
              </div>
            </div>
        </div>
    </div>

      
    </>
  );
};

export default Profile;
