import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'


const Hero = () => {
    return (
        <div style={{fontFamily:'Roboto'}}>
        
            <div className='hero-div'>
                <div className='flex items-center justify-evenly  lg:px-1/4 lg:mx-32 xl:w-8/12 mx-auto'>

                    <div className='sm:p-24 items-center lg:w-1/2 w-10/12'>
                        <p className="hero-title text-center lg:text-right">Bid on Treasures <br /><span className="hero-word md:text-right">Fulfill Your Dreams</span></p>
                        <p className="hero-subtitle">Efficient Auction Website: Build a High-Performance<br /> Auction Platform Quickly</p>
                        <div className="buttons">
                            <Link to={'/products'}>
                                <button type="button" className="btn btn-outline-primary More-btn flex gap-3 items-center justify-center">What's Inside <i class="fas fa-solid fa-lightbulb"></i></button>

                            </Link>
                            <button type="button" className="btn btn-primary Explore-btn flex gap-3 items-center justify-center">Explore <i class="fas fa-regular fa-arrow-down-long -rotate-45 text-base"></i></button>
                        </div>

                    </div>
                    <div className='hidden md:flex h-full w-30'>
                        <img src="./media/hammer.webp" alt="hammer" />
                    </div>
                </div>
                
                <section class="features py-5 flex flex-col">
                    <h2 class="text-center mb-4 text-4xl lg:text-4xl font-medium">Features</h2>
                    <div class="container flex flex-col md:flex-row items-center">
                        
                            
                                <div class="card feature-card">
                                    <img src="./media/live_auction.jpg" class="card-img-top" alt="Live Auctions"/>
                                    <div class="card-body">
                                        <h5 class="card-title">Live Auctions</h5>
                                        <p class="card-text">Participate in live auctions and place your bids in real-time. Don’t miss out on great deals!</p>
                                    </div>
                                </div>
                            
                            
                                <div class="card feature-card">
                                    <img src="./media/wide_range.jpeg" class="card-img-top" alt="Wide Range of Categories"/>
                                    <div class="card-body">
                                        <h5 class="card-title">Wide Range of Categories</h5>
                                        <p class="card-text">Browse auctions across various categories including electronics, fashion, and collectibles.</p>
                                    </div>
                                </div>
                            
                            
                                <div class="card feature-card">
                                    <img src="./media/secure_transaction.jpeg" class="card-img-top" alt="Secure Transactions"/>
                                    <div class="card-body">
                                        <h5 class="card-title">Secure Transactions</h5>
                                        <p class="card-text">Enjoy peace of mind with secure payment methods and buyer protection for all transactions.</p>
                                    </div>
                                </div>
                            
                        
                    </div>
                </section>

                <section class="features py-5 flex flex-col">
                    <h2 class="text-center mb-4 text-4xl :text-6xl font-medium">What Our Users Say</h2>
                
                    <div className='container flex flex-col md:flex-row items-center'>

                            <div className="card testimonial-card ">
                                <div className="card-body flex flex-col items-center">
                                    <p className="card-text">"SwiftBids has transformed my bidding experience. The platform is intuitive, and I've won amazing items I never thought I'd get!"</p>
                                    
                                    <img src="./media/person2.jpg" alt="User"/>
                                    <p className="name">Jane Doe</p>
                                    <p className="position">Frequent Bidder</p>
                                </div>
                            </div>
                        
                        
                    
                            <div className="card testimonial-card">
                                <div className="card-body flex flex-col items-center">
                                    <p className="card-text">"SwiftBids makes it easy to find great deals and unique items. The customer service is top-notch too!"</p>
                                    <img src="./media/person1.jpg" alt="User"/>
                                    <p className="name">Emily Johnson</p>
                                    <p className="position">Satisfied User</p>
                                </div>
                            </div>
                        

                        
                            <div className="card testimonial-card">
                                <div className="card-body flex flex-col items-center">
                                    <p className="card-text">"I love the variety of items available on SwiftBids. The bidding process is straightforward and fun. Highly recommend!"</p>
                                    <img src="./media/person3.jpg" alt="User"/>
                                    <p className="name">John Smith</p>
                                    <p className="position">Happy Customer</p>
                                </div>
                            </div>
                    </div>
                </section> 
                
            </div>
        </div>

  )
}

export default Hero