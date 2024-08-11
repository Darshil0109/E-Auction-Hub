import React, { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen,setMenu]=useState(false)
  console.log(isMenuOpen)
  return (
    <>
      <div className="h-32 md:h-20  w-screen bg-dark-subtle-400 sticky flex justify-between px-8 py-3 items-center  z-50">
      <div className="md:h-16 md:w-16 h-20 w-20" >
        <img src="./media/logo.png" alt="logo"/>
      </div>
    
      <ul className="md:flex items-center justify-content-evenly gap-5 hidden">
        <li><a className="hover:text-gray-700 font-semibold" href="/products">Auctions</a></li>
        <li className="hover:text-gray-700 font-semibold"><a href="/">About</a></li>
        <li className="hover:text-gray-700 font-semibold"><a href="/">Help</a></li>
        <li className="hover:text-gray-700 font-semibold"><a href="/">Contact</a></li>
      </ul>
      
      <div className="flex gap-8 items-center">
        <button className="items-center bg-orange-500 text-white h-10 w-24 rounded hover:bg-orange-600  md:flex hidden gap-0.5 justify-between p-2 " type="button"><span className="font-medium text-white">sign up</span> <i className="fas fa-thin fa-right-to-bracket text-white "
          aria-hidden="true"></i>
        </button>
        <button className="md:hidden items-center md:h-10 md:w-10 h-15 w-15" onClick={()=>{setMenu(!isMenuOpen)}} >
          {isMenuOpen ? <i class="fas fa-solid fa-x text-4xl"></i> : <i className="fas fa-solid fa-bars text-4xl"></i>}
          
          
        </button>
      </div>

    </div>
     <div className={`md:hidden w-full h-full  absolute flex flex-col  justify-around ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out z-10`}>
      <ul className="flex flex-col items-center justify-content-evenly gap-5 top-30">
        <li><a className="hover:text-gray-700 font-semibold text-4xl" href="/">Auctions</a></li>
        <li className="hover:text-gray-700 font-semibold text-4xl"><a href="/">About</a></li>
        <li className="hover:text-gray-700 font-semibold text-4xl"><a  href="/">Help</a></li>
        <li className="hover:text-gray-700 font-semibold text-4xl"><a  href="/">Contact</a></li>
      </ul>
      <div className="flex justify-center">
        <button className="items-center bg-orange-500 text-white h-20 w-5/12 rounded hover:bg-orange-600 flex gap-0.5 p-2 justify-evenly" type="button"><span className="font-medium text-3xl text-white">sign up</span> <i className="fas fa-thin fa-right-to-bracket text-white text-3xl"
        aria-hidden="true"></i>
        </button>

      </div>
      
    
    </div>
    
    </>
  )
}

export default Navbar