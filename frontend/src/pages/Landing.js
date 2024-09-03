import React from 'react';

import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';


// import { jwtDecode } from 'jwt-decode';
const Landing = () => {
  
  return (
    <div className='bg-[#f3f4f6]'>
        <Navbar links={['products','about','services','help']} navs={['Auctions','About','Services','Help'] }/>
        <Hero/>
        <Footer/>
    </div>
  )
}

export default Landing