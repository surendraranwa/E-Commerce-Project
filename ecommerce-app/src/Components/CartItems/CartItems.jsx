import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png';

function CartItems() {
    const {all_product, cartItems, RemoveFromCart, getTotalCartAmount} = useContext(ShopContext);
  return (
    <>
    <div className="cartitems">
        <div className="cartitems-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        {all_product.map((e)=>{
             if(cartItems[e.id]>0)
                {
                  return <>
               <div>
                  <div className="cartitems-format cartitems-format-main">
                      <img src={e.image} alt="" className="carticon-producticon" />
                      <p>{e.name}</p>
                      <p> ₹ {e.new_price}</p>
                      <button className="cartitems-quantity">{cartItems[e.id]}</button>
                      <p>₹ {e.new_price *cartItems[e.id] }</p>
                      <img src={remove_icon} alt="" onClick={()=>(RemoveFromCart(e.id))} className="carticon-remove_icon"/>
                  </div>
              </div>
              <hr/></>
              }
              return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>₹ {getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className="cartitems-total-item">
                            <p>Total</p>
                            <p>₹ {getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartirems-prormocode">
                    <p>if you have a promo code, Enter it here</p>
                    <div className="cartitems-promocodebox">
                        <input type="text" placeholder='Promo Code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
    </div>
    </>
  )
}

export default CartItems;