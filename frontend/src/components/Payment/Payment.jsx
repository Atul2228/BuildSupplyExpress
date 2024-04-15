import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
// import { RxCross1 } from "react-icons/rx";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    };

    await axios
      .post(`${server}/order/create-order`, order, config)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
        window.location.reload();
      });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymnentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axios
            .post(`${server}/order/create-order`, order, config)
            .then((res) => {
              setOpen(false);
              navigate("/order/success");
              toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios
    .post(`${server}/order/create-order`, order, config)
    .then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.name}
                    className={`${styles.input} !w-[95%] text-[#444]`}
                    value={user && user.name}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input}`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} !h-[35px] !w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",
                          lineHeight: 1.5,
                          color: "#444",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "#444",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <input
                type="submit"
                value="Submit"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* paypal payment */}
      
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Confirm"
                className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">₹{orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">₹{shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">{orderData?.discountPrice? "₹" + orderData.discountPrice : "-"}</h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;











































{/* <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paypal
          </h4>
        </div>

         pay with payement *
        {select === 2 ? (
          <div className="w-full flex border-b">
            <div
              className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              onClick={() => setOpen(true)}
            >
              Pay Now
            </div>
            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                    <PayPalScriptProvider
                      options={{
                        "client-id":
                          "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                      }}
                    >
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        onApprove={onApprove}
                        createOrder={createOrder}
                      />
                    </PayPalScriptProvider>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />


 */}






















// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   CardNumberElement,
//   CardCvcElement,
//   CardExpiryElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// // import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// // import { BsXCircle } from "react-icons/bs"; // Assuming BsXCircle as a replacement for RxCross1 for better compatibility with common icon libraries

// const Payment = () => {
//   const [orderData, setOrderData] = useState([]);
//     const [open, setOpen] = useState(false);
//     const { user } = useSelector((state) => state.user);
//     const navigate = useNavigate();
//     const stripe = useStripe();
//     const elements = useElements();
  
//     useEffect(() => {
//       const orderData = JSON.parse(localStorage.getItem("latestOrder"));
//       setOrderData(orderData);
//     }, []);
  
//     const createOrder = (data, actions) => {
//       return actions.order
//         .create({
//           purchase_units: [
//             {
//               description: "Sunflower",
//               amount: {
//                 currency_code: "USD",
//                 value: orderData?.totalPrice,
//               },
//             },
//           ],
//           // not needed if a shipping address is actually needed
//           application_context: {
//             shipping_preference: "NO_SHIPPING",
//           },
//         })
//         .then((orderID) => {
//           return orderID;
//         });
//     };
  
//     const order = {
//       cart: orderData?.cart,
//       shippingAddress: orderData?.shippingAddress,
//       user: user && user,
//       totalPrice: orderData?.totalPrice,
//     };
  
//     const onApprove = async (data, actions) => {
//       return actions.order.capture().then(function (details) {
//         const { payer } = details;
  
//         let paymentInfo = payer;
  
//         if (paymentInfo !== undefined) {
//           paypalPaymentHandler(paymentInfo);
//         }
//       });
//     };
  
//     const paypalPaymentHandler = async (paymentInfo) => {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
  
//       order.paymentInfo = {
//         id: paymentInfo.payer_id,
//         status: "succeeded",
//         type: "Paypal",
//       };
  
//       await axios
//         .post(`${server}/order/create-order`, order, config)
//         .then((res) => {
//           setOpen(false);
//           navigate("/order/success");
//           toast.success("Order successful!");
//           localStorage.setItem("cartItems", JSON.stringify([]));
//           localStorage.setItem("latestOrder", JSON.stringify([]));
//           window.location.reload();
//         });
//     };
  
//     const paymentData = {
//       amount: Math.round(orderData?.totalPrice * 100),
//     };
  
//     const paymentHandler = async (e) => {
//       e.preventDefault();
//       try {
//         const config = {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         };
  
//         const { data } = await axios.post(
//           `${server}/payment/process`,
//           paymentData,
//           config
//         );
  
//         const client_secret = data.client_secret;
  
//         if (!stripe || !elements) return;
//         const result = await stripe.confirmCardPayment(client_secret, {
//           payment_method: {
//             card: elements.getElement(CardNumberElement),
//           },
//         });
  
//         if (result.error) {
//           toast.error(result.error.message);
//         } else {
//           if (result.paymentIntent.status === "succeeded") {
//             order.paymnentInfo = {
//               id: result.paymentIntent.id,
//               status: result.paymentIntent.status,
//               type: "Credit Card",
//             };
  
//             await axios
//               .post(`${server}/order/create-order`, order, config)
//               .then((res) => {
//                 setOpen(false);
//                 navigate("/order/success");
//                 toast.success("Order successful!");
//                 localStorage.setItem("cartItems", JSON.stringify([]));
//                 localStorage.setItem("latestOrder", JSON.stringify([]));
//                 window.location.reload();
//               });
//           }
//         }
//       } catch (error) {
//         toast.error(error);
//       }
//     };
  
//     const cashOnDeliveryHandler = async (e) => {
//       e.preventDefault();
  
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
  
//       order.paymentInfo = {
//         type: "Cash On Delivery",
//       };
  
//       await axios
//       .post(`${server}/order/create-order`, order, config)
//       .then((res) => {
//         setOpen(false);
//         navigate("/order/success");
//         toast.success("Order successful!");
//         localStorage.setItem("cartItems", JSON.stringify([]));
//         localStorage.setItem("latestOrder", JSON.stringify([]));
//         window.location.reload();
//       });
//     };
  
//   return (
//     <div className="container py-4">
//       <div className="row">
//         <div className="col-md-8">
//           <PaymentInfo
//             user={user}
//             open={open}
//             setOpen={setOpen}
//             onApprove={onApprove}
//             createOrder={createOrder}
//             paymentHandler={paymentHandler}
//             cashOnDeliveryHandler={cashOnDeliveryHandler}
//           />
//         </div>
//         <div className="col-md-4 mt-4 mt-md-0">
//           <CartData orderData={orderData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const PaymentInfo = ({
//   user,
//   open,
//   setOpen,
//   onApprove,
//   createOrder,
//   paymentHandler,
//   cashOnDeliveryHandler,
// }) => {
//   const [select, setSelect] = useState(1);

//   return (
//     <div className="card mb-3">
//       <div className="card-body">
//         {/* Payment Method Selection */}
//         <div className="btn-group mb-3" role="group">
//           <button
//             type="button"
//             className={`btn ${
//               select === 1 ? "btn-primary" : "btn-outline-primary"
//             }`}
//             onClick={() => setSelect(1)}
//           >
//             Card
//           </button>
//           <button
//             type="button"
//             className={`btn ${
//               select === 2 ? "btn-primary" : "btn-outline-primary"
//             }`}
//             onClick={() => setSelect(2)}
//           >
//             PayPal
//           </button>
//           <button
//             type="button"
//             className={`btn ${
//               select === 3 ? "btn-primary" : "btn-outline-primary"
//             }`}
//             onClick={() => setSelect(3)}
//           >
//             Cash
//           </button>
//         </div>

//         {/* Pay with Card */}
//         {select === 1 && (
//           <form onSubmit={paymentHandler}>
//             <div className="mb-3">
//               <label htmlFor="cardName" className="form-label">
//                 Name on Card
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="cardName"
//                 placeholder={user && user.name}
//               />
//             </div>
//             <div className="row">
//               <div className="col">
//                 <label htmlFor="cardNumber" className="form-label">
//                   Card Number
//                 </label>
//                 {/* Integration with Stripe's CardNumberElement */}
//                 <CardNumberElement className="form-control" />
//               </div>
//               <div className="col">
//                 <label htmlFor="cardExpiry" className="form-label">
//                   Exp Date
//                 </label>
//                 {/* Integration with Stripe's CardExpiryElement */}
//                 <CardExpiryElement className="form-control" />
//               </div>
//               <div className="col">
//                 <label htmlFor="cardCVC" className="form-label">
//                   CVC
//                 </label>
//                 {/* Integration with Stripe's CardCvcElement */}
//                 <CardCvcElement className="form-control" />
//               </div>
//             </div>
//             <button type="submit" className="btn btn-success mt-3">
//               Submit Payment
//             </button>
//           </form>
//         )}

//         {/* Pay with PayPal */}
//         {select === 2 && (
//           <div>
//             <button className="btn btn-warning" onClick={() => setOpen(true)}>
//               Pay with PayPal
//             </button>
//             {open && (
//               <div className="modal show d-block" tabIndex="-1">
//                 <div className="modal-dialog">
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h5 className="modal-title">PayPal Payment</h5>
//                       <button
//                         type="button"
//                         className="btn-close"
//                         onClick={() => setOpen(false)}
//                       ></button>
//                     </div>
//                     <div className="modal-body">
//                       <PayPalScriptProvider
//                         options={{ "client-id": "your-client-id" }}
//                       >
//                         <PayPalButtons
//                           style={{ layout: "vertical" }}
//                           onApprove={onApprove}
//                           createOrder={createOrder}
//                         />
//                       </PayPalScriptProvider>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="modal-backdrop show"></div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Cash on Delivery */}
//         {select === 3 && (
//           <form onSubmit={cashOnDeliveryHandler}>
//             <div className="alert alert-info">
//               You have selected to pay with cash on delivery.
//             </div>
//             <button type="submit" className="btn btn-success">
//               Confirm Order
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// const CartData = ({ orderData }) => {
//   const shipping = orderData?.shipping?.toFixed(2);
//   return (
//     <div className="card">
//       <div className="card-header">Order Summary</div>
//       <ul className="list-group list-group-flush">
//         <li className="list-group-item d-flex justify-content-between align-items-center">
//           Subtotal:
//           <span className="badge bg-primary rounded-pill">
//             ${orderData?.subTotalPrice}
//           </span>
//         </li>
//         <li className="list-group-item d-flex justify-content-between align-items-center">
//           Shipping:
//           <span className="badge bg-primary rounded-pill">${shipping}</span>
//         </li>
//         <li className="list-group-item d-flex justify-content-between align-items-center">
//           Discount:
//           <span className="badge bg-primary rounded-pill">
//             {orderData?.discountPrice ? `$${orderData?.discountPrice}` : "-"}
//           </span>
//         </li>
//       </ul>
//       <div className="card-footer text-end">
//         Total: <strong>${orderData?.totalPrice}</strong>
//       </div>
//     </div>
//   );
// };

// export default Payment;

