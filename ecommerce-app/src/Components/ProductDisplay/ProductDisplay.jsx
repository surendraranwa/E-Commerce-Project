import React, { useContext } from 'react';
import './ProductDisplay.css';
import Star_image from '../assets/star_icon.png';
import dull_star_image from '../assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

function ProductDisplay(props) {
    const {product} = props;
    const {AddToCart} = useContext(ShopContext);
  return (
    <>
    <div className='productdisplay'>
        <div className='productdisplay-left'>
            <div className='productdisplay-left-img-list'>
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className='productdisplay-left-img-main'>
                <img src={product.image} alt=""/>
            </div>
        </div>
        <div className='productdisplay-right'>
            <h1>{product.name}</h1>
            <div className='productdisplay-right-stars'>
              <img src={Star_image} alt="" />
              <img src={Star_image} alt="" />
              <img src={Star_image} alt="" />
              <img src={Star_image} alt="" />
              <img src={dull_star_image} alt="" />
              <p>(122)</p>
            </div>
            <div className='productdisplay-right-prizes'>
                <div className='productdisplay-right-old-prires'>
                ₹{product.old_price}
                </div>
                <div className='productdisplay-right-new-prires'>
                ₹{product.new_price}
                </div>
            </div>
            <div className='productdisplay-right-size'>
                <h1>Select Size</h1>
                <div className='productdisplay-right-sizes'>
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>AddToCart(product.id)}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>Category :</span> T-shirt, Crop Tops</p>
            <p className='productdisplay-right-category'> <span>Tags :</span> Modern, Latest</p>
        </div>
    </div>
    </>
  )
}

export default ProductDisplay;