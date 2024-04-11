// import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { IoBagHandleOutline } from "react-icons/io5";
// import { HiOutlineMinus, HiPlus } from "react-icons/hi";
// import styles from "../../styles/styles";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addTocart, removeFromCart } from "../../redux/actions/cart";
// import { toast } from "react-toastify";

// const Cart = ({ setOpenCart }) => {
//   const { cart } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();

//   const removeFromCartHandler = (data) => {
//     dispatch(removeFromCart(data));
//   };

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.qty * item.discountPrice,
//     0
//   );

//   const quantityChangeHandler = (data) => {
//     dispatch(addTocart(data));
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
//       <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
//         {cart && cart.length === 0 ? (
//           <div className="w-full h-screen flex items-center justify-center">
//             <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
//               <RxCross1
//                 size={25}
//                 className="cursor-pointer"
//                 onClick={() => setOpenCart(false)}
//               />
//             </div>
//             <h5>Cart Items is empty!</h5>
//           </div>
//         ) : (
//           <>
//             <div>
//               <div className="flex w-full justify-end pt-5 pr-5">
//                 <RxCross1
//                   size={25}
//                   className="cursor-pointer"
//                   onClick={() => setOpenCart(false)}
//                 />
//               </div>
//               {/* Item length */}
//               <div className={`${styles.noramlFlex} p-4`}>
//                 <IoBagHandleOutline size={25} />
//                 <h5 className="pl-2 text-[20px] font-[500]">
//                   {cart && cart.length} items
//                 </h5>
//               </div>

//               {/* cart Single Items */}
//               <br />
//               <div className="w-full border-t">
//                 {cart &&
//                   cart.map((i, index) => (
//                     <CartSingle
//                       key={index}
//                       data={i}
//                       quantityChangeHandler={quantityChangeHandler}
//                       removeFromCartHandler={removeFromCartHandler}
//                     />
//                   ))}
//               </div>
//             </div>

//             <div className="px-5 mb-3">
//               {/* checkout buttons */}
//               <Link to="/checkout">
//                 <div
//                   className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
//                 >
//                   <h1 className="text-[#fff] text-[18px] font-[600]">
//                     Checkout Now (USD${totalPrice})
//                   </h1>
//                 </div>
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
//   const [value, setValue] = useState(data.qty);
//   const totalPrice = data.discountPrice * value;

//   const increment = (data) => {
//     if (data.stock < value) {
//       toast.error("Product stock limited!");
//     } else {
//       setValue(value + 1);
//       const updateCartData = { ...data, qty: value + 1 };
//       quantityChangeHandler(updateCartData);
//     }
//   };

//   const decrement = (data) => {
//     setValue(value === 1 ? 1 : value - 1);
//     const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
//     quantityChangeHandler(updateCartData);
//   };

//   return (
//     <div className="border-b p-4">
//       <div className="w-full flex items-center">
//         <div>
//           <div
//             className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
//             onClick={() => increment(data)}
//           >
//             <HiPlus size={18} color="#fff" />
//           </div>
//           <span className="pl-[10px]">{data.qty}</span>
//           <div
//             className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
//             onClick={() => decrement(data)}
//           >
//             <HiOutlineMinus size={16} color="#7d879c" />
//           </div>
//         </div>
//         <img
//           src={`${data?.images[0]?.url}`}
//           alt=""
//           className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
//         />
//         <div className="pl-[5px]">
//           <h1>{data.name}</h1>
//           <h4 className="font-[400] text-[15px] text-[#00000082]">
//             ${data.discountPrice} * {value}
//           </h4>
//           <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
//             US${totalPrice}
//           </h4>
//         </div>
//         <RxCross1
//           className="cursor-pointer"
//           onClick={() => removeFromCartHandler(data)}
//         />
//       </div>
//     </div>
//   );
// };

// export default Cart;


















import React, { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
// import { IoBagHandleOutline } from "react-icons/io5";
// import { HiOutlineMinus, HiPlus } from "react-icons/hi";
// import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";


// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addTocart, removeFromCart } from '../../redux/actions/cart';
// import { addToCart, removeFromCart } from "../../redux/actions/cart";
// import { addTocart, removeFromCart } from "../../redux/actions/cart";

// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// Assuming we continue to use React Icons for consistency
// import { RxCross1 } from 'react-icons/rx';
// import { IoBagHandleOutline } from 'react-icons/io5';
// import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
// import { backend_url } from '../server';
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  const {isAuthenticated}=useSelector((state)=>state.user)
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };
  const handleCheckOut=()=>{
    toast.error('you are not logged in')
  }

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
    
                    {/* <div className="card mb-4 mb-lg-0">
                      <div className="card-body">
                        {/* <p>
                          <strong>We accept</strong>
                        </p> *
                        <img
                          className="me-2"
                          width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                          alt="Visa"
                        />
                        <img
                          className="me-2"
                          width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                          alt="American Express"
                        />
                        <img
                          className="me-2"
                          width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                          alt="Mastercard"
                        />
                        <img
                          className="me-2"
                          width="45px"
                          src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                          alt="PayPal acceptance mark"
                        />
                      </div>
                    </div> */}
                  </div>
                  <div className="col-md-4">
                    <div className="card mb-4" style={{ position: "static" }}>
                      <div className="card-header py-3">
                        <h5 className="mb-0">Summary</h5>
                      </div>
                      <div className="card-body">
                        <ul className=" list-group-flush">
                          {/* <li className=" d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                            Total Products
                            <span>{}</span>
                          </li>
                          <li className=" d-flex justify-content-between align-items-center px-0">
                            Shipping
                            <span>Gratis</span>
                          </li> */}
                          <li className=" d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                            <div>
                              <strong>Total amount</strong>
                              <strong>
                                <p className="mb-0">(including VAT)</p>
                              </strong>
                            </div>
                            <span>
                              <strong>${totalPrice}</strong>
                            </span>
                          </li>
                        </ul>
                        <Link to ="/checkout"
                          type="button"
                          className="btn btn-info btn-lg btn-block"
                        >
                          Go to checkout
                        </Link>
    
                       {/* {
                        isAuthenticated ?(
                           <Link to ="/checkout"
                          type="button"
                          className="btn btn-primary btn-lg btn-block"
                        >
                          Go to checkout
                        </Link>
                        ):(
                          <p 
                          type="button"
                          className="btn btn-primary btn-lg btn-block"
                          onClick={handleCheckOut}
                        >
                          Go to checkout
                        </p>
                        )
                       } */}
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
  const totalPrice = data.discountPrice * value;

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
          <p>${data.discountPrice}</p>
          {/* <button
            type="button"
            className="btn btn-primary btn-sm me-1 mb-2"
            data-mdb-toggle="tooltip"
            title="Remove item"
          >
            <i className="fas fa-trash"></i>
          </button> */}
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
            <strong>{totalPrice}</strong>
          </p>
        </div>
        <hr className="my-4" />
      
        
      </div>
     
    </>
  );
};

export default Cart;


