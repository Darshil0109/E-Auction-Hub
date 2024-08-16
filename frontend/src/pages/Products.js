import React, { useEffect, useState } from 'react';
import './Products.css';
import Footer from '../components/Footer'
import Navbar2 from '../components/Navbar2';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [timers, setTimers] = useState([]);
    const [rangeValue,setRangeValue]= useState(-1)
    const [categories, setCategories] = useState([]);
    const [filteredProducts,setFilteredProducts] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/category/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token f3a67b30d487c416704e01364c9772391247de90',
            },
        })
        .then(resp => resp.json())
        .then(data => {
            setCategories(data);
        })
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/items/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token f3a67b30d487c416704e01364c9772391247de90'
            }
        })
        .then(resp => resp.json())
        .then(resp => {setProducts(resp.filter((value)=>value.status==='active'));})
        .catch(error => console.log(error));
    }, []);
    
    useEffect(() => {
        if (products.length > 0) {
            const updateTimers = () => {
                setTimers(products.map(product => {
                    const endTime = new Date(product.end_time).getTime();
                    const now = new Date().getTime();
                    const timeDifference = endTime - now;
                    
                    
                    if (timeDifference <= 0 && product.status === 'active') {
                        updateProductStatus(product);
                        
                    }
                    
                    return {
                        id: product.id,
                        timeLeft: timeDifference > 0 ? timeDifference : 0
                    };
                }));
            };
            
            updateTimers(); 
            
            const intervalId = setInterval(updateTimers, 1000);
            
            return () => clearInterval(intervalId);
        }
        
    }, [products]);

    const updateProductStatus = async (productValue) => {
        const url = `http://127.0.0.1:8000/api/items/${productValue.id}/`;
    
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: productValue.title,
                description: productValue.description,
                category: productValue.category, 
                starting_bid: productValue.starting_bid,
                current_bid: productValue.current_bid,
                seller: productValue.seller, 
                created_at: productValue.created_at,
                end_time: productValue.end_time,
                winner: productValue.winner,  
                status: 'completed'
            })
        });
    
        if (response.ok) {
            setProducts(products.filter(product => productValue.id !== product.id)); 
        } else {
            const errorText = await response.text(); 
            console.error('Failed to update status:', response.status, response.statusText, errorText);
        }
    };

    
    
    
    
    const formatTime = (timeLeft) => {
        const totalSeconds = Math.floor(timeLeft / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;
        
        return { days, hours, minutes, remainingSeconds };
    };
    
    useEffect(()=>{
        setFilteredProducts(products)
    },[products])
    
    
    function handleFilterSubmit(event) {
        event.preventDefault(); 
        
        
        let updatedProducts = [...products];
       
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Form submitted with data:', data);
        
        
        if (data.categoryselection !== 'None') {
            let filtered_category_id = categories.find(filterCategory => filterCategory.category === data.categoryselection).id;
            updatedProducts = updatedProducts.filter(product => product.category === filtered_category_id);
            console.log('filteredProducts in data.categoryselection', updatedProducts);
        }
        
       
        if (data.rangeofprice !== '-1') {
            let minRange = Number(data.rangeofprice);
            let maxRange = Number(data.rangeofprice) + 500;
            updatedProducts = updatedProducts.filter(product => product.current_bid >= minRange && product.current_bid <= maxRange);
        }
        
        
        if (data.auctiontimefilter) {
            let filteredSeconds = Number(data.auctiontimefilter.split(" ")[0]) * 60 * 60;
            
            updatedProducts = updatedProducts.filter(product => {
                let endTime = new Date(product.end_time).getTime();
                let now = new Date().getTime();
                let timeDifference = endTime - now;
                let productSecondsRemain = Math.floor(timeDifference / 1000);
                
                return data.auctiontimefilter.split(" ")[1] === '-' ? productSecondsRemain <= filteredSeconds : productSecondsRemain >= filteredSeconds;
            });
        }
        
       
        setFilteredProducts(updatedProducts);
        
        console.log("These are filtered products after applying filters", updatedProducts);
    }
    

    return (
         <>
        <Navbar2/>
        <hr />


            <div className='lg:flex justify-evenly'>  
                <form className='flex flex-col sm:mx-5 gap-5  mt-6  justify-evenly lg:justify-start' onSubmit={(e)=>{handleFilterSubmit(e,products)}} >
                        <div>
                        <div className='mb-5'><b>Filter</b></div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="categorymenu" className="block text-sm font-medium text-gray-800">Select a Category</label>
                            <select name="categoryselection" id="categorymenu" className="border border-gray-400 rounded h-10 pl-3 outline-none truncate" defaultValue="None">
                                <option value="None">None</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Antiques">Antiques</option>
                                <option value="Art & Collectibles">Art & Collectibles</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Cars & Vehicles">Vehicles</option>
                                <option value="Fashion & Accessories">Fashion</option>
                                <option value="Stamps">Stamps</option>
                                <option value="Photography & Cameras">Photography</option>
                            </select>

                        </div>
                    <hr className='hidden lg:block' />
                       <div className='mt-4'>
                            <label htmlFor="minmax-range" className="block mb-2 text-sm font-medium text-gray-800">Current Bid at range: </label>
                            <p >{rangeValue===-1 ? 'No range set': `${rangeValue} - ${(rangeValue+500)===10000 ? '10000+':(rangeValue+500)}` }</p>
                            
                                <input id="minmax-range" type="range" value={rangeValue} min={rangeValue===-1 ? '-1' : '0'} max="9500" name='rangeofprice' onChange={(e)=>{ setRangeValue(Number(e.target.value))}} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" style={{'--tw-shadow': 'none','--tw-shadow-color': 'rgba(0, 0, 0, 0.15)',}}/>
                                <hr />
                        </div> 
                    
                        <div id='auctiontimeleft' className='mt-6'>
                            <label htmlFor="auctiontimeleft" className="block mb-2 text-sm font-medium text-gray-800">Time Left in Auction:</label>
                            <div className='pl-3'>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" value="6 -"  name='auctiontimefilter' id='lessthan6' /><label htmlFor="lessthan6" className='hover:cursor-pointer'>Less than 6 Hours</label><br />
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" value="12 -" name='auctiontimefilter'  id='lessthan12' /><label htmlFor="lessthan12" className='hover:cursor-pointer'>Less than 12 Hours</label><br />
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" value="24 -" name='auctiontimefilter'  id='lessthan24' /><label htmlFor="lessthan24" className='hover:cursor-pointer'>Less than 24 Hours</label><br />
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" value="48 -" name='auctiontimefilter' id='lessthan48' /><label htmlFor="lessthan48" className='hover:cursor-pointer'>Less than 2 Days</label><br />
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" value="168 -" name='auctiontimefilter' id='lessthan168' /><label htmlFor="lessthan168" className='hover:cursor-pointer'>Less than 7 Days</label><br />
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" value="168 +" name='auctiontimefilter' id='morethan168' /><label htmlFor="morethan168" className='hover:cursor-pointer'>More than 7 Days</label><br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='flex flex-col'>
                            <input type="submit" value="Apply Filters"  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 mb-2" />
                        </div>

                    </div>
                    
                </form>
            <div className='hidden lg:block h-screen border-r border-gray-300'></div>
        <div className="flex flex-wrap grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-3  h-50 my-6  justify-items-center">
            {
                filteredProducts.map((product) => {
                    const timer = timers.find(t => t.id === product.id);
                    const { days, hours, minutes, remainingSeconds } = timer ? formatTime(timer.timeLeft) : { days: 0, hours: 0, minutes: 0, remainingSeconds: 0 };

                    return (

                    <div key={product.id}>
                        <div className="card w-64 md:w-56 lg:w-64 h-80 p-2 rounded-lg border border-gray-200 hover:border-orange-200 hover:cursor-pointer flex flex-col justify-evenly group">
                            <div className="relative overflow-hidden rounded-t-md h-48">
                                <div className="bg-white absolute bottom-2 left-1/2 transform -translate-x-1/2 flex  gap-2 p-1 rounded-md z-10 group-hover:invisible transition-all duration-200 ease-in-out">
                                    <div className="text-2xl font-bold flex flex-col justify-center"><p>{days}</p><p className="text-gray-700 text-xs">days</p></div>:
                                    <div className="text-2xl font-bold flex flex-col justify-center"><p>{hours}</p><p className="text-gray-700 text-xs">hour</p></div>:
                                    <div className="text-2xl font-bold flex flex-col justify-center"><p>{minutes}</p> <p className="text-gray-700 text-xs">min</p></div>:
                                    <div className="text-2xl font-bold flex flex-col justify-center"><p>{remainingSeconds}</p> <p className="text-gray-700 text-xs">sec</p></div>
                                </div>
                                <div className="icon">
                                    <img src={product.image_url} alt="product" className="rounded-t-md group-hover:scale-110 transition-transform duration-300 w-full h-full object-contain"/>
                                </div>  
                            </div>
                            <p className="text-xl px-2 truncate font-semibold">{product.title}</p>
                            <div className="flex mt-2 justify-around">
                                <div>
                                    <p className="text-sm md:text-xs lg:text-sm font-bold opacity-40">Current bid at: </p>
                                    <p className="text-2xl font-semibold">{product.starting_bid} ₹</p>
                                </div>
                                <button type="button" className="bg-gray-900 text-white h-10 w-28 rounded-md  group-hover:bg-orange-500 transition-all duration-300">View Auction</button>
                            </div>
                        </div>
                    </div>

                          
                    );
                })
            }
        </div>
        </div>
        
            <Footer/>
        
        </>
    );
};


export default Products;
