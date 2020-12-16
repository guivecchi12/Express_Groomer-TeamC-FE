import React from 'react';
import { Link } from 'react-router-dom';

// Groomers: Helpful Link x3
// Pet Owners: Helpful Link x3
// Informaiton: FAQs, About Us, Contact Us, Terms of Service
function Footer() {
  return (
    <div className="footer">
      <h1>This is the footer</h1>
      <div className="footer-groomer">
        <h4>Groomers</h4>
        <Link>Helpful Link</Link>
        <Link>Helpful Link</Link>
        <Link>Helpful Link</Link>
      </div>
      <div className="footer-pet-owners">
        <h4>Pet Owners</h4>
        <Link>Helpful Link</Link>
        <Link>Helpful Link</Link>
        <Link>Helpful Link</Link>
      </div>
      <div className="footer-information">
        <h4>Pet Owners</h4>
        <Link>FAQs</Link>
        <Link>About Us</Link>
        <Link>Contact Us</Link>
        <Link>Terms of Service</Link>
      </div>
    </div>
  );
}

export default Footer;
