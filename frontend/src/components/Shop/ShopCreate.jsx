
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./ShopCreate.module.css";

import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

function ShopCreate() {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber,setPhoneNumber]=useState()
  const [address,setAddress]=useState();
  const [zipCode,setZipCode]=useState();
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newform = new FormData();
    newform.append("file", avatar);
    newform.append("name", name);
    newform.append("email", email);
    newform.append("password", password);
    newform.append("zipCode", zipCode);
    newform.append("address", address);
    newform.append("phoneNumber", phoneNumber);
   
    axios
      .post(`${server}/shop/create-shop`, newform, config)
      .then(() => {
        toast.success("Go and check your mail for activation");
        setName("");
        setEmail("")
        setPassword("")
        setAvatar()
        setAddress("")
        setPhoneNumber("")
        setZipCode("")

      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
    <center>
      <div
        className={styles.loginContainer}
        style={{ boxSizing: "content-box" }}
      >
        <h4>Register as Seller</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="shop_name"
            name="shop_name"
            required
            placeholder="Shop Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
            style={{ backgroundColor: "white", width: "100%", height: "10%" }}
          />

          <input
            type="number"
            id="number"
            name="number"
            required
            placeholder="Phone Number"
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
            style={{ backgroundColor: "white", width: "100%", height: "10%" }}
          />
           <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            style={{ backgroundColor: "white", width: "100%", height: "10%" }}
          />
           <input
            type="text"
            id="address"
            name="address"
            required
            placeholder="Address"
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            style={{ backgroundColor: "white", width: "100%", height: "10%" }}
          />
           <input
            type="number"
            id="zipCode"
            name="zipCode"
            required
            placeholder="Zip Code"
            onChange={(event) => {
              setZipCode(event.target.value);
            }}
            style={{ backgroundColor: "white", width: "100%", height: "10%" }}
          />
         

          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            style={{ backgroundColor: "white", width: "100%", height: "10%" }}
          />
          <div className={styles.inputFile}>
            <label htmlFor="avatar">
              {" "}
              <RxAvatar className={styles.avataricon} />
            </label>
            <input
              type="file"
              name="avatar"
              id="file-input"
              onChange={(event) => {
                handleFileInputChange(event);
              }}
              style={{
                backgroundColor: "white",
                width: "100%",
                height: "10%",
              }}
              accept=".jpg,.jpeg,.png"
            />
          </div>

          <button type="submit" className="bg-info bg-gradient">
            Register
          </button>
          <div className={styles.signUp}>
            <p>Already have an account</p>

            <Link to="/shop-login">Sign Ip</Link>
          </div>
        </form>
      </div>
    </center>
  </>
  )
}




export default ShopCreate

