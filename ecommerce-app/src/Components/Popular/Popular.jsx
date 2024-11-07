import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item.jsx';
// import data_product from '../assets/data';

function Popular() {
  const [popularProducts, setPopularProducts]= useState([]);

  useEffect(()=>{
      fetch('http://localhost:4000/popularInWomen')
      .then((resp)=>resp.json())
      .then((data)=>setPopularProducts(data));
  },[]);
  return (
    <>
    <div className='popular'>
        <h1> Popular In Womens</h1>
        <hr/>
        <div className='popular-item'>
            {popularProducts.map((item, i)=>{
               return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
    </>
  )
}

export default Popular