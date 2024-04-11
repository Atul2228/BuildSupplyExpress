import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
// import {
//     MdOutlineAdminPanelSettings,
//     MdOutlinePassword,
//     MdOutlineTrackChanges,
//   } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import styles from "./SideBarPage.module.css";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
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
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <>
      <div
        style={{ width: isOpen ? "300px" : "50px" }}
        className={styles.sidebar}
      >
        <div className={styles.topSection}>
          {/* <h1 style={{display: isOpen ? "block" : "none"}} className={styles.logo}></h1> */}
          <div
            style={{ marginLeft: isOpen ? "50px" : "0px" }}
            className={styles.bars}
          >
            <FaBars onClick={toggle} />
          </div>
        </div>

        <div>
          <Link
            onClick={() => setActive(1)}
            className={styles.link}
            activeclassName={styles.active}
          >
            <div className={styles.icon} onClick={() => setActive(1)}>
              {" "}
              <RxPerson size={20} color={active === 1 ? "red" : ""} />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.linkText}
            >
              {" "}
              Profile
            </div>
          </Link>
        </div>
        <div>
          <Link
            onClick={() => setActive(2)}
            className={styles.link}
            activeclassName={styles.active}
          >
            <div className={styles.icon} onClick={() => setActive(2)}>
              <HiOutlineShoppingBag
                size={20}
                color={active === 2 ? "red" : ""}
              />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.linkText}
            >
              {" "}
              Orders
            </div>
          </Link>
        </div>
        <div>
          <Link
            onClick={() => setActive(3)}
            className={styles.link}
            activeclassName={styles.active}
          >
            <div className={styles.icon} onClick={() => setActive(3)}>
              {" "}
              <HiOutlineReceiptRefund
                size={20}
                color={active === 3 ? "red" : ""}
              />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.linkText}
            >
              {" "}
              Refunds
            </div>
          </Link>
        </div>

        <div>
          <Link
            onClick={() => setActive(5)}
            className={styles.link}
            activeclassName={styles.active}
          >
            <div className={styles.icon} onClick={() => setActive(5)}>
              <MdOutlineTrackChanges
                size={20}
                color={active === 5 ? "red" : ""}
              />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.linkText}
            >
              Track order
            </div>
          </Link>
        </div>
        <div>
          <Link
            onClick={() => setActive(6)}
            className={styles.link}
            activeclassName={styles.active}
          >
            <div className={styles.icon} onClick={() => setActive(6)}>
              {" "}
              <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.linkText}
            >
              {" "}
              Change Password
            </div>
          </Link>
        </div>
        <div>
          <Link
            onClick={() => setActive(7)}
            className={styles.link}
            activeclassName={styles.active}
          >
            <div className={styles.icon} onClick={() => setActive(7)}>
              {" "}
              <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.linkText}
            >
              {" "}
              Address
            </div>
          </Link>
        </div>
        <div>
        {user && user?.role === "Admin" && (
          <Link to="/admin/dashboard"   className={styles.link}
          activeclassName={styles.active}>
          
            <div className={styles.icon} onClick={() => setActive(8)}>
              {" "}
              <MdOutlineAdminPanelSettings
              size={20}
              color={active === 8 ? "red" : ""}
            />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.linkText}
            >
              
              Dashboard
            </div>
          </Link>
        )}
        </div>

        <div>
          <Link
            onClick={logoutHandler}
            className={styles.link}
            activeclassName={styles.active}
          >
            <div className={styles.icon}>
              {" "}
              <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
            </div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className={styles.divText}
              color={active === 8 ? "red" : ""}
            >
              Logout
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ProfileSidebar;
