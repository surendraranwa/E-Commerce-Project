import './AddProduct.css';
import Upload_img from '../../assets/upload_area.svg';
import { useState } from 'react';

function AddProduct() {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name : '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });

  const imageHandle = (e)=>{
    setImage(e.target.files[0]);
  }
  const changeHandle =(e)=>{
    setProductDetails({...productDetails, [e.target.name]: e.target.value})
 }

 const Add_product = async ()=>{
  // console.log(productDetails);
  let responseData;
  let product = productDetails;
  let formData = new FormData();
  formData.append('product', image);
  await fetch('http://localhost:4000/upload',{
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: formData,
  }).then((resp)=>resp.json()).then((data)=> {responseData = data});
  if(responseData.success){
    product.image = responseData.image_url;
    console.log(product);
    await fetch('http://localhost:4000/addproduct',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(product),
    }).then((resp)=>resp.json()).then((data)=> {
      data.success? alert('Product Added'):alert("Failed")
    });
  }
 }
  return (
    <>
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandle} type='text' name='name' placeholder='Type Here'/>
      </div>
      <div className="addproduct-price">
      <div className="addproduct-itemfield">
        <p>Price</p>
        <input type='text' value={productDetails.old_price} onChange={changeHandle}  name='old_price' placeholder='Type Here'/>
      </div>
      <div className="addproduct-itemfield">
        <p>Offer Price</p>
        <input type='text' value={productDetails.new_price} onChange={changeHandle}  name='new_price' placeholder='Type Here'/>
      </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name='category' value={productDetails.category} onChange={changeHandle} className='addproduct-selector'>
          <option value='women'>Women</option>
          <option value='men'>Men</option>
          <option value='kid'>Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : Upload_img} alt="" className='addproduct-thumbnail-img'/>
        </label>
        <input type='file' onChange={imageHandle} name='file-input' id='file-input' hidden/>
      </div>
      <button onClick={()=>(Add_product())} className="addproduct-btn">ADD</button>
    </div>
    </>
  )
}

export default AddProduct;