import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white ">
      <div className="max-w-screen-xl mx-auto p-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex items-center mb-6 lg:mb-0">
            <Link to="/" className="flex items-center">
              <img src="/media/logo.png" className="h-16 mr-3" alt="Logo" />
              <span className="text-2xl font-semibold text-[#1A659E]">Swift Bids</span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 text-[#004E89]">
            <div>
              <h2 className="text-sm font-semibold text-[#004E89]">Resources</h2>
              <ul>
                <li><Link to="/" className="hover:underline">SwiftBids</Link></li>
                <li><Link to="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#004E89]">Follow us</h2>
              <ul>
                <li><Link to="https://github.com/Darshil0109/E-Auction-Hub" className="hover:underline">Github</Link></li>
                <li><Link to="https://discord.gg/CvWkHagN" className="hover:underline">Discord</Link></li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#004E89]">Legal</h2>
              <ul>
                <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-[#004E89]" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-[#004E89]">© 2023 <Link to="/" className="hover:underline">Swift Bids™</Link>. All Rights Reserved.</span>
          <div className="flex gap-5 mt-4 sm:mt-0">
            <Link to="/" className="text-[#004E89] hover:text-[#1A659E]">
              {/* Add icon or content here */}
            </Link>
            <Link to="/" className="text-[#004E89] hover:text-[#1A659E]">
              {/* Add icon or content here */}
            </Link>
            <Link href="/" className="text-[#004E89] hover:text-[#1A659E]">
              {/* Add icon or content here */}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
