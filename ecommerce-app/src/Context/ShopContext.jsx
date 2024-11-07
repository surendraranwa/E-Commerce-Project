import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
    let cart = {};
    for( let index =0; index < 300+1 ;index++){
        cart[index]=0;
    }
        return cart;}

const ShopContextProvider = (props) =>{
    
    const [cartItems, setCartItems] = useState(getDefaultCart);
    const [all_product, setAll_Product]= useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((resp)=>resp.json())
        .then((data)=>setAll_Product(data));

        if(localStorage.getItem('auth_token')){
            fetch('http://localhost:4000/getcart',{
                 method: 'POST',
                 headers:{
                   Accept: 'application/form-data',
                   'auth-token': `${localStorage.getItem('auth_token')}`,
                   'Content-Type': 'application/json',
                 },
                 body: '',
            }).then((resp)=>resp.json())
            .then((data)=> setCartItems(data));
         };
    },[])
    const AddToCart = (itemId)=>{
      setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}));
      if(localStorage.getItem('auth_token')){
         fetch('http://localhost:4000/addtocart',{
              method: 'POST',
              headers:{
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth_token')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({"itemId": itemId}),
         }).then((resp)=>resp.json())
         .then((data)=> console.log(data));
      };
    };

    const RemoveFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth_token')){
            fetch('http://localhost:4000/removetocart',{
                 method: 'POST',
                 headers:{
                   Accept: 'application/form-data',
                   'auth-token': `${localStorage.getItem('auth_token')}`,
                   'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({"itemId": itemId}),
            }).then((resp)=>resp.json())
            .then((data)=> console.log(data));
         };
      }
    
    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=> product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return totalAmount;
    }

    const getTotalItemsInCart = () =>{
        let totalNumber = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalNumber += cartItems[item]
            }
        }
        return totalNumber;
    }
    
    const ContextValue = {all_product,cartItems,AddToCart,RemoveFromCart,getTotalCartAmount, getTotalItemsInCart}
     

    return <ShopContext.Provider value={ContextValue} >
        {props.children}    
    </ShopContext.Provider>
}

export default ShopContextProvider;