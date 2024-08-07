import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <nav className="navbar">
            <ul className="nav-items">
                <img src="./media/logo.png" alt="logo" className='logo' />
                <li className="nav-links"><a href="/products" className="nav-link">Auctions</a></li>
                <li className="nav-links"><a href="/about" className="nav-link">About</a></li>
                <li className="nav-links"><a href="/help" className="nav-link">Help</a></li>
            </ul>
            <div className="auth-buttons">
                <button type="button" className="btn btn-info">Sign Up</button>
            </div>
    </nav>
  )
}

export default Navbar