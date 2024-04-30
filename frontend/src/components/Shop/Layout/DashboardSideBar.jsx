

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink for active link management
import { FaBars, FaShoppingBag, FaTh, FaMoneyBillWave } from "react-icons/fa";
import { GoPackage } from "react-icons/go";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { RiRefund2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import styles from "./DashBoardSideBar.module.css";

function DashBoardSideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    // Define navigation links with icons
    const links = [
        { path: '/dashboard', icon: <FaTh />, label: 'Dashboard' },
        { path: '/dashboard-orders', icon: <FaShoppingBag />, label: 'All Orders' },
        { path: '/dashboard-products', icon: <GoPackage />, label: 'All Products' },
        { path: '/dashboard-create-product', icon: <HiOutlineFolderAdd />, label: 'List Product' },
        { path: '/dashboard-withdraw-money', icon: <FaMoneyBillWave />, label: 'Withdraw Money' },
        // { path: '/dashboard-refunds', icon: <RiRefund2Line />, label: 'Refunds' },
        { path: '/settings', icon: <IoSettingsOutline />, label: 'Settings' }
    ];

    return (
        <div className={`d-flex flex-column ${isOpen ? 'w-auto' : 'w-25'} vh-100 bg-white shadow sticky top-8 left-0 z-10`}>
            <div className="p-3">
                <FaBars size={30} onClick={toggleSidebar} className="cursor-pointer" style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }} />
            </div>
            {links.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    // className={({ isActive }) =>
                    // ` ${isActive ?  'bg-info text-white' : 'hover:bg-light'}`}
                    className={({ isActive }) => isActive ? `bg-info text-white ${styles.link}` : `hover:bg-light ${styles.link}`}
                    style={{ color: 'inherit', textDecoration: 'none' }} // Maintain color and decoration
                    onClick={() => setIsOpen(false)} // Optionally close the sidebar on click
                >
                    <div className={styles.icon}>{link.icon}</div>
                    {isOpen && <div className={styles.linkText}>{link.label}</div>}
                </NavLink>
            ))}
        </div>
    );
}

export default DashBoardSideBar;
