import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Products from './pages/Products';

const AuctionRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={< Landing />} />
                <Route path="/products" element={<Products/>} />
            </Routes>
        </Router>
    );
};

export default AuctionRoutes;
