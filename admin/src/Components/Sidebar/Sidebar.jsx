
import './Sidebar.css';
import {Link} from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import list_product_icon from '../../assets/Product_list_icon.svg';

function Sidebar() {
  return (
    <>
    <div className="sidebar">
      <Link to={'/addproduct'} className='sidebar-item' style={{textDecoration: 'none'}}>
      <img src={add_product_icon} alt="" />
      <p>Add Product</p>
      </Link>
      <Link to={'/listproduct'} className='sidebar-item' style={{textDecoration: "none"}}>
      <img src={list_product_icon} alt="" />
      <p>List Product</p>
      </Link>
    </div>
    </>
  )
};

export default Sidebar;