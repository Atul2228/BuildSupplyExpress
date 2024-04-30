

import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";



import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  const {isAuthenticated}=useSelector((state)=>state.user)
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

 

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice * 100,
    0
);

const roundedTotalPrice = (totalPrice / 100).toFixed(2);

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };
 

  return (
        <>
          <section className="pb-4">
            <div className="border rounded-5">
              <section
                className="w-100 p-5 gradient-custom"
                style={{ borderRadius: "5rem .5rem 0 0;" }}
              >
                <div className="row">
                  <div className="col-md-8">
                    <div className="card mb-4" style={{ position: "static" }}>
                      <div className="card-header py-3">
                        <h5 className="mb-0">Cart -  {cart && cart.length} item</h5>
                      </div>
                      <div className="card-body">
                        <div>
                          {cart.map((i, index) => (
                               <CartSingle
                          key={index}
                          data={i}
                          quantityChangeHandler={quantityChangeHandler}
                          removeFromCartHandler={removeFromCartHandler}
                        />  
                          ))}
                        </div>
                       
                      </div>
                    </div>
    
                  
                  </div>
                  <div className="col-md-4">
                    <div className="card mb-4" style={{ position: "static" }}>
                      <div className="card-header py-3">
                        <h5 className="mb-0">Summary</h5>
                      </div>
                      <div className="card-body">
                        <ul className=" list-group-flush">
                          
                          <li className=" d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div>
                              <strong>Total amount</strong>
                              <strong>
                                <p className="mb-0">(including VAT)</p>
                              </strong>
                            </div>
                            <span>
                              <strong>₹{roundedTotalPrice}</strong>
                            </span>
                          </li>
                        </ul>
                        <Link to ="/checkout"
                          type="button"
                          className="btn btn-info btn-lg btn-block"
                        >
                          Go to checkout
                        </Link>
    
                    
                     
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </>
      );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = (data.discountPrice * value).toFixed(2);

  

  const increment = (data) => {
    if (data.stock < value) {
      toast.error('Product stock limited!');
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
          <div
            className="bg-image hover-overlay hover-zoom ripple rounded"
            data-mdb-ripple-color="light"
          >
            <img
              src={`${data?.images[0]?.url}`}
              className="w-100"
              alt="Blue Jeans Jacket"
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
            <strong>{data.name}</strong>
          </p>
          {/* <p>Color: blue</p> */}
          <p>₹{data.discountPrice}</p>
       
          <button
            type="button"
            className="btn btn-danger btn-sm mb-2 w-50"
            data-mdb-toggle="tooltip"
            title="Remove from  wish list"
            onClick={()=>removeFromCartHandler(data)}
          >
           <MdDeleteOutline size={20}  />
          </button>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
          <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
            <button
              className="btn btn-primary px-3 me-2"
              onClick={() => decrement(data)}
            >
              -
            </button>

            <div className="form-outline">
              <input
                id="form1"
                min="0"
                name="quantity"
                value={value}
                type="number"
                className="form-control"
                readOnly
              />
              <label className="form-label" htmlFor="form1">
                Quantity
              </label>
            </div>

            <button
              className="btn btn-primary px-3 ms-2"
              onClick={() => increment(data)}
            >
              +
            </button>
          </div>

          <p className="text-start text-md-center">
            <strong>₹{totalPrice}</strong>
          </p>
        </div>
        <hr className="my-4" />
      
        
      </div>
     
    </>
  );
};

export default Cart;


