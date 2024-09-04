import React, { Suspense } from 'react';


const Footer = React.lazy(()=> import ('../components/Footer')) 
const Navbar = React.lazy(()=> import ('../components/Navbar')) 
const Hero = React.lazy(()=> import('../components/Hero'));

// import { jwtDecode } from 'jwt-decode';
const Landing = () => {
  
  return (
    <div className='bg-[#f3f4f6]'>
        <Suspense fallback = {<div> </div>}>
          <Navbar links={['products','about','services','help']} navs={['Auctions','About','Services','Help'] }/>
          <Hero/>
          <Footer/>
        </Suspense>
    </div>
  )
}

export default Landing