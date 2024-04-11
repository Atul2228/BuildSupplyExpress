// import React from 'react'
import { useDispatch, useSelector } from "react-redux";
// import { backend_url } from "../server";
import { toast } from "react-toastify";
// import { addTocart } from "../../redux/actions/cart";
import { removeFromWishlist } from "../../redux/actions/wishlist";

function WishListData({data}) {
    const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();


    const removeFromeWishlistHandler=(data)=>{
        dispatch(removeFromWishlist(data))
      }


      const addToCartHandler = (id) => {
  
        const isItemExists = cart && cart.find((i) => i?._id === id);
        // console.log(i);
        if (isItemExists) {
          toast.error("Item already in cart!");
        } else {
          const cartData = { ...cart,  };
            // dispatch(addToCart(cartData));
            toast.success("Item added to cart successfully!"); 
        }
      }
  return (
 <>
 
 <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img
                   src={`${data?.images[0]?.url}`}
                            className="w-100"
                            alt="Product Image"
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.2)",
                              }}
                            ></div>
                          </a>
                        </div>
                      </div>

                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{data?.name}</strong>
                        </p>
                        <p>{data?.description}</p>
                        <p></p>
                      </div>

                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2 w-100"
                          data-mdb-toggle="tooltip"
                          title="Remove item"
                          onClick={()=>removeFromeWishlistHandler(data)}
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm mb-2 w-100"
                          data-mdb-toggle="tooltip"
                          title="Move to the wish list"
                          onClick={()=>addToCartHandler(data)}
                        >
                          Add To Bag
                        </button>

                        <p className="text-start text-md-center">
                          <strong>${data.discountPrice}</strong>
                        </p>
                      </div>
                      <hr className="my-4" />
 </>
  )
}

export default WishListData
