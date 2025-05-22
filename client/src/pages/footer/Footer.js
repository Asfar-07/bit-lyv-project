import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <main>
        <div className="sidebar">
          <div className="logo">W.</div>
          <ul className="menu">
            <li><i className="icon">⭐</i> Home</li>
            <li><i className="icon">🖼️</i> Collections</li>
            <li><i className="icon">🏠</i> Contact Us</li>
          </ul>
          <div className="award">🏆 A' Design Communication Award</div>
        </div>

        <div className="main-footer">
          <div className="top-center-text">SOMTHIG HERE MISSING?</div>
          <div className="cta">
            <div className="icon-text">🔽 Costumer Care?</div>
            <h1>Let’s talk</h1>
          </div>

          <div className="footer-links">
            <a href="/">Cookies Policy</a>
            <a href="/">Legal Terms</a>
            <a href="/">Privacy Policy</a>
          </div>

          <div className="social-icons">
            <a href="/">📘</a>
            <a href="/">▶️</a>
            <a href="/">📸</a>
          </div>
        </div>
      </main>
    </footer>
  );
};

export default Footer;
