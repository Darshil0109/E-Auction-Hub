import React, { useState, useEffect,Suspense } from 'react';
import { fetchAuctionItems, fetchAuctionCategory, updateProductStatus, handleFilterSubmit} from '../services/apiServices';
import FilterForm from '../components/FilterForm';


import Footer from '../components/Footer';
import CardSkeleton from '../components/CardSkeleton';
import './Products.css';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Card = React.lazy(()=> import('../components/Card'));



const Products = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [timers, setTimers] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState({ categoryselection: 'None', rangeofprice: '-1' });
    
    const [fetched, setFetched] = useState(false);


    



    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchAuctionItems();
                const categorydata = await fetchAuctionCategory();
                if (categorydata.length !== 0 && data) {
                    
                    setProducts(data);
                    setCategory(categorydata);
                    setFilteredProducts(data);
                    setFetched(true);
                } else {
                    setFetched(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setFetched(true);
            }
        };
        loadData();
    }, []);
    useEffect(() => {
        if (fetched) {
            handleFilterSubmit(filterCriteria, products, category, updateFilterData);
        }
    }, [fetched, filterCriteria, products, category]);

    const updateFilterData = (updatedData) => {
        setFilteredProducts(updatedData);
    };

    const changeStatus = async (product) => {
        const updatedData = await updateProductStatus(product);
        if (updatedData) {
            setProducts(prevProducts => prevProducts.filter(value => value.id !== updatedData.id));
        }
    };

    
    
    useEffect(() => {
        if (products.length > 0) {
            const updateTimers = () => {
                setTimers(products.map((product) => {
                    const endTime = new Date(product.end_time).getTime();
                    const now = new Date().getTime();
                    const timeDifference = endTime - now;

                    if (timeDifference <= 0 && product.status === 'active') {
                        changeStatus(product);
                    }

                    return {
                        id: product.id,
                        timeLeft: timeDifference > 0 ? timeDifference : 0,
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

    const updateFilterCriteria = (criteria) => {
        setFilterCriteria(criteria);
    };

    
    
    return (
        <>
            <Navbar links={['', 'about', 'services', 'help']} navs={['Home', 'About', 'Services', 'Help']} />
            <div className='flex flex-col lg:flex-row justify-evenly items-center lg:items-start bg-[#f3f4f6] dark:bg-[#121212]'>
                <FilterForm products={products} categories={category} updateFilterData={updateFilterData} updateFilterCriteria={updateFilterCriteria} />
                {(fetched && filteredProducts.length === 0 ? (
                    <div className="border-l border-l-gray-500 flex w-full lg:w-4/5 h-screen justify-center items-center bg-gray-100">
                        <div className="flex flex-col items-center text-center">
                            <img src="./media/pagenotfound.png" alt="Product Not Found" className='h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96' />
                            <p className="text-lg md:text-xl lg:text-4xl font-semibold text-gray-800 mb-6 ">Product Not Found</p>
                            <Link to="/" className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out">
                                Go Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {filteredProducts.map((product) => {
                        const timer = timers.find(t => t.id === product.id);
                        const { days, hours, minutes, remainingSeconds } = timer ? formatTime(timer.timeLeft) : { days: 0, hours: 0, minutes: 0, remainingSeconds: 0 };

                        return (
                        <div key={product.id} className="w-full">
                            <Suspense fallback={<CardSkeleton key={product.id} />}>
                            <Card product={product} days={days} hours={hours} minutes={minutes} remainingSeconds={remainingSeconds} />
                            </Suspense>
                        </div>
                        );
                    })}
                    </div>

                ))}
            </div>
            <hr />
            <Footer />
        </>
    );
};
export default Products;
