import React, { useEffect, useState } from 'react';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [timers, setTimers] = useState([]);

    useEffect(() => {
        // Fetch only active items
        fetch('http://127.0.0.1:8000/api/items/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token f3a67b30d487c416704e01364c9772391247de90'
            }
        })
        .then(resp => resp.json())
        .then(resp => setProducts(resp.filter((value)=>value.status==='active')))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const updateTimers = () => {
                setTimers(products.map(product => {
                    const endTime = new Date(product.end_time).getTime();
                    const now = new Date().getTime();
                    const timeDifference = endTime - now;

                    // Update status if time is up
                    if (timeDifference <= 0 && product.status === 'active') {
                        updateProductStatus(product);
                    }

                    return {
                        id: product.id,
                        timeLeft: timeDifference > 0 ? timeDifference : 0
                    };
                }));
            };

            updateTimers(); // Initial call

            const intervalId = setInterval(updateTimers, 1000);

            return () => clearInterval(intervalId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                category: productValue.category, // Ensure this is the ID of the related Category object
                starting_bid: productValue.starting_bid,
                seller: productValue.seller, // Ensure this is the ID of the related Seller object
                created_at: productValue.created_at,
                end_time: productValue.end_time,
                winner: productValue.winner, // Ensure this is the ID of the related Winner object if it's a foreign key
                status: 'completed'
            })
        });
    
        if (response.ok) {
            setProducts(products.filter(product => productValue.id !== product.id)); // Remove the completed item from state
        } else {
            const errorText = await response.text(); // Get more details about the error
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
    

    return (
         
        <div className="flex flex-wrap w-3/4 h-50 mx-auto gap-3 justify-evenly">
            {
                products.map((product) => {
                    const timer = timers.find(t => t.id === product.id);
                    const { days, hours, minutes, remainingSeconds } = timer ? formatTime(timer.timeLeft) : { days: 0, hours: 0, minutes: 0, remainingSeconds: 0 };

                    return (
                     
                            
                       

            <div key={product.id}>
                <div class="card w-64 h-80 p-2 rounded-lg border border-gray-200 hover:border-orange-200 hover:cursor-pointer flex flex-col justify-evenly group">
                    <div class="relative overflow-hidden rounded-md h-48">
                        <div class="bg-white absolute bottom-2 left-1/2 transform -translate-x-1/2 flex  gap-2 p-1 rounded-md z-10 group-hover:invisible transition-all duration-200 ease-in-out">
                            <div class="text-2xl font-bold flex flex-col justify-center"><p>{days}</p><p class="text-gray-700 text-xs">days</p></div>:
                            <div class="text-2xl font-bold flex flex-col justify-center"><p>{hours}</p><p class="text-gray-700 text-xs">hour</p></div>:
                            <div class="text-2xl font-bold flex flex-col justify-center"><p>{minutes}</p> <p class="text-gray-700 text-xs">min</p></div>:
                            <div class="text-2xl font-bold flex flex-col justify-center"><p>{remainingSeconds}</p> <p class="text-gray-700 text-xs">sec</p></div>
                        </div>
                        <div class="icon">
                            <img src={product.image_url} alt="product" class="rounded-md group-hover:scale-110 transition-transform duration-300 w-full h-full object-contain"/>
                        </div>  
                    </div>
                    <p class="text-xl px-2 truncate font-semibold">{product.title}</p>
                    <div class="flex mt-2 justify-around">
                        <div>
                            <p class="text-sm font-bold opacity-40">Current bid at: </p>
                            <p class="text-2xl font-semibold">{product.starting_bid} ₹</p>
                        </div>
                        <button type="button" class="bg-gray-900 text-white h-10 w-28 rounded-md  group-hover:bg-orange-500 transition-all duration-300">View Auction</button>
                    </div>
                </div>
            </div>

                          
                    );
                })
            }
        </div>
    );
};


export default Products;
