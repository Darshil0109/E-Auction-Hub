import React from 'react';
import './Hero.css'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <>
      <div className="pt-32 lg:pt-16 dark:bg-[#121212]">
  <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-center px-4">
    <div className="lg:w-1/2 text-center lg:text-left">
      <h1 className="text-5xl font-bold text-[#004E89] mb-4 dark:text-[#E0E0E0]">
        Bid on Treasures<br/>
        <span className="text-[#FF6B35] text-6xl dark:text-[#FFA726]">Fulfill Your Dreams</span>
      </h1>
      <p className="text-xl text-[#004E89] mb-6 dark:text-[#E0E0E0]">
        Efficient Auction Website: Build a High-Performance Auction Platform Quickly
      </p>
      <div className="flex justify-center lg:justify-start gap-2 md:gap-4">
        <Link to="/services" className="bg-[#FF6B35]  text-white py-3 px-6 rounded-lg hover:bg-[#1A659E] flex items-center space-x-2 transition duration-300 dark:bg-[#FF5722] dark:text-white ">
          {/* SVG code */}
          <span className="text-md">What's Inside</span>
        </Link>
        <Link to="/products" className="bg-[#004E89] text-white py-3 px-6 rounded-lg hover:bg-[#1A659E] flex items-center space-x-2 transition duration-300">
          {/* SVG code */}
          <span className="text-md">Explore</span>
        </Link>
      </div>
    </div>
    <div className="bounce lg:w-1/3 mt-8 lg:mt-0 justify-center hidden lg:flex">
      <img src="./media/hammer.webp" alt="Auction Hammer" className="max-w-sm h-auto object-cover rounded-lg" />
    </div>
  </div>
</div>

<div className="pt-32 lg:pt-16 dark:bg-[#121212]">
  <div className="container mx-auto text-center px-3">
    <h2 className="text-3xl font-bold text-[#004E89] mb-12 dark:text-[#E0E0E0]">Features</h2>
    <div className="flex flex-wrap gap-8 justify-center">
      <div className="w-full sm:w-1/2 lg:w-1/4 bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
        <img src="./media/live_auction.jpg" alt="Live Auctions" className="w-full h-48 object-cover rounded-t-lg mb-4"/>
        <h3 className="text-2xl font-semibold mb-2 dark:text-[#E0E0E0]">Live Auctions</h3>
        <p className="text-[#004E89] dark:text-[#E0E0E0]">Participate in live auctions and place your bids in real-time. Don’t miss out on great deals!</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
        <img src="./media/wide_range.jpeg" alt="Wide Range of Categories" className="w-full h-48 object-cover rounded-t-lg mb-4"/>
        <h3 className="text-2xl font-semibold mb-2 dark:text-[#E0E0E0]">Wide Range of Categories</h3>
        <p className="text-[#004E89] dark:text-[#E0E0E0]">Browse auctions across various categories including electronics, fashion, and collectibles.</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
        <img src="./media/secure_transaction.jpeg" alt="Secure Transactions" className="w-full h-48 object-cover rounded-t-lg mb-4"/>
        <h3 className="text-2xl font-semibold mb-2 dark:text-[#E0E0E0]">Secure Transactions</h3>
        <p className="text-[#004E89] dark:text-[#E0E0E0]">Enjoy peace of mind with secure payment methods and buyer protection for all transactions.</p>
      </div>
    </div>
  </div>
</div>

<section className="py-32 lg:pt-16 dark:bg-[#121212]">
  <div className="mx-auto text-center">
    <h2 className="text-3xl font-bold text-[#004E89] mb-12 dark:text-[#E0E0E0]">What Our Users Say</h2>
    <div className="flex flex-wrap gap-8 justify-center px-3">
      <div className="w-full sm:w-1/2 lg:w-1/4 bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
        <p className="text-[#004E89] dark:text-[#E0E0E0] mb-4">"SwiftBids has transformed my bidding experience. The platform is intuitive, and I've won amazing items I never thought I'd get!"</p>
        <img src="./media/Darshil.jpeg" alt="Jane Doe" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"/>
        <p className="font-semibold text-[#004E89]  dark:text-[#E0E0E0]">Darshil Patel</p>
        <p className="text-[#004E89] dark:text-[#E0E0E0]">Frequent Bidder</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
        <p className="text-[#004E89] dark:text-[#E0E0E0] mb-4">"SwiftBids makes it easy to find great deals and unique items. The customer service is top-notch too!"</p>
        <img src="./media/Darshil.jpeg" alt="Emily Johnson" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"/>
        <p className="font-semibold text-[#004E89] dark:text-[#E0E0E0]">Darshil Patel</p>
        <p className="text-[#004E89] dark:text-[#E0E0E0]">Satisfied User</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-1/4 bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg transition duration-300 hover:shadow-xl">
        <p className="text-[#004E89] dark:text-[#E0E0E0] mb-4">"I love the variety of items available on SwiftBids. The bidding process is straightforward and fun. Highly recommend!"</p>
        <img src="./media/Darshil.jpeg" alt="John Smith" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"/>
        <p className="font-semibold text-[#004E89] dark:text-[#E0E0E0]">Darshil Patel</p>
        <p className="text-[#004E89] dark:text-[#E0E0E0]">Happy Customer</p>
      </div>
    </div>
  </div>
</section>


    </>
  );
}

export default Hero;
