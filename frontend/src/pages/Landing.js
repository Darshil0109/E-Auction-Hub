import React from 'react'
import Navbar2 from '../components/Navbar2'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const Landing = () => {
  return (
    <div className='bg-[#f3f4f6]'>
        <Navbar2 links={['products','about','services','help']} navs={['Auctions','About','Services','Help']}/>
        <Hero/>
        <Footer/>
    </div>
  )
}

export default Landing