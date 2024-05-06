
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import styles from "./ShopCreate.module.css";

// import { RxAvatar } from "react-icons/rx";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";

// function ShopCreate() {
//     const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber,setPhoneNumber]=useState()
//   const [address,setAddress]=useState();
//   const [zipCode,setZipCode]=useState();
//   const [password, setPassword] = useState("");
//   const [avatar, setAvatar] = useState(null);
//   const handleFileInputChange = (event) => {
//     const file = event.target.files[0];
//     setAvatar(file);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const config = { headers: { "Content-Type": "multipart/form-data" } };
//     const newform = new FormData();
//     newform.append("file", avatar);
//     newform.append("name", name);
//     newform.append("email", email);
//     newform.append("password", password);
//     newform.append("zipCode", zipCode);
//     newform.append("address", address);
//     newform.append("phoneNumber", phoneNumber);
   
//     axios
//       .post(`${server}/shop/create-shop`, newform, config)
//       .then(() => {
//         toast.success("Go and check your mail for activation");
//         setName("");
//         setEmail("")
//         setPassword("")
//         setAvatar()
//         setAddress("")
//         setPhoneNumber("")
//         setZipCode("")

//       })
//       .catch((err) => {
//         toast.error(err.response.data.message);
//       });
//   };
//   return (
//     <>
//     <center>
//       <div
//         className={styles.loginContainer}
//         style={{ boxSizing: "content-box" }}
//       >
//         <h4>Register as Seller</h4>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             id="shop_name"
//             name="shop_name"
//             required
//             placeholder="Shop Name"
//             onChange={(event) => {
//               setName(event.target.value);
//             }}
//             style={{ backgroundColor: "white", width: "100%", height: "10%" }}
//           />

//           <input
//             type="number"
//             id="number"
//             name="number"
//             required
//             placeholder="Phone Number"
//             onChange={(event) => {
//               setPhoneNumber(event.target.value);
//             }}
//             style={{ backgroundColor: "white", width: "100%", height: "10%" }}
//           />
//            <input
//             type="email"
//             id="email"
//             name="email"
//             required
//             placeholder="Email"
//             onChange={(event) => {
//               setEmail(event.target.value);
//             }}
//             style={{ backgroundColor: "white", width: "100%", height: "10%" }}
//           />
//            <input
//             type="text"
//             id="address"
//             name="address"
//             required
//             placeholder="Address"
//             onChange={(event) => {
//               setAddress(event.target.value);
//             }}
//             style={{ backgroundColor: "white", width: "100%", height: "10%" }}
//           />
//            <input
//             type="number"
//             id="zipCode"
//             name="zipCode"
//             required
//             placeholder="Zip Code"
//             onChange={(event) => {
//               setZipCode(event.target.value);
//             }}
//             style={{ backgroundColor: "white", width: "100%", height: "10%" }}
//           />
         

//           <input
//             type="password"
//             id="password"
//             name="password"
//             required
//             placeholder="Password"
//             onChange={(event) => {
//               setPassword(event.target.value);
//             }}
//             style={{ backgroundColor: "white", width: "100%", height: "10%" }}
//           />
//           <div className={styles.inputFile}>
//             <label htmlFor="avatar">
//               {" "}
//               <RxAvatar className={styles.avataricon} />
//             </label>
//             <input
//               type="file"
//               name="avatar"
//               id="file-input"
//               onChange={(event) => {
//                 handleFileInputChange(event);
//               }}
//               style={{
//                 backgroundColor: "white",
//                 width: "100%",
//                 height: "10%",
//               }}
//               accept=".jpg,.jpeg,.png"
//             />
//           </div>

//           <button type="submit" className="bg-info bg-gradient">
//             Register
//           </button>
//           <div className={styles.signUp}>
//             <p>Already have an account</p>

//             <Link to="/shop-login">Sign Ip</Link>
//           </div>
//         </form>
//       </div>
//     </center>
//   </>
//   )
// }




// export default ShopCreate



import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [avatar, setAvatar] = useState();
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar();
        setZipCode();
        setAddress("");
        setPhoneNumber();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Shop Name
              </label>
              <div className="mt-1">
                <input
                  type="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone-number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1">
                <input
                  type="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Zip Code
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipcode"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload a file</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/shop-login" className="text-blue-600 pl-2">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;