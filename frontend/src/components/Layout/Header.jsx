
import { FaRegUserCircle, FaRegHeart } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import Categories from "./CategoriesDropDown";
import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { isSeller } = useSelector(state => state.seller);

  return (
    <>
      <div className="bg-white h-14 flex items-center">
    <div className="max-w-4xl mx-auto px-2 sm:px-2 lg:px-3">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <Link to="/">
              <img className="h-16" src="/Images/image2.png" alt="Site Logo"/>
            </Link>
            <Link to="/">
              <img className="h-20" src="/Images/logo3.png" alt="Site Logo"/>
            </Link>
            {isSeller ? (
              <Link to="/dashboard" className="btn btn-dark rounded-md px-4 py-2 bg-black text-white">
                Dashboard
              </Link>
            ) : (
              <Link to="/shop-create" className="btn btn-dark rounded-md px-4 py-2 bg-black text-white">
                Become a Seller
              </Link>
            )}
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
};

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const { wishlist } = useSelector(state => state.wishlist);
  const { cart } = useSelector(state => state.cart);

  return (
    <nav className="bg-info py-2 border-b border-gray-300 sticky top-0 w-full z-10 text-white shadow-sm">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <ul className="flex space-x-8">
          <li className="nav-item">
            <Link to="#" className="nav-link px-2 text-white font-semibold">
              <Categories />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-white font-semibold">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link px-2 text-white font-semibold">Products</Link>
          </li>
          <li className="nav-item">
            <Link to="/faq" className="nav-link px-2 text-white font-semibold">FAQs</Link>
          </li>
        </ul>
        <ul className="flex space-x-4">
          <li className="nav-item relative">
            <Link to="/wishlist" className="nav-link px-3">
              <FaRegHeart size={30} />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{wishlist.length}</span>
              )}
            </Link>
          </li>
          <li className="nav-item relative">
            <Link to="/bag" className="nav-link px-3">
              <IoBagHandle size={30} />
              {cart && cart.length > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{cart.length}</span>
              )}
            </Link>
          </li>
          <li className="nav-item">
            {isAuthenticated ? (
              <Link to="/profile" className="nav-link px-3">
                <img src={user.avatar?.url} alt="User Avatar" width="40" height="40" className="rounded-full" />
              </Link>
            ) : (
              <Link to="/login" className="nav-link px-3">
                <FaRegUserCircle size={30} />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

















