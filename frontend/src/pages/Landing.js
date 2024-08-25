import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/Navbar2'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
// import { jwtDecode } from 'jwt-decode';
const Landing = () => {
  const [isAuthenticated,setAuthenticated]=useState(false)
  const token = localStorage.getItem('access_token');
  useEffect(()=>{
    
    const getToken=()=>{
        if (token) {
            try {
              // Decode the token
              // const decodedToken = jwtDecode(token);
              setAuthenticated(true)
              
            } catch (error) {
              console.error('Error decoding token:', error);
            }
          } else {
            setAuthenticated(false)
          }
    }
    getToken()
  },[token])
  return (
    <div className='bg-[#f3f4f6]'>
        <Navbar2 links={['products','about','services','help']} navs={['Auctions','About','Services','Help'] } isAuthenticated={isAuthenticated}/>
        <Hero/>
        <Footer/>
    </div>
  )
}

export default Landing