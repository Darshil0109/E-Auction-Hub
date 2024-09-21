import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';


const About = () => {
  return (
    <>
        <Navbar  links={['','products','services','help']} navs={['Home','Auctions','Services','Help']}/>
        <div className="bg-gray-100 text-gray-800 ">
        {/* Hero Section */}
        <section className="bg-gray-100 py-16 px-6 flex flex-col items-center text-center dark:bg-[#121212]">
    <div className="max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 dark:text-[#E0E0E0]">
        Welcome to E-Auction Hub
        </h1>
        <p className="text-gray-600 mb-6 dark:text-[#B3B3B3]">
        Explore and bid on exclusive items from the comfort of your home. The best deals are just a click away.
        </p>
        <Link to="/products" className="inline-block bg-orange-500 text-white text-lg px-5 py-2 rounded-md hover:bg-orange-600 transition-all duration-300 dark:bg-[#39abe7] dark:text-[#192428] dark:font-semibold">
        Browse Auctions
        </Link>
    </div>
    </section>


        {/* Company Overview */}
        <section className="py-12 px-4 lg:px-20 bg-white dark:bg-[#121212]">
            <div className="max-w-screen-lg mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 dark:text-[#E0E0E0]">Who We Are</h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-[#B3B3B3]">
                Swift Bids is a leading online auction platform that connects buyers and sellers in a dynamic marketplace. 
                Our mission is to provide a seamless and transparent auction experience for users around the world.
            </p>
            </div>
        </section>

        {/* Our Values */}
        <section className="py-12 px-4 lg:px-20 bg-gray-50 dark:bg-[#121212]">
            <div className="max-w-screen-lg mx-auto text-center ">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 dark:text-[#E0E0E0]">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-[#262626]">
                <h3 className="text-2xl font-semibold mb-4 dark:text-[#E0E0E0]">Transparency</h3>
                <p className="text-gray-600 dark:text-[#B3B3B3]">
                    We ensure that every auction is fair and transparent, allowing buyers and sellers to trust the process.
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-[#262626]">
                <h3 className="text-2xl font-semibold mb-4 dark:text-[#E0E0E0]">Innovation</h3>
                <p className="text-gray-600 dark:text-[#B3B3B3]">
                    We continually innovate our platform to provide the best auction experience, leveraging the latest technology.
                </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg dark:bg-[#262626]">
                <h3 className="text-2xl font-semibold mb-4 dark:text-[#E0E0E0]">Community</h3>
                <p className="text-gray-600 dark:text-[#B3B3B3]">
                    We value our community of users, creating a space where everyone can connect and thrive.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Our Team */}
        <section className="py-12 px-4 lg:px-20 bg-white dark:bg-[#121212]">
            <div className="max-w-screen-lg mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 dark:text-[#E0E0E0]">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                <img src="./media/Darshil.jpeg" alt="Team Member" className="h-32 w-32 rounded-full mb-4 object-cover" />
                <h3 className="text-xl font-semibold dark:text-[#E0E0E0]">Darshil</h3>
                <p className="text-gray-600 dark:text-[#B3B3B3]">CEO & Founder</p>
                </div>
                <div className="flex flex-col items-center">
                <img src="./media/Darshil.jpeg" alt="Team Member" className="h-32 w-32 rounded-full mb-4 object-cover" />
                <h3 className="text-xl font-semibold dark:text-[#E0E0E0]">Darshil</h3>
                <p className="text-gray-600 dark:text-[#B3B3B3]">Manager</p>
                </div>
                <div className="flex flex-col items-center">
                <img src="./media/Darshil.jpeg" alt="Team Member" className="h-32 w-32 rounded-full mb-4 object-cover" />
                <h3 className="text-xl font-semibold dark:text-[#E0E0E0]">Darshil</h3>
                <p className="text-gray-600 dark:text-[#B3B3B3]">Jr.Developer</p>
                </div>
            </div>
            </div>
        </section>

        {/* Our History */}
        <section className="py-12 px-4 lg:px-20 bg-gray-50 dark:bg-[#121212]">
            <div className="max-w-screen-lg mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 dark:text-[#E0E0E0]">Our History</h2>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-[#B3B3B3]">
                Founded in 2010, Swift Bids started as a small local auction house. Over the years, we have grown into a global platform, 
                transforming the way auctions are conducted online. Our journey is marked by innovation, growth, and a commitment to our values.
            </p>
            </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 px-4 lg:px-20 bg-white text-center dark:bg-[#121212]">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 dark:text-[#E0E0E0]">Join Our Community</h2>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 dark:text-[#B3B3B3]">
            Become a part of our vibrant community of buyers and sellers. Experience the thrill of auctions and find unique products at unbeatable prices.
            </p>
            <Link to="/auth/signup" className="px-6 py-3 bg-[#FF6B35] text-white rounded-md font-semibold text-lg hover:bg-[#1A659E] transition-all dark:bg-[#39abe7] dark:text-[#192428] dark:font-semibold ">
            Sign Up Today
            </Link>
        </section>
        </div>
        <Footer/>
    </>
  );
}

export default About;
