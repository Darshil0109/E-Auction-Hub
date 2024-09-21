import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-100/60 dark:bg-[#181818]">
  <div className="max-w-screen-xl mx-auto p-4 py-6 lg:py-8">
    <div className="flex flex-col lg:flex-row lg:justify-between">
      <div className="flex items-center mb-6 lg:mb-0">
        <Link to="/" className="flex items-center">
          <img src="/media/logo.png" className="h-16 mr-3" alt="Logo" />
          <span className="text-2xl font-semibold text-[#333333] dark:text-[#E0E0E0]">Swift Bids</span>
        </Link>
      </div>
      <div className="flex flex-wrap gap-8 t">
        <div>
          <h2 className="text-sm font-semibold text-[#333333] dark:text-[#E0E0E0]">Resources</h2>
          <ul>
            <li><Link to="https://www.djangoproject.com/" className="hover:underline text-[#666666] dark:text-[#B3B3B3]">Django</Link></li>
            <li><Link to="https://tailwindcss.com/" className="hover:underline text-[#666666] dark:text-[#B3B3B3]">Tailwind CSS</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#333333] dark:text-[#E0E0E0]">Follow us</h2>
          <ul>
            <li><Link to="https://github.com/Darshil0109/E-Auction-Hub" className="hover:underline text-[#666666] dark:text-[#B3B3B3]">Github</Link></li>
            <li><Link to="https://discord.gg/CvWkHagN" className="hover:underline text-[#666666]  dark:text-[#B3B3B3]">Discord</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#333333] dark:text-[#E0E0E0]">Legal</h2>
          <ul>
            <li><Link to="/" className="hover:underline text-[#666666] dark:text-[#B3B3B3]">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline text-[#666666] dark:text-[#B3B3B3]">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
    </div>
    <hr className="my-6 border-gray-700" />
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-black dark:text-[#E0E0E0]">© 2024 <Link to="/" className="hover:underline text-blue-600 dark:text-blue-400">Swift Bids™</Link>. All Rights Reserved.</span>
      <div className="flex gap-5 mt-4 sm:mt-0">
        <Link to="/" className="text-[#A0C4FF] hover:text-[#1A659E]">
          {/* Add icon or content here */}
        </Link>
        <Link to="/" className="text-[#A0C4FF] hover:text-[#1A659E]">
          {/* Add icon or content here */}
        </Link>
        <Link href="/" className="text-[#A0C4FF] hover:text-[#1A659E]">
          {/* Add icon or content here */}
        </Link>
      </div>
    </div>
  </div>
</footer>

  );
}

export default Footer;
