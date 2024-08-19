import React, { useState, useEffect ,useCallback } from 'react';
import { fetchAuctionItems,fetchAuctionCategory,updateProductStatus, handleFilterSubmit } from '../services/apiServices';
import FilterForm from '../components/FilterForm';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import CardSkeleton from '../components/CardSkeleton';



const Productspage2 = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [filteredproducts, setFilteredProducts] = useState([]);
    const [timers, setTimers] = useState([]);
    const [filterCriteria,setFilterCriteria] = useState({categoryselection: 'None', rangeofprice: '-1'})
    const [loading, setLoading] = useState(true);
    const [fetched, setFetched] = useState(false);
    // useEffect for Load data when ever state changed
    useEffect(() => {
        const loadData = async () => {
            try {
                const data=await fetchAuctionItems()
                const categorydata=await fetchAuctionCategory()
                if (categorydata.length !== 0  && data.length !==0){
                    setProducts(data)
                    setCategory(categorydata)
    
                }
                setFetched(true)
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false); // End loading
              }
        };
        loadData();
    }, []);

    useEffect(()=>{
        // console.log("filterProduct changed");
        setFilteredProducts(products)
        handleFilterSubmit(filterCriteria,products,category,updateFilterData)
        
    },[products,filterCriteria,category]);

    // console.log("Products: ",products)
    const updateFilterData=(updatedData)=>{
        setFilteredProducts(updatedData)
        
    }
    
    
    const changeStatus=async(product)=>{
        if (products.length !==0){
            const updatedData=await updateProductStatus(product);
            if (updatedData){
                setProducts(products.filter((p)=>{
                    return (p.id !== updatedData.id) 
                }))
            }
        }
    }
    useEffect(() => {
        if (products.length > 0) {
            const updateTimers = () => {
                setTimers(products.map(product => {
                    const endTime = new Date(product.end_time).getTime();
                    const now = new Date().getTime();
                    const timeDifference = endTime - now;
                    
                    
                    if (timeDifference <= 0 && product.status === 'active') {
                        changeStatus(product);
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

    

    const formatTime = (timeLeft) => {
        const totalSeconds = Math.floor(timeLeft / 1000);
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;
        
        return { days, hours, minutes, remainingSeconds };
    };

    const updateFilterCriteria=(criteria)=>{
        // console.log("Criteria changed to ",criteria);
        
        setFilterCriteria(criteria)
    }

    
      
    return (
        
    <>
        <Navbar2 links={['','about','services','help']} navs={['Home','About','Services','Help']}/>
        
        <div className='flex flex-col lg:flex-row justify-evenly items-center lg:items-start bg-[#f3f4f6]'>  
            <FilterForm products={products} categories={category} updateFilterData={updateFilterData} updateFilterCriteria={updateFilterCriteria}/>
            
                {loading ? (
                    [1,2,3,4].map((value)=>{
                       return <CardSkeleton/>
                    })
                    
                ) :(fetched && filteredproducts.length === 0 ? (
                    <div className="border-l border-l-gray-500 flex w-full lg:w-4/5 h-screen justify-center items-center bg-gray-100">
                        <div className="flex flex-col items-center text-center">
                        <img src="./media/pagenotfound.png" alt="Product Not Found" className='h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96' />
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-700">404</h1>
                        <p className="text-lg md:text-xl lg:text-2xl font-medium text-gray-600 mb-6">Product Not Found</p>
                        <a href="/" className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
                            Go Home
                        </a>
                        </div>
                    </div>
                    ) : (
                    <div className="border-l border-l-gray-500 w-full lg:w-4/5 min-h-screen px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-3 justify-items-center">
                        {filteredproducts.map((product) => {
                            const timer = timers.find(t => t.id === product.id);
                            const { days, hours, minutes, remainingSeconds } = timer ? formatTime(timer.timeLeft) : { days: 0, hours: 0, minutes: 0, remainingSeconds: 0 };

                            return (
                                <div key={product.id} className="w-full md:w-64 ">
                                    <div className="card h-80 bg-white p-2 rounded-lg border border-gray-200 hover:border-orange-200 hover:cursor-pointer flex flex-col justify-evenly group">
                                        <div className="relative overflow-hidden rounded-t-md h-48">
                                            <div className="bg-white absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 p-1 rounded-md z-10 group-hover:invisible transition-all duration-200 ease-in-out">
                                                <div className="text-lg md:text-2xl font-bold flex flex-col justify-center">
                                                    <p>{days}</p>
                                                    <p className="text-gray-700 text-xs">days</p>
                                                </div>:
                                                <div className="text-lg md:text-2xl font-bold flex flex-col justify-center">
                                                    <p>{hours}</p>
                                                    <p className="text-gray-700 text-xs">hour</p>
                                                </div>:
                                                <div className="text-lg md:text-2xl font-bold flex flex-col justify-center">
                                                    <p>{minutes}</p>
                                                    <p className="text-gray-700 text-xs">min</p>
                                                </div>:
                                                <div className="text-lg md:text-2xl font-bold flex flex-col justify-center">
                                                    <p>{remainingSeconds}</p>
                                                    <p className="text-gray-700 text-xs">sec</p>
                                                </div>
                                            </div>
                                            <div className="icon">
                                                <img src={product.image_url} alt="product" className="rounded-t-md group-hover:scale-110 transition-transform duration-300 w-full h-full object-contain"/>
                                            </div>  
                                        </div>
                                        <p className="text-lg md:text-xl px-2 truncate font-semibold">{product.title}</p>
                                        <div className="flex mt-2 justify-around">
                                            <div>
                                                <p className="text-sm md:text-xs lg:text-sm font-bold opacity-40">Current bid at: </p>
                                                <p className="text-2xl font-semibold">{product.starting_bid} ₹</p>
                                            </div>
                                            <button type="button" className="bg-gray-900 text-white h-10 w-28 rounded-md group-hover:bg-orange-500 transition-all duration-300">
                                                View Auction
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            ))}
        </div>
        <hr />
        <Footer/>
    </>
);

            
    
    
};

export default Productspage2;
