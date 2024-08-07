import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container text-center py-4">
        <img src="./media/logo.png" alt="Logo" className="footer-logo" />
        <p className="mt-3">© 2024 SwiftBids. All rights reserved.</p>
        <div className="social-links mt-3">
          <a href="/" className="social-link me-3">Facebook</a>
          <a href="/" className="social-link me-3">Twitter</a>
          <a href="/" className="social-link">Instagram</a>
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
