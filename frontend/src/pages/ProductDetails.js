import React from 'react'
import Navbar from '../components/Navbar'
import { isUserAuthenticated } from '../services/apiServices';
import { Navigate } from 'react-router-dom';
import Footer from '../components/Footer';

const ProductDetails = () => {
    
    if (!isUserAuthenticated()) {
        return <Navigate to="/auth/login" />;
    }
    
    return (
        <>
            <Navbar links={['', 'about', 'services', 'help']} navs={['Home', 'About', 'Services', 'Help']} />
            <div className='sm:grid grid-cols-1 md:grid-cols-2 grid-rows-3 md:grid-rows-2 gap-4 w-11/12 lg:w-3/4 mx-auto mt-5'>
                <div className="row-start-1 row-end-2  h-2/3 mx-auto sm:h-full">
                    <img src="/media/products/product1.jpg" alt="img" className=' md:h-full md:w-full'/>
                </div>
                <div className="grid row-start-2 row-end-5 sm:row-end-4 md:row-start-1 md:row-end-3 justify-evenly">
                    <div className='pt-5 px-7  box-border'>
                        <p className='text-xl sm:text-3xl font-semibold'>The Antique Clock</p>
                        <p className='mt-5 text-md'>This exquisite antique clock embodies the elegance and craftsmanship of a bygone era. Handcrafted with meticulous attention to detail, this piece features a beautifully ornate design that blends intricate carvings with classic aesthetics. The clock's rich, polished wood finish and delicate brass accents reflect its timeless charm and historical significance.</p>
                        <div className='mt-5'>
                            <p className='font-medium text-sm sm:text-xl'>Auction Ends in:</p>
                            <div className='flex'>
                                <div className='flex flex-col justify-center w-1/4'>
                                    <span className="text-xl sm:text-4xl font-medium mx-auto"> 2 </span>
                                    <span className='text-sm sm:text-xl font-sm sm:font-medium mx-auto'>Days</span>
                                </div>
                                <span className="text-xl sm:text-4xl font-medium mx-auto"> : </span>
                                <div className='flex flex-col justify-center w-1/4'>
                                    <span className="text-xl sm:text-4xl font-medium mx-auto"> 6 </span>
                                    <span className='text-sm sm:text-xl font-sm sm:font-medium mx-auto'>Hours</span>
                                </div>
                                <span className="text-xl sm:text-4xl sm:font-medium mx-auto"> : </span>
                                <div className='flex flex-col justify-center w-1/4'>
                                    <span className="text-xl sm:text-4xl font-medium mx-auto"> 44 </span>
                                    <span className='text-sm sm:text-xl font-sm sm:font-medium mx-auto'>Minutes</span>
                                </div>
                                <span className="text-xl sm:text-4xl sm:font-medium mx-auto"> : </span>
                                <div className='flex flex-col justify-center w-1/4'>
                                    <span className="text-xl sm:text-4xl font-medium mx-auto"> 22 </span>
                                    <span className='text-sm sm:text-xl font-sm sm:font-medium mx-auto'>Seconds</span>
                                </div>
                                
                            </div> 
                        </div>
                        <div className='my-6 flex gap-3 items-center'>Starting Bid:<p className='sm:text-2xl sm:font-semibold line-through'>1500$</p></div>
                        <div className='my-2 flex gap-3 items-center'>Current Bid:<p className='sm:text-3xl sm:font-semibold '>1600$</p></div>
                        <form method="post" >
                            <label htmlFor="number-input" className="block mt-4 mb-2 text-sm font-black">Select Amount to Bid:</label>
                            <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="90210" required />
                            <button type="button" className="mt-5 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ">Place Bid</button>
                        </form>
                        <div className="my-6 relative overflow-x-auto shadow-md sm:rounded-lg border">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-6 py-4 bg-gray-50">
                                            Category
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Antiques
                                        </th>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-6 py-4 bg-gray-50">
                                            Seller
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Darshil
                                        </th>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-6 py-4 bg-gray-50">
                                            Auction Started At
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            Sept. 13, 2024, 12:07 p.m
                                        </th>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="px-6 py-4 bg-gray-50">
                                            Winner
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            N/A
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <div className='row-start-3 row-end-4 col-start-1 col-end-3 mt-auto'>
                    <Footer/>
            </div>
        </>
    )
}

export default ProductDetails
