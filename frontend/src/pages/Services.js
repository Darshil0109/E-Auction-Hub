import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
  return (
    <>
    <Navbar  links={['','products','about','help']} navs={['Home','Auctions','About','Help']}/>
    <section className="bg-[#f3f4f6] py-12 dark:bg-[#121212]">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-[#E0E0E0]">Our Services</h2>
      <p className="text-lg text-gray-700 mt-4 dark:text-[#B3B3B3]">We offer the best auction services to help you buy and sell with confidence.</p>
    </div>

    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 dark:bg-[#262626]">
        <img src="./media/services/service1.jpg" alt="Service 1" className="w-full h-48 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-[#E0E0E0]">Online Auctions</h3>
          <p className="mt-4 text-gray-600 dark:text-[#B3B3B3]">Participate in live online auctions from the comfort of your home. Bid on a wide range of items with just a few clicks.</p>
        </div>
      </div>

      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 dark:bg-[#262626] ">
        <img src="./media/services/service2.jpg" alt="Service 2" className="w-full h-48 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-[#E0E0E0]">Service 2: Item Valuation</h3>
          <p className="mt-4 text-gray-600 dark:text-[#B3B3B3]">Get professional valuations for your items before listing them in our auctions. Our experts ensure fair pricing.</p>
        </div>
      </div>

      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 dark:bg-[#262626] ">
        <img src="./media/services/service3.jpg" alt="Service 3" className="w-full h-48 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-[#E0E0E0]">Service 3: Secure Transactions</h3>
          <p className="mt-4 text-gray-600 dark:text-[#B3B3B3]">We prioritize security in all transactions, ensuring your payments and personal information are protected at all times.</p>
        </div>
      </div>

     
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 dark:bg-[#262626]">
        <img src="./media/services/service4.jpg" alt="Service 4" className="w-full h-48 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-[#E0E0E0]">Service 4: Auction Consulting</h3>
          <p className="mt-4 text-gray-600 dark:text-[#B3B3B3]">Our experts provide personalized consulting to help you navigate the auction process, whether buying or selling.</p>
        </div>
      </div>

     
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 dark:bg-[#262626]">
        <img src="./media/services/service5.jpg" alt="Service 5" className="w-full h-48 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-[#E0E0E0]">Service 5: Custom Auction Solutions</h3>
          <p className="mt-4 text-gray-600 dark:text-[#B3B3B3]">We offer customized auction solutions tailored to your unique needs, including private and corporate auctions.</p>
        </div>
      </div>

      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 dark:bg-[#262626]">
        <img src="./media/services/service6.jpg" alt="Service 6" className="w-full h-48 object-cover"/>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-[#E0E0E0]">Service 6: Customer Support</h3>
          <p className="mt-4 text-gray-600 dark:text-[#B3B3B3]">Our dedicated support team is available 24/7 to assist you with any questions or issues related to our services.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<Footer/>


    </>
  )
}

export default Services
