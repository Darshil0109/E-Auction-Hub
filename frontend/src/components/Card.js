import React from 'react';
import '../pages/Products.css'
const formatValue = (value) =>{
    if (value >= 1000000){
        value= (value/1000000)
        return value + ' M'
    }
    else if (value >= 1000){
        value= (value/1000)
        return value + ' K'
    }
    else{
        return value
    }
}

const Card = (props) => {
  return (
    <div className="card bg-white p-2 rounded-lg border border-gray-200 hover:border-orange-200 hover:cursor-pointer flex flex-col h-full group">
  <div className="relative overflow-hidden rounded-t-md h-48">
    <div className="icon relative overflow-hidden rounded-t-md h-full">
      <img
        src={props.product.image_url}
        alt="product"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <div className="countdown-timer countdown-timer-fade absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-75 p-2 rounded-md text-black transition-opacity duration-300">
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
  <p className="text-md sm:text-lg md:text-xl px-2 truncate font-semibold">{props.product.title}</p>
  <div className="flex mt-2 justify-between items-center px-2">
    <div>
      <p className="text-xs sm:text-sm md:text-xs lg:text-sm font-bold opacity-40">Current bid at:</p>
      <p className="text-lg sm:text-xl md:text-2xl font-semibold">{formatValue(props.product.current_bid)} ₹</p>
    </div>
    <button type="button" className="bg-gray-900 text-white h-10 w-28 rounded-md group-hover:bg-orange-500 transition-all duration-300">
      View Auction
    </button>
  </div>
</div>


  );
};

export default Card;
