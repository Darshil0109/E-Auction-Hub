import React, { useEffect, useState } from 'react';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [timers, setTimers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/items/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token f3a67b30d487c416704e01364c9772391247de90'
            }
        })
        .then(resp => resp.json())
        .then(resp => setProducts(resp))
        .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            const updateTimers = () => {
                setTimers(products.map(product => {
                    const endTime = new Date(product.end_time).getTime();
                    const now = new Date().getTime();
                    const timeDifference = endTime - now;

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
                        <div className="card" key={product.id}>
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
                                    <p className="current-bid-text">Current Bid at:<br /><span className='price-tag'>1,500$</span> </p>
                                    <button type="button" className="btn btn-primary view-auction-btn">View Auction</button>
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
