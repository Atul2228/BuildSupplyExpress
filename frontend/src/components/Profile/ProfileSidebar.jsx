















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




