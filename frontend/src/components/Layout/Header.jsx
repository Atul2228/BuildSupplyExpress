import React from "react";
import { Link } from "react-router-dom";
// import styles from "../../styles/styles";
// import { categoriesData, productData } from "../../static/data";
// import {
//   AiOutlineHeart,
//   AiOutlineSearch,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
// import { BiMenuAltLeft } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
// import DropDown from "./DropDown";
// import Navbar from "./Navbar";
import { useSelector } from "react-redux";
// import Cart from "../cart/Cart";
// import Wishlist from "../Wishlist/Wishlist";
// import { RxCross1 } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";





import { FaRegHeart } from "react-icons/fa6";
import Categories from "./CategoriesDropDown";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  // const { allProducts } = useSelector((state) => state.products);
 





  return (

    <nav className="py-2  border-bottom bg-info text-white  shadow-sm" style={{
      position: 'sticky',
      top: 0,
      width: '100%',
      backgroundColor: '#f9f9f9',
      padding: '10px 0',
      zIndex: 1000,
      borderBottom: '1px solid #ccc'
  }}>
    <div className="container d-flex flex-wrap ">
  
      <ul className="nav me-auto">
        

      {/* <Link
           to="/"
            className="nav-link link-body-emphasis px-2 active"
            aria-current="page"
          >
            
          </Link> */}
        <li className="nav-item">
          <Link
            to="#"
            className="nav-link link-body-emphasis px-2 active"
            aria-current="page"
          >
            {/* category */}
            <Categories></Categories>
          </Link>
        </li>
        <li className="nav-item">
          <Link
           to="/"
            className="nav-link link-body-emphasis px-2 active"
            aria-current="page"
          >
            Home
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="#" className="nav-link link-body-emphasis px-2"></Link>
        </li> */}
        <li className="nav-item">
          <Link to="/products" className="nav-link link-body-emphasis px-2">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/faq" className="nav-link link-body-emphasis px-2">
            FAQs
          </Link>
        </li>
        <li className="nav-item">
        
            {isSeller ? (
            <Link to="/dashboard">
             <button className="btn btn-dark " style={{borderRadius:"5px"}}>DashBoard</button>
            </Link>
          ) : (
            (
            (
              <Link to="/shop-create">
                      <button className="btn btn-dark " style={{borderRadius:"5px"}}>Become a Seller</button>
              </Link>
            ))
          )}
        </li>
      </ul>
      <ul className="nav">
        <li className="nav-item">
          <Link to="/wishlist" className="nav-link link-body-emphasis px-3">
            <div className="bag">
              <span className="position-absolute top-5  translate-middle badge rounded-pill bg-danger">
                {wishlist && wishlist.length}<span className="visually-hidden">unread messages</span>
              </span>
              <FaRegHeart size={30} />
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/bag" className="nav-link link-body-emphasis px-3">
            <div className="bag">
             
              <IoBagHandle size={30}></IoBagHandle>
              <span className="position-absolute top-5  translate-middle badge rounded-pill bg-danger">
                {cart && cart.length}<span className="visually-hidden">unread messages</span>
              </span>
            </div>
          </Link>
        </li>
        <li className="nav-item">
          {isAuthenticated ? (
            <Link to="/profile">
              <img
               src={`${user.avatar?.url}`}
                alt="loading....."
                width="40"
                // height="40"
                className="rounded-circle"
              ></img>
            </Link>
          ) : (
            (console.log(isAuthenticated),
            (
              <Link to="/login">
                <FaRegUserCircle size={30} />
              </Link>
            ))
          )}
        </li>
      </ul>
    </div>
  </nav>

  );
};

export default Header;



