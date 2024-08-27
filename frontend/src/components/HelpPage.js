import React from 'react';
import Navbar from './Navbar';

const HelpPage = () => {
  return (
    <div className='bg-[#f3f4f6]'>
    <Navbar links={['','products','services','about']} navs={['Home','Auctions','Services','About']}/>
    <main className="container bg-[#f3f4f6] mx-auto p-6 lg:p-12 bg-gray-100 font-sans">
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">Help Center</h1>


     
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>

        <div className="space-y-4">
          
          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">How do I create an auction?</summary>
            <p className="text-gray-600 mt-2">
              To create an auction, log in to your account and navigate to the "Create Auction" page. Fill out the required details, such as the item description, starting bid, and auction end time, and submit your listing.
            </p>
          </details>
          
         
          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">What payment methods are accepted?</summary>
            <p className="text-gray-600 mt-2">
              We accept various payment methods including credit/debit cards, PayPal, and bank transfers. For more details, visit our payment options page.
            </p>
          </details>
          
          
          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">How can I track my auction?</summary>
            <p className="text-gray-600 mt-2">
              To track your auction, go to your account dashboard and select "My Auctions". Here you can view the status of all your active and past auctions.
            </p>
          </details>
          
          
          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">What should I do if I encounter a problem?</summary>
            <p className="text-gray-600 mt-2">
              If you encounter any issues, please contact our support team through the "Contact Us" page or email us directly at support@swiftbids.com. We will assist you as soon as possible.
            </p>
          </details>

          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">How do I update my account details?</summary>
            <p className="text-gray-600 mt-2">
              To update your account details, log in and navigate to "Account Settings". From there, you can update your personal information, password, and other settings.
            </p>
          </details>
          
        
          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">Can I cancel or modify my bid?</summary>
            <p className="text-gray-600 mt-2">
              Once a bid is placed, it cannot be canceled or modified. Please ensure you review your bid carefully before submitting it.
            </p>
          </details>
          

          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">How do I reset my password?</summary>
            <p className="text-gray-600 mt-2">
              If you have forgotten your password, click on the "Forgot Password" link on the login page. Follow the instructions to reset your password via email.
            </p>
          </details>
          

          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">How can I become a seller?</summary>
            <p className="text-gray-600 mt-2">
              To become a seller, sign up for an account and complete the seller registration process. Once approved, you can start listing items for auction.
            </p>
          </details>
          
   
          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">How do I leave feedback or a review?</summary>
            <p className="text-gray-600 mt-2">
              To leave feedback or a review, go to the item page and find the "Leave a Review" section. Your feedback helps us improve our services.
            </p>
          </details>
          

          <details className="border-b border-gray-200 pb-4">
            <summary className="text-lg font-semibold text-gray-700 cursor-pointer hover:text-[#FF6B35]">What happens if I win an auction?</summary>
            <p className="text-gray-600 mt-2">
              If you win an auction, you will receive an email notification with details on how to complete your purchase. Follow the instructions provided to finalize the transaction.
            </p>
          </details>
        </div>
      </div>

      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">If you have any questions or need further assistance, please fill out the form below, and we will get back to you as soon as possible.</p>
        
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              required
            />
          </div>

         
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              required
            />
          </div>

          
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              rows="4"
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              required
            ></textarea>
          </div>

         
          <button
            type="submit"
            className="w-full py-3 bg-[#FF6B35] text-white rounded-lg hover:bg-[#FF6B35]/80 transition-all duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
    </div>
  );
}

export default HelpPage;
