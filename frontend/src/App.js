import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Products from './pages/Products';
import About from './components/About';
import Services from './components/Services';
import HelpPage from './components/HelpPage';
import Login from './components/Login';
import Terms from './components/Terms';
import Signup from './components/Signup';


const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/help" element={<HelpPage />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/signup" element={<Signup />} />
                    <Route path="/terms" element={<Terms />} />
                    
                </Routes>
            </Router>
        
            
        </>
    );
};

export default App;
