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
        const seconds = Math.floor(timeLeft / 1000);
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return { hours, minutes, remainingSeconds };
    };

    return (
        <div className='products'>
            {
                products.map((product) => {
                    const timer = timers.find(t => t.id === product.id);
                    const { hours, minutes, remainingSeconds } = timer ? formatTime(timer.timeLeft) : { hours: 0, minutes: 0, remainingSeconds: 0 };
                    return (
                        <div key={product.id}>
                            
                            
                            <div className="card">
                                <div className="card-image-section">
                                    <img src={product.image_url} alt="product" className="card-img" />
                                    <div className="countdown-timer">
                                        <CountdownTimer 
                                            hours={hours} 
                                            minutes={minutes} 
                                            seconds={remainingSeconds} 
                                        />
                                    </div>
                                </div>
                                <div className="card-text-section">
                                    <p className="card-title">
                                        {product.title}
                                    </p>
                                    <div className='bid-info'>
                                        <p className="current-bid-text">Current Bid at:<br /><span className='price-tag'>{product.starting_bid} ₹</span> </p>
                                        <button type="button" className="btn btn-primary view-auction-btn">View Auction</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

// Countdown Timer Component
const CountdownTimer = ({ hours, minutes, seconds }) => (
    <div className="countdown-timer">
        <div className="countdown-text">
            {hours}<p>Hour</p>
        </div>
        <div style={{ fontWeight: '800', alignContent: 'center' }}>:</div>
        <div className="countdown-text">
            {minutes}<p>Min</p>
        </div>
        <div style={{ fontWeight: '800', alignContent: 'center' }}>:</div>
        <div className="countdown-text">
            {seconds}<p>Sec</p>
        </div>
    </div>
);

export default Products;
