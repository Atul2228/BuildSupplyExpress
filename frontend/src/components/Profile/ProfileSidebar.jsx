// import React from "react";
// import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
// import {
//   MdOutlineAdminPanelSettings,
//   MdOutlineTrackChanges,
// } from "react-icons/md";
// // import {
// //     MdOutlineAdminPanelSettings,
// //     MdOutlinePassword,
// //     MdOutlineTrackChanges,
// //   } from "react-icons/md";
// import { TbAddressBook } from "react-icons/tb";
// import { RxPerson } from "react-icons/rx";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { server } from "../../server";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";

// import styles from "./SideBarPage.module.css";
// import { useState } from "react";
// import { FaBars } from "react-icons/fa";
// function ProfileSidebar({ setActive, active }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);
//   const logoutHandler = () => {
//     axios
//       .get(`${server}/user/logout`, { withCredentials: true })
//       .then((res) => {
//         toast.success(res.data.message);
//         window.location.reload(true);
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log(error.response.data.message);
//       });
//   };
//   return (
//     <>
//       <div
//         style={{ width: isOpen ? "300px" : "50px" }}
//         className={styles.sidebar}
//       >
//         <div className={styles.topSection}>
//           {/* <h1 style={{display: isOpen ? "block" : "none"}} className={styles.logo}></h1> */}
//           <div
//             style={{ marginLeft: isOpen ? "50px" : "0px" }}
//             className={styles.bars}
//           >
//             <FaBars onClick={toggle} />
//           </div>
//         </div>

//         <div>
//           <Link
//             onClick={() => setActive(1)}
//             className={styles.link}
//             activeclassName={styles.active}
//           >
//             <div className={styles.icon} onClick={() => setActive(1)}>
//               {" "}
//               <RxPerson size={20} color={active === 1 ? "red" : ""} />
//             </div>
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className={styles.linkText}
//             >
//               {" "}
//               Profile
//             </div>
//           </Link>
//         </div>
//         <div>
//           <Link
//             onClick={() => setActive(2)}
//             className={styles.link}
//             activeclassName={styles.active}
//           >
//             <div className={styles.icon} onClick={() => setActive(2)}>
//               <HiOutlineShoppingBag
//                 size={20}
//                 color={active === 2 ? "red" : ""}
//               />
//             </div>
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className={styles.linkText}
//             >
//               {" "}
//               Orders
//             </div>
//           </Link>
//         </div>
//         <div>
//           <Link
//             onClick={() => setActive(3)}
//             className={styles.link}
//             activeclassName={styles.active}
//           >
//             <div className={styles.icon} onClick={() => setActive(3)}>
//               {" "}
//               <HiOutlineReceiptRefund
//                 size={20}
//                 color={active === 3 ? "red" : ""}
//               />
//             </div>
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className={styles.linkText}
//             >
//               {" "}
//               Refunds
//             </div>
//           </Link>
//         </div>

//         <div>
//           <Link
//             onClick={() => setActive(5)}
//             className={styles.link}
//             activeclassName={styles.active}
//           >
//             <div className={styles.icon} onClick={() => setActive(5)}>
//               <MdOutlineTrackChanges
//                 size={20}
//                 color={active === 5 ? "red" : ""}
//               />
//             </div>
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className={styles.linkText}
//             >
//               Track order
//             </div>
//           </Link>
//         </div>
//         <div>
//           <Link
//             onClick={() => setActive(6)}
//             className={styles.link}
//             activeclassName={styles.active}
//           >
//             <div className={styles.icon} onClick={() => setActive(6)}>
//               {" "}
//               <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
//             </div>
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className={styles.linkText}
//             >
//               {" "}
//               Change Password
//             </div>
//           </Link>
//         </div>
//         <div>
//           <Link
//             onClick={() => setActive(7)}
//             className={styles.link}
//             activeclassName={styles.active}
//           >
//             <div className={styles.icon} onClick={() => setActive(7)}>
//               {" "}
//               <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
//             </div>
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className={styles.linkText}
//             >
//               {" "}
//               Address
//             </div>
//           </Link>
//         </div>
//         <div>
//         {user && user?.role === "Admin" && (
//           <Link to="/admin/dashboard"   className={styles.link}
//           activeclassName={styles.active}>
          
//             <div className={styles.icon} onClick={() => setActive(8)}>
//               {" "}
//               <MdOutlineAdminPanelSettings
//               size={20}
//               color={active === 8 ? "red" : ""}
//             />
//             </div>
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className={styles.linkText}
//             >
              
//               Dashboard
//             </div>
//           </Link>
//         )}
//         </div>

//         <div>
//           <Link
//             onClick={logoutHandler}
//             className={styles.link}
//             activeclassName={styles.active}
//           >
//             <div className={styles.icon}>
//               {" "}
//               <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
//             </div>
//             <div
//               style={{ display: isOpen ? "block" : "none" }}
//               className={styles.divText}
//               color={active === 8 ? "red" : ""}
//             >
//               Logout
//             </div>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProfileSidebar;















import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';
import { BsList } from 'react-icons/bs';
import { AiOutlineLogin } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { MdOutlineAdminPanelSettings, MdOutlineTrackChanges } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { RxPerson } from 'react-icons/rx';

function ProfileSidebar({ setActive, active }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  // className="w-full h-[90vh] bg-white shadow-lg  sticky top-0 left-0 z-10"

  return (
    <div className={`d-flex flex-column ${isOpen ? 'w-25' : 'w-auto'} vh-100 bg-white shadow-lg sticky top-0 left-0 z-10`}>
      <div className="p-3">
        <BsList
          size={30}
          onClick={toggle}
          className="cursor-pointer"
          style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }}
        />
      </div>

      {[
        { id: 1, icon: <RxPerson size={20} />, label: 'Profile' },
        { id: 2, icon: <HiOutlineShoppingBag size={20} />, label: 'Orders' },
        // { id: 3, icon: <HiOutlineReceiptRefund size={20} />, label: 'Refunds' },
        { id: 5, icon: <MdOutlineTrackChanges size={20} />, label: 'Track Order' },
        { id: 6, icon: <RiLockPasswordLine size={20} />, label: 'Change Password' },
        { id: 7, icon: <TbAddressBook size={20} />, label: 'Address' },
        { id: 8,path:"/admin/dashboard", icon: <MdOutlineAdminPanelSettings size={20} />, label: 'Dashboard', condition: user && user.role === 'Admin' },
        { id: 9, icon: <AiOutlineLogin size={20} />, label: 'Logout', action: logoutHandler },
      ].map((item, index) => (
        item.condition !== false && (
          <Link
            key={index}
            to={item.path}
            onClick={() => { item.action ? item.action() : setActive(item.id); }}
            className={`p-3 link-dark d-flex align-items-center text-decoration-none ${active === item.id ? 'bg-info text-white' : 'hover:bg-light'}`}
          >
            {item.icon}
            {isOpen && <span className="ms-3">{item.label}</span>}
          </Link>
        )
      ))}
    </div>
  );
}

export default ProfileSidebar;




