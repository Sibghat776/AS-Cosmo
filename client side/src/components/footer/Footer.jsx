import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        {/* Brand / About */}
        <div className="footerSection">
          <h1 className="logo">AS Cosmo</h1>
          <p className="desc">
            AS Cosmo is your beauty destination for premium makeup, skincare,
            and tools — delivered all over Pakistan with love and care.
          </p>
        </div>

        {/* Links */}
        <div className="footerSection">
          <h3>Quick Links</h3>
          <ul>
            <Link to="/"><li>Home</li></Link>
            <Link to="/peoples"><li>Peoples</li></Link>
            <Link to="about"><li>About</li></Link>
            <Link to="/contact"><li>Contact</li></Link>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footerSection">
          <h3>Contact</h3>
          <p>Email: info@ascosmo.pk</p>
          <p>Phone: +92 300 1234567</p>
          <p>Karachi, Pakistan</p>
        </div>

        {/* Socials */}
        <div className="footerSection">
          <h3>Follow Us</h3>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>

      <div className="footerBottom">
        <p>© {new Date().getFullYear()} AS Cosmo. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
