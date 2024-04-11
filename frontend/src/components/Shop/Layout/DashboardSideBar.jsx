
import { GoPackage } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { FaRegMessage } from "react-icons/fa6";
import { RiRefund2Line } from "react-icons/ri";
import { FaMoneyBillWave } from "react-icons/fa6";
import { Link} from 'react-router-dom';
import styles from "./DashBoardSideBar.module.css";
import  { useState } from 'react';
import {
    FaTh,
    FaBars,
    // FaUserAlt,
    // FaRegChartBar,
    // FaCommentAlt,
    FaShoppingBag,
    // FaThList
}from "react-icons/fa";
function DashBoardSideBar() {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
  return (
   <>
         <div style={{width: isOpen ? "300px" : "50px"}} className={styles.sidebar}>
               <div className={styles.topSection}>
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className={styles.logo}></h1> */}
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className={styles.bars}>
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               
                  <div>
                       <Link to="/dashboard"   className={styles.link} activeclassName={styles.active} >
                           <div className={styles.icon}><FaTh/></div>
                           <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>Dashboard</div>

                       </Link>
                  </div>
                  <div>
                       <Link  to="/dashboard-orders"   className={styles.link} activeclassName={styles.active} >
                           <div className={styles.icon}><FaShoppingBag />
</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>All Orders</div>

                       </Link>
                  </div>
                  <div>
                       <Link  to="/dashboard-products"   className={styles.link} activeclassName={styles.active} >
                           <div className={styles.icon}><GoPackage />
</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>All Products</div>

                       </Link>
                  </div>
                  <div>
                       <Link  to="/dashboard-create-product"   className={styles.link} activeclassName={styles.active} >
                           <div className={styles.icon}><HiOutlineFolderAdd />
</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>List Product</div>

                       </Link>
                  </div>
                  <div>
                       <Link to="/dashboard-withdraw-money"  className={styles.link} activeclassName={styles.active} >
                           <div className={styles.icon}><FaMoneyBillWave />
</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>withdraw Money</div>

                       </Link>
                  </div>
                  {/* <div>
                       <Link  to="/dashboard-messages"   className={styles.link} activeclassName={styles.active} >
                           <div className={styles.icon}><FaRegMessage />
</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>Shop Inbox</div>

                       </Link>
                  </div> */}
                  <div>
                       <Link  to="/dashboard-refunds"   className={styles.link} activeclassName={styles.active} >
                           <div className={styles.icon}><RiRefund2Line />
</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>Refunds</div>

                       </Link>
                  </div>
                  <div>
                       <Link to="/settings"  className={styles.link} activeclassName={styles.active} >
                           <div className={styles.icon}><IoSettingsOutline />
</div>
                           <div style={{display: isOpen ? "block" : "none"}} className={styles.linkText}>Seettings</div>

                       </Link>
                  </div>
               
           </div>
   </>
  )
}

export default DashBoardSideBar


