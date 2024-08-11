import React, { useState ,useEffect} from 'react'

const Navbar = () => {
  const [isMenuOpen,setMenu]=useState(false)
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);
  return (
      <div style={{
        fontFamily: "Roboto",
    }}>
        <div className="h-34 sm:h-30 md:h-28 lg:h-26  w-screen bg-dark-subtle-400 sticky flex justify-between px-8 py-3 items-center  z-50">
        <div className="h-20 w-20 sm:h-26 sm:w-26 md:h-24 md:w-24 lg:h-22 lg:w-22" >
          <img src="./media/logo.png" alt="logo"/>
        </div>
      
        <ul className="md:flex items-center justify-content-evenly gap-5 hidden">
          <li ><a className="hover:text-gray-700 font-bold md:text-3xl  lg:text-2xl" href="/products">Auctions</a></li>
          <li ><a className="hover:text-gray-700 font-bold md:text-3xl lg:text-2xl" href="/about">About</a></li>
          <li ><a className="hover:text-gray-700 font-bold md:text-3xl lg:text-2xl" href="/help">Help</a></li>
          <li ><a className="hover:text-gray-700 font-bold md:text-3xl lg:text-2xl" href="/contact">Contact</a></li>
        </ul>
        
        <div className="flex gap-8 items-center">
          <button className="md:h-22 md:w-46 lg:h-14 lg:w-32 md:flex hidden items-center bg-orange-500 text-white  rounded hover:bg-orange-600  gap-0.5 md:gap-4 lg:gap-1 justify-evenly p-2 " type="button"><span className="md:text-2xl lg:text-xl font-medium text-white text-center">sign up</span> <i className="fas fa-thin fa-right-to-bracket text-white md:text-2xl lg:text-xl lg:block hidden"
            aria-hidden="true"></i>
          </button>
          {/* bar button */}
          <button className="md:hidden items-center md:h-10 md:w-10 h-15 w-15" onClick={()=>{setMenu(!isMenuOpen)}} >
            {isMenuOpen ? <i class="fas fa-solid fa-x text-4xl"></i> : <i className="fas fa-solid fa-bars text-4xl"></i>}  
          </button>
        </div>

      </div>
      <div style={{backgroundColor:'#FFFCF2'}} className={`md:hidden w-full h-full  absolute flex flex-col  justify-around ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out z-10`}>
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
    
    </div>
  )
}

export default Navbar