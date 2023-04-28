import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
    return (
      <footer>
        <div className='footer-container'>
        <div className='footer'>
            <div className='footer-row'>
            <div className='footer-col'>
                <Link to="/" className="logo">Health+</Link>
            </div>
            <div className='footer-col'>
                <p className="company-rights text-muted"> Queen Victoria Rd, Newcastle upon Tyne NE1 4LP </p>
            </div>
            <div className='footer-col footer-links'>
                <Link to="/services">Services</Link>
                <Link to="/contact-us">
                    <Button type="button" className='primary btn'> Contact Us</Button>
                </Link>
            </div>
            </div>
            <div className='footer-row'>
            <div className='footer-col'>
                <a href="https://www.instagram.com/" >
                <i className="bi bi-instagram"></i>
                </a>
                <a href="https://www.facebook.com/" >
                <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.whatsapp.com/" >
                <i className="bi bi-whatsapp"></i>
                </a>
            </div>
            <div className='footer-col'>
                <p className="company-rights"> © 2023 Health+. All rights reserved </p>
            </div>
            
            <div className='footer-col'>
                <Link to="/terms-conditions" className="policy-links"> Terms & Conditions </Link>
                <Link to="/policy" className="policy-links"> Privacy Policy </Link>
            </div>
            </div>
        </div>
        </div>
      </footer>
    );
  }

  export default Footer;
  