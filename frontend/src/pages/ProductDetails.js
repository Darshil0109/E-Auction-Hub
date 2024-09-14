import React, {  useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { fetchTokenData, getCategoryNameById, getItemById, getUserById, isUserAuthenticated, placeAuctionBid, updateProductStatus } from '../services/apiServices';
import { Navigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const ProductDetails = () => {
    const {product_id} =useParams()
    const [product,setProducts] =useState([])
    const [timingProduct,setTimingProducts] =useState([])
    const [categoryName,setCategoryName] =useState('')
    const [sellerName,setSellerName] =useState('')
    const [winnerName,setWinnerName] =useState('')
    const [bidderName,setBidderName] =useState('')
    const [fetched, setFetched] = useState(false);
    const [timers, setTimers] = useState([]);
    
    useEffect(()=>{
        const getData = async () =>{
            const product = await getItemById(product_id)
            if (product.length!==0){
                
                
                const categoryName = await getCategoryNameById(product.category);
                const seller = await getUserById(product.seller);
                const winner = await getUserById(product.winner);
                const bidder = await getUserById(product.bidder);
                setProducts([product]);
                setTimingProducts([product]);
                setCategoryName(categoryName);
                setSellerName(seller.username);
                setWinnerName(winner.username);
                setBidderName(bidder.username);
            }
            setFetched(true)
        }
        getData()
        
    },[product_id])
    

    const changeStatus = async (product) => {
        const updatedData = await updateProductStatus(product);
        if (updatedData) {
            setTimingProducts(prevProducts => prevProducts.filter(value => value.id !== updatedData.id));
            setProducts([updatedData])
        }
    };
    useEffect(() => {
        
        if (timingProduct.length !== 0) {
            const updateTimers = () => {
                
                setTimers(timingProduct.map((value) => {
                    if (value.status === 'active'){
                        const endTime = new Date(value.end_time).getTime();
                        const now = new Date().getTime();
                        const timeDifference = endTime - now;
                        
                        if (timeDifference <= 0 && value.status === 'active') {
                            changeStatus(value);
                        }
                        return {
                            id: value.id,
                            timeLeft: timeDifference > 0 ? timeDifference : 0,
                        };
                    }
                    else{
                        return null
                    }
                    
                }));
            };
            updateTimers();
            if (timingProduct[0].status==='active'){
                
                const intervalId = setInterval(updateTimers, 1000);
                
                return () => clearInterval(intervalId);
            }
            
        }
    }, [timingProduct]);
    if (!isUserAuthenticated()) {
        return <Navigate to="/auth/login" />;
    }
    const formatTime = (timeLeft) => {
        const totalSeconds = Math.floor(timeLeft / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;

        return { days, hours, minutes, remainingSeconds };
    };
    const timer = timers[0]
    const { days, hours, minutes, remainingSeconds } = timer ? formatTime(timer.timeLeft) : { days: 0, hours: 0, minutes: 0, remainingSeconds: 0 };
    // ;
    
    const handleBid= async(e) =>{
        e.preventDefault()
        const c=window.confirm("You want to place Bid ? ")
        const token = localStorage.getItem("access_token");
        const user = fetchTokenData(token);
        if (c){
            const updated_Data= await placeAuctionBid(product[0],e.target.bidValue.value,user.user_id)
            setProducts([updated_Data])
        }
    }
    
    return (
        <>
            <Navbar links={['', 'about', 'services', 'help']} navs={['Home', 'About', 'Services', 'Help']} />
            
            
            {!fetched ? <></> :(product.length===0? (
                <div className='min-h-screen flex flex-col justify-center'>
                    <img src="/media/productnotfound.png" alt="product not found" className='mx-auto w-10/12 sm:w-1/2 md:w-1/3 max-w-full' />
                    <p className='text-7xl text-blue-800 font-bold text-center'>404 Not Found</p>
                </div>
            ) : (
                <div>
                    <div className='sm:grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-2 gap-4 w-11/12 lg:w-3/4 mx-auto mt-5'>
                        <div className="row-start-1 row-end-2  h-2/3 mx-auto sm:h-full">
                            <img src={product[0].image_url} alt="img" className=' md:h-full md:w-full'/>
                        </div>
                        <div className="grid row-start-2 row-end-5 sm:row-end-4 md:row-start-1 md:row-end-3 md:justify-evenly">
                            <div className='pt-5 px-7  box-border'>
                                <p className='text-xl sm:text-3xl font-semibold'>{product[0].title}</p>
                                <p className='mt-5 text-md'>{product[0].description}</p>
                                <div className='mt-5'>
                                    <p className='font-medium text-sm sm:text-xl'>Auction Ends in:</p>
                                    <div className='flex'>
                                        <div className='flex flex-col justify-center w-1/4'>
                                            <span className="text-xl sm:text-4xl font-medium mx-auto"> {days} </span>
                                            <span className='text-sm sm:text-xl font-sm sm:font-medium mx-auto'>Days</span>
                                        </div>
                                        <span className="text-xl sm:text-4xl font-medium mx-auto"> : </span>
                                        <div className='flex flex-col justify-center w-1/4'>
                                            <span className="text-xl sm:text-4xl font-medium mx-auto"> {hours} </span>
                                            <span className='text-sm sm:text-xl font-sm sm:font-medium mx-auto'>Hours</span>
                                        </div>
                                        <span className="text-xl sm:text-4xl sm:font-medium mx-auto"> : </span>
                                        <div className='flex flex-col justify-center w-1/4'>
                                            <span className="text-xl sm:text-4xl font-medium mx-auto"> {minutes} </span>
                                            <span className='text-sm sm:text-xl font-sm sm:font-medium mx-auto'>Minutes</span>
                                        </div>
                                        <span className="text-xl sm:text-4xl sm:font-medium mx-auto"> : </span>
                                        <div className='flex flex-col justify-center w-1/4'>
                                            <span className="text-xl sm:text-4xl font-medium mx-auto"> {remainingSeconds} </span>
                                            <span className='text-sm sm:text-xl font-sm sm:font-medium mx-auto'>Seconds</span>
                                        </div>
                                        
                                    </div> 
                                </div>
                                <div className='my-6 flex gap-3 items-center'>Starting Bid:<p className='sm:text-2xl sm:font-semibold line-through'>₹{product[0].starting_bid}</p></div>
                                <div className='my-2 flex gap-3 items-center'>Current Bid:<p className='sm:text-3xl sm:font-semibold '>₹{product[0].current_bid}</p></div>
                                {product[0].status !== 'active' ? (
                                    <></>
                                    ):(
                                        <form method="post" onSubmit={(e)=>handleBid(e)}>
                                            <label htmlFor="number-input" className="block mt-4 mb-2 text-sm font-black">Select Amount to Bid:</label>
                                            <input type="number" id="number-input" name='bidValue' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " defaultValue={Math.floor(Number(product[0].current_bid) + (Number(product[0].starting_bid) * 0.05))} min={Math.floor(Number(product[0].current_bid) + (Number(product[0].starting_bid) * 0.05))} required />
                                            <button type="submit" className='mt-5 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2' >Place Bid</button>
                                            
                                        </form>
                                    )
                                }
                                <div className="my-6 relative overflow-x-auto shadow-md sm:rounded-lg border">
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                        <tbody>
                                            <tr className="border-b border-gray-200">
                                                <td className="px-6 py-4 bg-gray-50">
                                                    Category
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {categoryName}
                                                </th>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="px-6 py-4 bg-gray-50">
                                                    Seller
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {sellerName}
                                                </th>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="px-6 py-4 bg-gray-50">
                                                    Auction Started At
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {product[0].created_at}
                                                </th>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="px-6 py-4 bg-gray-50">
                                                    Winner
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {winnerName ?  winnerName : 'N/A'}
                                                </th>
                                            </tr>
                                            <tr className="border-b border-gray-200">
                                                <td className="px-6 py-4 bg-gray-50">
                                                    Current Bidder
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {bidderName ?  bidderName : 'N/A'}
                                                </th>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>)
            )}
            <div className='row-start-3 row-end-4 col-start-1 col-end-3 mt-auto'>
                <Footer/>
            </div>
            
        </>
    )
}

export default ProductDetails
