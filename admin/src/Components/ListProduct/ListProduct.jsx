import { useEffect, useState } from 'react';
import './ListProduct.css';
import remove_icon from '../../assets/cross_icon.png'

function ListProduct() {
  const [allproducts, setAllproducts]= useState([]);

  const fetchInfo = async ()=>{
   await fetch('http://localhost:4000/allproducts')
   .then((res)=>res.json())
   .then((data)=>{setAllproducts(data)})
  };

  const RemoveProduct = async (id) =>{
    await fetch('http://localhost:4000/removeproduct',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    });
    await fetchInfo();
  }

  useEffect(()=>{
    fetchInfo()
  },[]);
  return (
    <>
    <div className="listproduct">
      <h1>All Products List</h1>
      <div className="listproduct_format_main">
          <p>Product</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Delete</p>
          <hr/>
      </div>
      {allproducts.map((products,index)=>{
        return <>
        <div className="listproduct_format_main listproduct_format" key={index}>
          <img src={products.image} alt="" className="listproduct_product_icon" />
          <p>{products.name}</p>
          <p>{products.old_price}</p>
          <p>{products.new_price}</p>
          <p>{products.category}</p>
          <img src={remove_icon} alt="" className="listproduct_remove_icon" onClick={()=>RemoveProduct(products.id)}/>
          <hr/>
      </div>
        </>
      })}
    </div>
    </>
  )
}

export default ListProduct;