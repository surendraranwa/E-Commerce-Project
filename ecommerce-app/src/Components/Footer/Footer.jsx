import React from 'react';
import './Footer.css';
import Footer_logo from '../assets/logo_big.png';
import Instagram_icon from '../assets/instagram_icon.png';
import Pinterest_icon from '../assets/pintester_icon.png';
import Whatsapp_icon from '../assets/whatsapp_icon.png';

function Footer() {
  return (
    <>
    <div className='footer'>
     <div className='footer-logo'>
        <img src={Footer_logo} alt=''/>
        <p>SHOPPER</p>
     </div>
     <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
     </ul>
     <div className='footer-social-links'>
        <div className='footer-icon-container'>
            <img src={Instagram_icon} alt=''/>
        </div>
        <div className='footer-icon-container'>
            <img src={Pinterest_icon} alt=''/>
        </div>
        <div className='footer-icon-container'>
            <img src={Whatsapp_icon} alt=''/>
        </div>
     </div>
    </div>
    <div className='footer-copyright'>
        <hr/>
        <p>Copyright @ 2024 - All Right Reserved</p>
    </div>
    </>
  )
}

export default Footer;