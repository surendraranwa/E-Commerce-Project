import React, { useContext } from 'react';
import './ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import sort_icon from '../Components/assets/dropdown_icon.png';
import Item from '../Components/Item/Item';
function ShopCategory(props) {
  const {all_product} = useContext(ShopContext);
  return (
    <>
    <div className='shop-category'>
      <img src={props.banner} alt='' className="shopcategory-banner"/>
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12 out of 12 Products</span>
        </p>
        <div className="shopcategory-sort">
        sort by <img src={sort_icon} alt=''/>
      </div>
      </div>
      <div className="shopcategory-products">
        {
          all_product.map((item, i)=>{
            if(props.category === item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }else{
              return null;
            }
        }
      )}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
    </>
  )
}

export default ShopCategory;