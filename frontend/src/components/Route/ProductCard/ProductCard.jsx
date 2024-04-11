

import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoBagHandle } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "./ProductCard.module.css";
import {AiOutlineEye, 
} from "react-icons/ai";
import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart,removeFromCart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ data, isEvent }) => {
  const [clickh, setClickh] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  
  const [open, setOpen] = useState(false);
  const [clickb, setClickb] = useState(false);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClickh(true);
    } else {
      setClickh(false);
    }
    if (cart && cart.find((i) => i._id === data._id)) {
      setClickb(true);
    } else {
      setClickb(false);
    }
  }, [wishlist]);

 
  const removeFromWishlistHandler = (data) => {
    setClickh(!clickh);
    dispatch(removeFromWishlist(data));
  };
  const addToWishlistHandler = (data) => {
    setClickh(!clickh);
    dispatch(addToWishlist(data));
  };


  const addToCartHandler = (data) => {
    const cartData = { ...data, qty: 1 };
    setClickb(!clickb);
    dispatch(addTocart(cartData));
    toast.success("Item added to cart successfully!");
  };

  const removeFromCartHandler = (data) => {
    setClickb(!clickb);
    dispatch(removeFromCart(data));
  };



  return (
    <div className="card  ">
       <div className={styles.card}>
      <div className="position-relative">
        <Link to={`${`/product/${data._id}`}`}>
          <img src={data.images && data.images[0]?.url} alt="" className="card-img-top" style={{height:"200px"}}/>
        </Link>
       <div style={{backgroundColor:"white"}}>
   

       </div>
      </div>
      <div className="card-body">
        <Link to={`/shop/preview/${data?.shop._id}`} className="text-decoration-none">
         
        </Link>
        <Link to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`} className="text-decoration-none">
        
            <h5 className={styles.name}>
                  {data.name.length > 20
                    ? data.name.slice(0, 20) + "...."
                    : data.name}
                </h5>
        </Link>
        <Ratings rating={data?.ratings} />
       
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-bold">{data.discountPrice}$</span>
            {data.originalPrice ? <span className="text-muted text-decoration-line-through ms-2">{data.originalPrice}$</span> : null}
          </div>
          <span className={styles.discount} style={{ marginLeft: "3%" }}>
                  Sold {data.sold_out}
                </span>
        </div>
      </div>
      <div className="card-footer bg-white border-0">
        <div className="d-flex justify-content-between">
        {clickh  ? (
                    <FaHeart
                      size={20}
                      color="red"
                      onClick={() =>removeFromWishlistHandler(data)}
                      
                      title="remove from wishlist"
                      style={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <FaRegHeart
                      size={20}
                
                      onClick={() => addToWishlistHandler(data)}
                      title="Add to Wishlist"
                      style={{ cursor: 'pointer' }}
                    />
                  )}
          <AiOutlineEye
            size="22"
            onClick={() => setOpen(!open)}
            style={{ cursor: 'pointer' }}
            title="Quick view"
          />
                     <span className="buy" style={{ cursor: "pointer" }}>
                 
                  {clickb ? (
                    <IoBagHandle
                      size={30}
                      // classNameName="cursor-pointer absolute right-2 top-5"
                      onClick={() => removeFromCartHandler(data)}
                      title="Remove From cart"
                    />
                  ) : (
                    <IoBagHandleOutline
                      size={30}
                     // classNameName="cursor-pointer absolute right-2 top-5"
                     onClick={() => addToCartHandler(data)}
                     title="Add to cart"
                   />
                )}
                </span>
        </div>
        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
      </div>
    </div>
  );
};
export default ProductCard;



