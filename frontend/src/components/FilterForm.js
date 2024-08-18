import React, { useState } from 'react';
import { handleFilterSubmit } from '../services/apiServices';

const FilterForm = (props) => {
    const [rangeValue, setRangeValue] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const formData = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        props.updateFilterCriteria(data);
        handleFilterSubmit(data, props.products, props.categories, props.updateFilterData);
    };

    return (
        <div className='border-r-2 border-r-gray-500 w-full lg:w-1/5'>
            {/* Toggle Button for screens <1024px */}
            <button 
                onClick={toggleMenu}
                className="lg:hidden w-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none font-medium rounded-md text-xs px-3 py-1.5 mb-4"
            >
                {isOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {/* Full Menu for screens >=1024px */}
            <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
                <form 
                    className='flex flex-col lg:flex-col sm:mx-5 gap-5 mt-6 lg:justify-start' 
                    onSubmit={(e) => { formData(e); }}
                >
                    <div className='mb-5 text-lg font-semibold'>Filter</div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="categorymenu" className="block text-sm font-medium text-gray-800">Select a Category</label>
                        <select 
                            name="categoryselection" 
                            id="categorymenu" 
                            className="border border-gray-400 rounded h-10 pl-3 outline-none truncate" 
                            defaultValue="None"
                        >
                            <option value="None">None</option>
                            <option value="Furniture">Furniture</option>
                            <option value="Antiques">Antiques</option>
                            <option value="Art & Collectibles">Art & Collectibles</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Cars & Vehicles">Vehicles</option>
                            <option value="Fashion & Accessories">Fashion</option>
                            <option value="Stamps">Stamps</option>
                            <option value="Photography & Cameras">Photography</option>
                        </select>
                    </div>
                    <hr className='hidden lg:block' />
                    <div className='mt-4'>
                        <label htmlFor="minmax-range" className="block mb-2 text-sm font-medium text-gray-800">Current Bid at range: </label>
                        <p>
                            {rangeValue === -1 ? 'No range set' : `${rangeValue} - ${(rangeValue + 500) === 10000 ? '10000+' : (rangeValue + 500)}`}
                        </p>
                        <input 
                            id="minmax-range" 
                            type="range" 
                            value={rangeValue} 
                            min={rangeValue === -1 ? '-1' : '0'} 
                            max="9500" 
                            name='rangeofprice' 
                            onChange={(e) => { setRangeValue(Number(e.target.value)) }} 
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <hr />
                    </div>
                    <div id='auctiontimeleft' className='mt-6'>
                        <label htmlFor="auctiontimeleft" className="block mb-2 text-sm font-medium text-gray-800">Time Left in Auction:</label>
                        <div className='pl-3'>
                            <div className='flex flex-col gap-2'>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" value="None" name='auctiontimefilter' id='None' />
                                    None
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" value="6 -" name='auctiontimefilter' id='lessthan6' />
                                    Less than 6 Hours
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" value="12 -" name='auctiontimefilter' id='lessthan12' />
                                    Less than 12 Hours
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" value="24 -" name='auctiontimefilter' id='lessthan24' />
                                    Less than 24 Hours
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" value="48 -" name='auctiontimefilter' id='lessthan48' />
                                    Less than 2 Days
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" value="168 -" name='auctiontimefilter' id='lessthan168' />
                                    Less than 7 Days
                                </label>
                                <label className='flex items-center gap-2'>
                                    <input type="radio" value="168 +" name='auctiontimefilter' id='morethan168' />
                                    More than 7 Days
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <input 
                            type="submit" 
                            value="Apply Filters"  
                            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-5 py-2.5 mb-2"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FilterForm;
