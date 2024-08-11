import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer text-2xl md:text-3xl lg:text-2xl">
      <div className="container text-center py-4 flex flex-col items-center">
        <img src="./media/logo.png" alt="Logo" className="footer-logo" />
        <p className="mt-3">© 2024 SwiftBids. All rights reserved.</p>
        <div className="social-links mt-3">
          <a href="/" className="social-link me-3 md:text-2xl">Facebook <i class="fas fa-brands fa-facebook-messenger"></i></a>
          <a href="/" className="social-link me-3 md:text-2xl">Twitter <i class="fas fa-brands fa-twitter"></i></a>
          <a href="/" className="social-link md:text-2xl" >Instagram <i class="fas fa-brands fa-instagram"></i></a>
        </div>
        <div className="contact-info mt-3">
          <p>Email: support@swiftbids.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
