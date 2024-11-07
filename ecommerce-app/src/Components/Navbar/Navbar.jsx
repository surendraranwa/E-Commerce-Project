import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png';
import cart_icon from '../assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropDown from '../assets/nav_dropdown.png';

function Navbar() {
    const [menu, setMenu] = useState('shop');
    const {getTotalItemsInCart} = useContext(ShopContext);
    const menuref = useRef();

    const dropdown_toggle = (e)=>{
      menuref.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

  return (
    <>
    <div className='navbar'>
        <div className='navbar-logo'>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/'><img src={logo} alt=''/></Link>
        <Link style={{textDecoration: 'none', color: 'black'}} to='/'><p>SHOPPER</p></Link>   
        </div>
        <img src={nav_dropDown} alt="" className='nav-dropdownicon' onClick={dropdown_toggle}/>
        <ul ref={menuref} className='nav-menu '>
          <li onClick={()=> setMenu('shop')}><Link style={{textDecoration: 'none', color: 'black'}} to='/'>Shop</Link> {menu === 'shop' ? <hr/>: ''}</li>
          <li onClick={()=> setMenu('mens')}><Link style={{textDecoration: 'none', color: 'black'}} to='/mens'>Mens</Link> {menu ==='mens' ? <hr/>: ''}</li>
          <li onClick={()=> setMenu('womens')}><Link style={{textDecoration: 'none', color: 'black'}} to='/womens'>Womens</Link> {menu ==='womens' ? <hr/>: ''}</li>
          <li onClick={()=> setMenu('kids')}><Link style={{textDecoration: 'none', color: 'black'}} to='/kids'>Kids</Link> {menu ==='kids' ? <hr/>: ''}</li>
        </ul>
        <div className='nav-login-cart'>
          {localStorage.getItem('auth_token') ? <button onClick={()=>{localStorage.removeItem('auth_token'); window.location.replace('/');}}>Log Out</button> : <Link style={{textDecoration: 'none', color: 'black'}} to='/login'><button>Login</button></Link>} 
          <Link style={{textDecoration: 'none', color: 'black'}} to='/cart'><img src={cart_icon} alt=''/></Link> 
            
            <div className='nav-cart-counter'>{getTotalItemsInCart()}</div>
        </div>
    </div>
    </>
  )
}

export default Navbar