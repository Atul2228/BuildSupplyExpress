

import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for active link management
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop, GrUpdate } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";


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
         
          style={{ display: 'flex', alignItems: 'center', padding: '1rem',textDecoration:"none" }}
        >
          <div style={{ color: 'black', fontSize: '30px' }}>{link.icon}</div>
          <h5 className="pl-2 text-black  hidden lg:block" style={{WebkitTextDecorationLine:"none"}}>
            {link.label}
          </h5>
  

         
        </NavLink>
      ))}
    </div>
  );
};

export default AdminSideBar;



