import React from 'react';
import './Hero.css'
const Hero = () => {
  return (
    <>
      <section className="pt-32 lg:pt-16 ">
        <div className="container mx-auto flex flex-col-reverse   lg:flex-row items-center justify-center px-4">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl font-bold text-[#004E89] mb-4">
              Bid on Treasures<br/>
              <span className="text-[#FF6B35] text-6xl">Fulfill Your Dreams</span>
            </h1>
            <p className="text-xl text-[#004E89] mb-6">
              Efficient Auction Website: Build a High-Performance Auction Platform Quickly
            </p>
            <div className="flex justify-center lg:justify-start gap-2 md:gap-4">
              <a href="/services" className="bg-[#FF6B35] text-white py-3 px-6 rounded hover:bg-[#1A659E] flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                <span className="text-md">What's Inside</span>
              </a>
              <a href="/products" className="bg-[#004E89] text-white py-3 px-6 rounded hover:bg-[#1A659E] flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span className="text-md">Explore</span>
              </a>
            </div>
          </div>
          <div className="bounce lg:w-1/3 mt-8 lg:mt-0 justify-center hidden lg:flex">
            <img src="./media/hammer.webp" alt="Auction Hammer" className="max-w-sm h-auto object-cover"/>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#004E89] mb-12">Features</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="w-2/3 sm:w-1/2 md:w-full mx-4 md:w-1/2 lg:w-1/4 bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
              <img src="./media/live_auction.jpg" alt="Live Auctions" className="w-full h-48 object-cover rounded-t-lg mb-4"/>
              <h3 className="text-2xl font-semibold mb-2">Live Auctions</h3>
              <p className="text-[#004E89]">Participate in live auctions and place your bids in real-time. Don’t miss out on great deals!</p>
            </div>
            <div className="w-2/3 sm:w-1/2 md:w-full  mx-4 md:w-1/2 lg:w-1/4 bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
              <img src="./media/wide_range.jpeg" alt="Wide Range of Categories" className="w-full h-48 object-cover rounded-t-lg mb-4"/>
              <h3 className="text-2xl font-semibold mb-2">Wide Range of Categories</h3>
              <p className="text-[#004E89]">Browse auctions across various categories including electronics, fashion, and collectibles.</p>
            </div>
            <div className="w-2/3 sm:w-1/2 md:w-full  mx-4 md:w-1/2 lg:w-1/4 bg-[#FFFFFF] p-6 rounded-lg shadow-lg">
              <img src="./media/secure_transaction.jpeg" alt="Secure Transactions" className="w-full h-48 object-cover rounded-t-lg mb-4"/>
              <h3 className="text-2xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-[#004E89]">Enjoy peace of mind with secure payment methods and buyer protection for all transactions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 ">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#004E89] mb-12">What Our Users Say</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="w-2/3 sm:w-1/2 md:w-full mx-4 md:w-1/2 lg:w-1/4 bg-white p-6 rounded-lg shadow-lg">
              <p className="text-[#004E89] mb-4">"SwiftBids has transformed my bidding experience. The platform is intuitive, and I've won amazing items I never thought I'd get!"</p>
              <img src="./media/person2.jpg" alt="Jane Doe" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"/>
              <p className="font-semibold text-[#004E89]">Jane Doe</p>
              <p className="text-[#004E89]">Frequent Bidder</p>
            </div>
            <div className="w-2/3 sm:w-1/2 md:w-full mx-4 md:w-1/2 lg:w-1/4 bg-white p-6 rounded-lg shadow-lg">
              <p className="text-[#004E89] mb-4">"SwiftBids makes it easy to find great deals and unique items. The customer service is top-notch too!"</p>
              <img src="./media/person1.jpg" alt="Emily Johnson" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"/>
              <p className="font-semibold text-[#004E89]">Emily Johnson</p>
              <p className="text-[#004E89]">Satisfied User</p>
            </div>
            <div className="w-2/3 sm:w-1/2 md:w-full mx-4 md:w-1/2 lg:w-1/4 bg-white p-6 rounded-lg shadow-lg">
              <p className="text-[#004E89] mb-4">"I love the variety of items available on SwiftBids. The bidding process is straightforward and fun. Highly recommend!"</p>
              <img src="./media/person3.jpg" alt="John Smith" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"/>
              <p className="font-semibold text-[#004E89]">John Smith</p>
              <p className="text-[#004E89]">Happy Customer</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
