
// import { GoPackage } from "react-icons/go";
// import { IoSettingsOutline } from "react-icons/io5";
// import { HiOutlineFolderAdd } from "react-icons/hi";
// import { FaRegMessage } from "react-icons/fa6";
// import { RiRefund2Line } from "react-icons/ri";
// import { FaMoneyBillWave } from "react-icons/fa6";
// import { Link} from 'react-router-dom';
// import styles from "./DashBoardSideBar.module.css";
// import  { useState } from 'react';
// import {
//     FaTh,
//     FaBars,
//     // FaUserAlt,
//     // FaRegChartBar,
//     // FaCommentAlt,
//     FaShoppingBag,
//     // FaThList
// }from "react-icons/fa";
// function DashBoardSideBar() {
//     const[isOpen ,setIsOpen] = useState(false);
//     const toggle = () => setIsOpen (!isOpen);
//   return (
//    <>
//          <div style={{width: isOpen ? "300px" : "50px"}} className={styles.sidebar}>
//                <div className={styles.topSection}>
//                    {/* <h1 style={{display: isOpen ? "block" : "none"}} className={styles.logo}></h1> */}
//                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className={styles.bars}>
//                        <FaBars onClick={toggle}/>
//                    </div>
//                </div>



               
//                   <div>
//                        <Link to="/dashboard"   className={styles.link} activeclassName={styles.active} >
//                            <div className={styles.icon}><FaTh/></div>
//                            <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>Dashboard</div>

//                        </Link>
//                   </div>
//                   <div>
//                        <Link  to="/dashboard-orders"   className={styles.link} activeclassName={styles.active} >
//                            <div className={styles.icon}><FaShoppingBag />
// </div>
//                            <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>All Orders</div>

//                        </Link>
//                   </div>
//                   <div>
//                        <Link  to="/dashboard-products"   className={styles.link} activeclassName={styles.active} >
//                            <div className={styles.icon}><GoPackage />
// </div>
//                            <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>All Products</div>

//                        </Link>
//                   </div>
//                   <div>
//                        <Link  to="/dashboard-create-product"   className={styles.link} activeclassName={styles.active} >
//                            <div className={styles.icon}><HiOutlineFolderAdd />
// </div>
//                            <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>List Product</div>

//                        </Link>
//                   </div>
//                   <div>
//                        <Link to="/dashboard-withdraw-money"  className={styles.link} activeclassName={styles.active} >
//                            <div className={styles.icon}><FaMoneyBillWave />
// </div>
//                            <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>withdraw Money</div>

//                        </Link>
//                   </div>
//                   {/* <div>
//                        <Link  to="/dashboard-messages"   className={styles.link} activeclassName={styles.active} >
//                            <div className={styles.icon}><FaRegMessage />
// </div>
//                            <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>Shop Inbox</div>

//                        </Link>
//                   </div> */}
//                   <div>
//                   <Link to="/dashboard-refunds" className={styles.link} activeClassName={styles.active}>
//   <div className={`d-flex align-items-center ${styles.icon}`}>
//     <RiRefund2Line />
//     {isOpen && <span className="ms-2">Refunds</span>}
//   </div>
// </Link>
//                   </div>
//                   <div>
//                   <Link to="/settings" className={styles.link} activeClassName={styles.active}>
//   <div className={`d-flex align-items-center ${styles.icon}`}>
//     <IoSettingsOutline />
//     {isOpen && <span className="ms-2">Settings</span>}
//   </div>
// </Link>
//                   </div>
               
//            </div>
//    </>
//   )
// }

// export default DashBoardSideBar



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import { toast } from 'react-toastify';
import { BsList } from 'react-icons/bs';
// import { AiOutlineLogin } from "react-icons/ai";
// import { RiLockPasswordLine } from "react-icons/ri";
// import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
// import { MdOutlineAdminPanelSettings, MdOutlineTrackChanges } from "react-icons/md";
// import { TbAddressBook } from "react-icons/tb";
// import { RiUser3Line as RxPerson } from "react-icons/ri";
// import { server } from '../../../server';

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBars, FaShoppingBag, FaTh } from "react-icons/fa";
// import { GoPackage } from "react-icons/go";
// import { HiOutlineFolderAdd } from "react-icons/hi";
// import { RiRefund2Line } from "react-icons/ri";
// import { IoSettingsOutline } from "react-icons/io5";
// import { FaMoneyBillWave } from "react-icons/fa";
// import styles from "./DashBoardSideBar.module.css";

// function DashBoardSideBar() {
//       const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const [active ,setActive]=useState(0)
// //   const [isOpen, setIsOpen] = useState(false); // Ensures the sidebar starts as closed
// //   const user = useSelector(state => state.user?.user);

//   // Function to toggle the sidebar
// //   const toggleSidebar = () => {
// //     setIsOpen(!isOpen);
// //   };

//   // Handler for logging out
// //   const logoutHandler = async () => {
// //     try {
// //       const response = await axios.get(`${server}/user/logout`, { withCredentials: true });
// //       toast.success(response.data.message);
// //       // Redirect user to home page (using your routing logic)
// //     } catch (error) {
// //       toast.error(error.response?.data?.message || 'Logout failed');
// //     }
// //   };

//   // Define navigation links with icons
//   const links = [
//     { path: '/dashboard', icon: <FaTh />, label: 'Dashboard' },
//     { path: '/dashboard-orders', icon: <FaShoppingBag />, label: 'All Orders' },
//     { path: '/dashboard-products', icon: <GoPackage />, label: 'All Products' },
//     { path: '/dashboard-create-product', icon: <HiOutlineFolderAdd />, label: 'List Product' },
//     { path: '/dashboard-withdraw-money', icon: <FaMoneyBillWave />, label: 'Withdraw Money' },
//     { path: '/dashboard-refunds', icon: <RiRefund2Line />, label: 'Refunds' },
//     { path: '/settings', icon: <IoSettingsOutline />, label: 'Settings' }
//   ];

//   return (
//     <div className={`d-flex flex-column ${isOpen ?'w-auto'  : 'w-25'} vh-100 bg-white shadow`}>
//       <div className="p-3">
//         <BsList size={30} onClick={toggleSidebar} className="cursor-pointer" style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }} />
//       </div>
//       {links.map((link, path, icon, label) => (
//         link.condition !== false && (
//             <Link key={path} to={path} className={styles.link} activeClassName={styles.active} onClick={() => { link.action ? link.action() : setActive(link.id); }}>
//                        <div className={styles.icon}>{icon}</div>
//                       {isOpen && <div className={styles.linkText}>{label}</div>}
//                     </Link>
//         )
//       ))}
//     </div>
//   );
// }

// export default DashBoardSideBar ;




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBars, FaShoppingBag, FaTh } from "react-icons/fa";
// import { GoPackage } from "react-icons/go";
// import { HiOutlineFolderAdd } from "react-icons/hi";
// import { RiRefund2Line } from "react-icons/ri";
// import { IoSettingsOutline } from "react-icons/io5";
// import { FaMoneyBillWave } from "react-icons/fa";
// import styles from "./DashBoardSideBar.module.css";

// function DashBoardSideBar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleSidebar = () => setIsOpen(!isOpen);
//   const [active ,setActive]=useState(0)

//   const links = [
//     { path: '/dashboard', icon: <FaTh />, label: 'Dashboard' },
//     { path: '/dashboard-orders', icon: <FaShoppingBag />, label: 'All Orders' },
//     { path: '/dashboard-products', icon: <GoPackage />, label: 'All Products' },
//     { path: '/dashboard-create-product', icon: <HiOutlineFolderAdd />, label: 'List Product' },
//     { path: '/dashboard-withdraw-money', icon: <FaMoneyBillWave />, label: 'Withdraw Money' },
//     { path: '/dashboard-refunds', icon: <RiRefund2Line />, label: 'Refunds' },
//     { path: '/settings', icon: <IoSettingsOutline />, label: 'Settings' }
//   ];

//   return (
//     <div style={{width: isOpen ? "300px" : "50px"}} className={styles.sidebar}>
//       <div className={styles.topSection}>
//         <div style={{marginLeft: isOpen ? "50px" : "0px"}} className={styles.bars}>
//           <FaBars onClick={toggleSidebar}/>
//         </div>
//       </div>
//       {links.map(({ path, icon, label }) => (
//         <Link key={path} to={path} className={styles.link} activeClassName={styles.active} onClick={() => { link.action ? link.action() : setActive(link.id); }}>
//           <div className={styles.icon}>{icon}</div>
//           {isOpen && <div className={styles.linkText}>{label}</div>}
//         </Link>
//       ))}
//     </div>
//   );
// }

// export default DashBoardSideBar;

// import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom'; // Import NavLink for active link management
// import { FaBars, FaShoppingBag, FaTh, FaMoneyBillWave } from "react-icons/fa";
// import { GoPackage } from "react-icons/go";
// import { HiOutlineFolderAdd } from "react-icons/hi";
// import { RiRefund2Line } from "react-icons/ri";
// import { IoSettingsOutline } from "react-icons/io5";
// import styles from "./DashBoardSideBar.module.css";

// function DashBoardSideBar() {
//     const [isOpen, setIsOpen] = useState(true);
//     const toggleSidebar = () => setIsOpen(!isOpen);
//     const [activePath, setActivePath] = useState();

//     // Define navigation links with icons
//     const links = [
//         {id:1, path: '/dashboard', icon: <FaTh />, label: 'Dashboard' },
//         {id:2, path: '/dashboard-orders', icon: <FaShoppingBag />, label: 'All Orders' },
//         { id:3,path: '/dashboard-products', icon: <GoPackage />, label: 'All Products' },
//         { id:4,path : '/dashboard-create-product', icon: <HiOutlineFolderAdd />, label: 'List Product' },
//         { id:5,path: '/dashboard-withdraw-money', icon: <FaMoneyBillWave />, label: 'Withdraw Money' },
//         { id:6,path: '/dashboard-refunds', icon: <RiRefund2Line />, label: 'Refunds' },
//         { id:7,path: '/settings', icon: <IoSettingsOutline />, label: 'Settings' }
//     ];

//     return (
//         <div className={`d-flex flex-column ${isOpen ? 'w-auto' : 'w-25'} vh-100 bg-white shadow`}>
//             <div className="p-3">
//                 <FaBars size={30} onClick={toggleSidebar} className="cursor-pointer" style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(90deg)' : 'rotate(0)' }} />
//             </div>
//             {links.map((link) => (
//                 <NavLink
//                     onClick={() => {  setActivePath(link.path) }}
//                     key={link.path}
//                     to={link.path}
//                     className={({ isActive }) => isActive ? `nav-link active ${styles.link}` : `nav-link ${styles.link}`}
//                     style={{ color: 'inherit', textDecoration: 'none' }} // Maintain color and decoration
                   
//                     // className={`p-3 link-dark d-flex align-items-center text-decoration-none ${activePath === link.path ? 'bg-info text-white' : 'hover:bg-light'}`} // onClick={() => setIsOpen(false)} // Optionally close the sidebar on click
//                     // className={`p-3 link-dark d-flex align-items-center text-decoration-none ${activePath === link.path ? 'bg-info text-white' : 'hover:bg-light'}`}
//                 >

//                     <div className={styles.icon}>{link.icon}</div>
//                     {isOpen && <div className={styles.linkText}>{link.label}</div>}
//                 </NavLink>
//             ))}
//         </div>
//     );
// }

// export default DashBoardSideBar;

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
