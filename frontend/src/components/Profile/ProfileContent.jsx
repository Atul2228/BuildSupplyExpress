import React, { useState } from "react";
import { Modal,  Form } from 'react-bootstrap';
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import styles from "../../styles/styles";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import {
  deleteUserAddress,
  loadUser,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { Country, State } from "country-state-city";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
       <>
       <div className="d-flex justify-content-center w-100">
         <div className="position-relative">
           <img
             src={user?.avatar?.url}
             className="w-150 h-150 rounded-circle object-cover border border-success"
             alt=""
             style={{ width: '150px', height: '150px', borderWidth: '3px' }}
           />
           <div className="w-30 h-30 bg-light rounded-circle d-flex align-items-center justify-content-center cursor-pointer position-absolute bottom-0 end-0"
                style={{ width: '30px', height: '30px', right: '5px', bottom: '5px' }}>
             <input
               type="file"
               id="image"
               className="d-none"
               onChange={handleImage}
             />
             <label htmlFor="image" className="m-0">
               <AiOutlineCamera />
             </label>
           </div>
         </div>
       </div>
       <br />
       <br />
       <div className="w-100 px-5">
         <form onSubmit={handleSubmit}>
           <div className="row pb-3">
             <div className="col-md-6 mb-4 mb-md-0">
               <label className="form-label">Full Name</label>
               <input
                 type="text"
                 className="form-control"
                 required
                 value={name}
                 onChange={(e) => setName(e.target.value)}
               />
             </div>
             <div className="col-md-6">
               <label className="form-label">Email Address</label>
               <input
                 type="email" // Changed to 'email' for appropriate validation
                 className="form-control"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
               />
             </div>
           </div>
     
           <div className="row pb-3">
             <div className="col-md-6 mb-4 mb-md-0">
               <label className="form-label">Phone Number</label>
               <input
                 type="tel" // Changed to 'tel' for appropriate validation
                 className="form-control"
                 required
                 value={phoneNumber}
                 onChange={(e) => setPhoneNumber(e.target.value)}
               />
             </div>
     
             <div className="col-md-6">
               <label className="form-label">Enter your password</label>
               <input
                 type="password"
                 className="form-control"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
             </div>
           </div>
           <input
             className="btn btn-primary mt-3"
             required
             value="Update"
             type="submit"
           />
         </form>
       </div>
     </>
     
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};



const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  return (
    <div className="container mt-3">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Status</th>
            <th scope="col">Items Qty</th>
            <th scope="col">Total</th>
            <th scope="col"></th> {/* Empty header for the action column */}
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td className={item.status === "Delivered" ? "text-success" : "text-danger"}>
                {item.status}
              </td>
              <td>{item.cart.length}</td>
              <td>{"₹ " + item.totalPrice}</td>
              <td>
                <Link to={`/user/order/${item._id}`}>
                  <Button variant="link" className="p-0">
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};





const AllRefundOrders = () => {
  const { user } = useSelector(state => state.user);
  const { orders } = useSelector(state => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const eligibleOrders = orders.filter(order => order.status === "Processing refund");

  return (
    <div className="container mt-3">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Items Qty</th>
            <th>Total</th>
            <th></th> {/* For the action column */}
          </tr>
        </thead>
        <tbody>
          {eligibleOrders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td className={order.status === "Delivered" ? "text-success" : "text-warning"}>
                {order.status}
              </td>
              <td>{order.cart.length}</td>
              <td>{`US$ ${order.totalPrice}`}</td>
              <td>
                <Link to={`/user/order/${order._id}`}>
                  <Button variant="outline-primary" size="sm">
                    <AiOutlineArrowRight />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// export default AllRefundOrders;



const TrackOrder = () => {
  const { user } = useSelector(state => state.user);
  const { orders } = useSelector(state => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  return (
    <div className="container mt-3">
      <table className="table table-responsive table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Items Qty</th>
            <th>Total</th>
            <th>Action</th> {/* Added for clarity */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td className={order.status === "Delivered" ? "text-success" : "text-danger"}>
                {order.status}
              </td>
              <td>{order.cart.length}</td>
              <td>{`₹ ${order.totalPrice}`}</td>
              <td>
                <Link to={`/user/track/order/${order._id}`}>
                  <Button variant="outline-primary" size="sm">
                    <MdTrackChanges />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};





const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Password updated successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="container py-5">
      <h1 className="text-2xl text-center font-semibold text-black mb-4">
        Change Password
      </h1>
      <form onSubmit={passwordChangeHandler} className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="oldPassword" className="form-label">Enter your old password</label>
            <input
              id="oldPassword"
              type="password"
              className="form-control"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">Enter your new password</label>
            <input
              id="newPassword"
              type="password"
              className="form-control"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm your new password</label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};





const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [addressType, setAddressType] = useState('');
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  // Assuming addressTypeData is fetched or defined elsewhere
  const addressTypeData = [
    { name: 'Default' },
    { name: 'Home' },
    { name: 'Office' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!addressType || !country || !city) {
      toast.error('Please fill all the fields!');
      return;
    }
    dispatch(updatUserAddress(country, city, address1, address2, zipCode, addressType));
    setOpen(false);
    // Reset form state
    setCountry('');
    setCity('');
    setAddress1('');
    setAddress2('');
    setZipCode('');
    setAddressType('');
  };

  return (
    <>
      <div className="container py-4">
        <h1 className="text-center mb-4">My Addresses</h1>
        <Button variant="primary" onClick={() => setOpen(true)}>
          Add New Address
        </Button>

        {user.addresses.map((item, index) => (
          <div key={index} className="d-flex justify-content-between align-items-center my-3 p-3 shadow-sm">
            <div>{item.addressType}</div>
            <div>{`${item.address1} ${item.address2}`}</div>
            <div>{user.phoneNumber}</div>
            <Button variant="outline-danger "  onClick={() => handleDelete(item)}>
              <AiOutlineDelete />
            </Button>
          </div>
        ))}

        {user.addresses.length === 0 && (
          <div className="text-center mt-5">You do not have any saved addresses!</div>
        )}
      </div>

      <Modal show={open} onHide={() => setOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {/* Country Selector */}
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Select required value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Choose your country</option>
                {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
              </Form.Select>
            </Form.Group>

            {/* City Selector */}
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Select required value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Choose your city</option>
                {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
              </Form.Select>
            </Form.Group>

            {/* Address Line 1 */}
            <Form.Group className="mb-3">
              <Form.Label>Address 1</Form.Label>
              <Form.Control type="text" required value={address1} onChange={(e) => setAddress1(e.target.value)} />
            </Form.Group>

            {/* Address Line 2 */}
            <Form.Group className="mb-3">
              <Form.Label>Address 2</Form.Label>
              <Form.Control type="text" required value={address2} onChange={(e) => setAddress2(e.target.value)} />
            </Form.Group>

            {/* Zip Code */}
            <Form.Group className="mb-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" required value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </Form.Group>

            {/* Address Type Selector */}
            <Form.Group className="mb-3">
              <Form.Label>Address Type</Form.Label>
              <Form.Select required value={addressType} onChange={(e) => setAddressType(e.target.value)}>
                <option value="">Choose address type</option>
                {addressTypeData.map((type) => (
                  <option key={type.name} value={type.name}>{type.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Save Address
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};



export default ProfileContent;
