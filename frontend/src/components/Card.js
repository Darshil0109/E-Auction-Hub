import React from 'react';
import '../pages/Products.css'
import { useNavigate } from 'react-router-dom';


// function to change value to different parameters like 1.23 Million or 121.56 k with 2 decimal digits
const formatValue = (value) =>{
  if (value >= 1000000){
    value= (value/1000000).toFixed(2);
    return value + ' M'
    }
    else if (value >= 1000){
        value= (value/1000).toFixed(2);
        return value + ' K'
    }
    else{
        return value
    }
}

// Card componenet to load card
const Card = (props) => {
  // to navigate to different pages
  const navigate = useNavigate();
  const handleProductDetails = (product) =>{
    navigate(`/products/${product.id}`);
  }
  return (
    <div className="card bg-white p-2 rounded-lg border border-gray-200 hover:border-orange-200 hover:cursor-pointer flex flex-col h-full group dark:bg-[#262626] dark:border-gray-700">
  <div className="relative overflow-hidden rounded-t-md h-48">
    <div className="icon relative overflow-hidden rounded-t-md h-full">
      <img
        src={props.product.image_url}
        alt="product"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    {/* Timer inside card to show time left for auction to end*/}
    <div className="countdown-timer countdown-timer-fade absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 p-2 rounded-md text-black transition-opacity duration-300 dark:bg-[#37474F] dark:bg-opacity-90 dark:p-2 dark:rounded-md dark:text-[#E0E0E0] dark:transition-opacity dark:duration-300
">
      <ul className="flex space-x-1 text-center">
        <li className="times" data-days="0">
          <span className="text-lg font-bold">{props.days}</span>
          <span className="text-xs block">Days</span>
        </li>
        <li className="colon">:</li>
        <li className="times" data-hours="0">
          <span className="text-lg font-bold">{props.hours}</span>
          <span className="text-xs block">Hours</span>
        </li>
        <li className="colon">:</li>
        <li className="times" data-minutes="0">
          <span className="text-lg font-bold">{props.minutes}</span>
          <span className="text-xs block">Min</span>
        </li>
        <li className="colon">:</li>
        <li className="times" data-seconds="0">
          <span className="text-lg font-bold">{props.remainingSeconds}</span>
          <span className="text-xs block">Sec</span>
        </li>
      </ul>
    </div>
  </div>
  <p className="text-md sm:text-lg md:text-xl px-2 truncate font-semibold dark:text-[#E0E0E0]">{props.product.title}</p>
  <div className="flex mt-2 justify-between items-center px-2 gap-2">
    {/* show current bid if already bid placed and if bid is not placed then show starting bid */}
    <div>
      {(props.product.current_bid) ? 
        <>
          <p className="text-xs sm:text-sm md:text-xs lg:text-sm font-bold opacity-40 dark:text-[#B0B0B0]">Current bid at:</p>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold dark:text-[#E0E0E0] ">{formatValue(props.product.current_bid)}₹ </p>
        </> 
        : 
        <>
          <p className="text-xs sm:text-sm md:text-xs lg:text-sm font-bold opacity-40 dark:text-[#B0B0B0]">Initial bid at:</p>
          <p className="text-lg sm:text-xl md:text-2xl font-semibold dark:text-[#E0E0E0] ">{formatValue(props.product.starting_bid)}₹ </p>
        </> 
      }
    </div>
    <button type="button" onClick={()=> handleProductDetails(props.product)} className="bg-gray-900 text-white h-10 w-28 rounded-md group-hover:bg-orange-500 h-10 w-28 rounded-md group-hover:dark:bg-[#F39C12] transition-all duration-300 group-hover:dark:text-white dark:border-teal-500 dark:text-teal-500 dark:bg-teal-800/30 dark:focus:bg-teal-800/20">
      View Auction
    </button>
  </div>
</div>


  );
};

export default Card;
