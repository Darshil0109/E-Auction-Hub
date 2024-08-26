import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white ">
      <div className="max-w-screen-xl mx-auto p-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex items-center mb-6 lg:mb-0">
            <a href="/" className="flex items-center">
              <img src="./media/logo.png" className="h-16 mr-3" alt="Logo" />
              <span className="text-2xl font-semibold text-[#1A659E]">Swift Bids</span>
            </a>
          </div>
          <div className="flex flex-wrap gap-8 text-[#004E89]">
            <div>
              <h2 className="text-sm font-semibold text-[#004E89]">Resources</h2>
              <ul>
                <li><a href="/" className="hover:underline">SwiftBids</a></li>
                <li><a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#004E89]">Follow us</h2>
              <ul>
                <li><a href="https://github.com/Darshil0109/E-Auction-Hub" className="hover:underline">Github</a></li>
                <li><a href="https://discord.gg/CvWkHagN" className="hover:underline">Discord</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#004E89]">Legal</h2>
              <ul>
                <li><a href="/" className="hover:underline">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-[#004E89]" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-[#004E89]">© 2023 <a href="/" className="hover:underline">Swift Bids™</a>. All Rights Reserved.</span>
          <div className="flex gap-5 mt-4 sm:mt-0">
            <a href="/" className="text-[#004E89] hover:text-[#1A659E]">
              {/* Add icon or content here */}
            </a>
            <a href="/" className="text-[#004E89] hover:text-[#1A659E]">
              {/* Add icon or content here */}
            </a>
            <a href="/" className="text-[#004E89] hover:text-[#1A659E]">
              {/* Add icon or content here */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
