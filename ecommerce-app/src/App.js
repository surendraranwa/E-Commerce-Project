import Navbar from "./Components/Navbar/Navbar";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop.jsx';
import ShopCategory from './Pages/ShopCategory.jsx';
import LoginSignUp from './Pages/LoginSignUp.jsx';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import Footer from "./Components/Footer/Footer.jsx";
import mans_banner from '../src/Components/assets/banner_mens.png';
import womens_banner from '../src/Components/assets/banner_women.png';
import kids_banner from '../src/Components/assets/banner_kids.png';
function App() {
  return (
    <>
    <Router>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Shop/>}/>
      <Route path="/mens" element={<ShopCategory banner={mans_banner} category='men'/>}/>
      <Route path="/womens" element={<ShopCategory banner={womens_banner} category='women'/>}/>
      <Route path="/kids" element={<ShopCategory banner={kids_banner} category='kid'/>}/>
      <Route path="/product/:productId" element={<Product/>}/>
      <Route path="/login" element={<LoginSignUp/>}/>
      <Route path="/cart" element={<Cart/>}/>
     </Routes>
     <Footer/>
    </Router>
    </>
  );
}

export default App;
