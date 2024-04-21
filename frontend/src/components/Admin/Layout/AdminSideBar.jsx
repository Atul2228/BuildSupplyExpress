// import React from "react";
// import { FiShoppingBag } from "react-icons/fi";
// import {GrWorkshop} from "react-icons/gr";
// import { RxDashboard } from "react-icons/rx";
// import { CiMoneyBill, CiSettings } from "react-icons/ci";
// import { Link } from "react-router-dom";
// import { HiOutlineUserGroup } from "react-icons/hi";
// import { BsHandbag } from "react-icons/bs";
// import { GrUpdate } from "react-icons/gr";
// // import { MdOutlineLocalOffer } from "react-icons/md";
// import { AiOutlineSetting } from "react-icons/ai";

// const AdminSideBar = ({ active }) => {
//   return (
//     <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10" style={{underLine:"none"}}>
//       {/* single item */}
//       <div className="w-full flex items-center p-4" >
//         <Link to="/admin/dashboard" className="w-full flex items-center">
//           <RxDashboard
//             size={30}
//             color={`${active === 1 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 1 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Dashboard
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/admin-orders" className="w-full flex items-center">
//           <FiShoppingBag
//             size={30}
//             color={`${active === 2 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 2 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Orders
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/admin-sellers" className="w-full flex items-center">
//           <GrWorkshop
//             size={30}
//             color={`${active === 3 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 3 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Sellers
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/admin-users" className="w-full flex items-center">
//           <HiOutlineUserGroup
//             size={30}
//             color={`${active === 4 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 4 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Users
//           </h5>
//         </Link>
//       </div>
//       <div className="w-full flex items-center p-4">
//         <Link to="/Change-Status" className="w-full flex items-center">
//           <GrUpdate
//             size={30}
//             color={`${active === 5 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 5 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//            Update Status
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link to="/admin-products" className="w-full flex items-center">
//           <BsHandbag
//             size={30}
//             color={`${active === 6 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 6 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             All Products
//           </h5>
//         </Link>
//       </div>

    



//       <div className="w-full flex items-center p-4">
//         <Link
//           to="/admin-withdraw-request"
//           className="w-full flex items-center"
//         >
//           <CiMoneyBill
//             size={30}
//             color={`${active === 7 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 7 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Withdraw Request
//           </h5>
//         </Link>
//       </div>

//       <div className="w-full flex items-center p-4">
//         <Link
//           to="/profile"
//           className="w-full flex items-center"
//         >
//           <AiOutlineSetting
//             size={30}
//             color={`${active === 8 ? "crimson" : "#555"}`}
//           />
//           <h5
//             className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
//               active === 8 ? "text-[crimson]" : "text-[#555]"
//             }`}
//           >
//             Settings
//           </h5>
//         </Link>
//       </div>

//     </div>
//   );
// };

// export default AdminSideBar;

import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for active link management
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop, GrUpdate } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
// import styles from "./AdminSideBar.module.css"; // Ensure styles are defined in this CSS module

const AdminSideBar = () => {
  const links = [
    { path: "/admin/dashboard", icon: <RxDashboard />, label: "Dashboard" },
    { path: "/admin-orders", icon: <FiShoppingBag />, label: "All Orders" },
    { path: "/admin-sellers", icon: <GrWorkshop />, label: "All Sellers" },
    { path: "/admin-users", icon: <HiOutlineUserGroup />, label: "All Users" },
    { path: "/Change-Status", icon: <GrUpdate />, label: "Update Status" },
    { path: "/admin-products", icon: <BsHandbag />, label: "All Products" },
    { path: "/admin-withdraw-request", icon: <CiMoneyBill />, label: "Withdraw Request" },
    { path: "/profile", icon: <AiOutlineSetting />, label: "Settings" }
  ];

  return (
    <div className="w-full h-[90vh] bg-white shadow-sm  sticky top-0 left-0 z-10">
      {links.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            ` ${isActive ?  'bg-info text-white' : 'hover:bg-light'}`}
          // className={`p-3 link-dark d-flex align-items-center text-decoration-none ${active === item.id ? 'bg-info text-white' : 'hover:bg-light'}`}
          style={{ display: 'flex', alignItems: 'center', padding: '1rem',textDecoration:"none" }}
        >
          <div style={{ color: 'black', fontSize: '30px' }}>{link.icon}</div>
          <h5 className="pl-2 text-black  hidden lg:block" style={{WebkitTextDecorationLine:"none"}}>
            {link.label}
          </h5>
  

          {/* <div className="text-black" style={{textDecoration:"none"}}>{link.label}</div> */}
        </NavLink>
      ))}
    </div>
  );
};

export default AdminSideBar;

// display: "flex";
// color: "#000";
// padding: "10px 15px";
// gap :"15px";
// transition: "all 0.5s";
// text-decoration: "none";

