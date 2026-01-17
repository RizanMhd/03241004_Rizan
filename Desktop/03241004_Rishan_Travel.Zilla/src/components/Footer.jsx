import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Information Only */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>📞 +94 70 234 5678 | 📧 info@travelzilla.lk | 📍 Colombo, Sri Lanka</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">𝕏</a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 Travel.Zilla - All Rights Reserved | Discover Sri Lanka's Natural Wonders</p>
      </div>
    </footer>
  );
};

export default Footer;
