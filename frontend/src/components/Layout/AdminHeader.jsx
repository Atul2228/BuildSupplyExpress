// import React from 'react'
// import { AiOutlineGift } from 'react-icons/ai'
// import { BiMessageSquareDetail } from 'react-icons/bi'
// import { FiPackage, FiShoppingBag } from 'react-icons/fi'
// import { MdOutlineLocalOffer } from 'react-icons/md'
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

// const AdminHeader = () => {
//     const {user} = useSelector((state) => state.user);

//   return (
//          <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
//       <div>
//         <Link to="/">
//           <img
//             src="https://shopo.quomodothemes.website/assets/images/logo.svg"
//             alt=""
//           />
//         </Link>
//       </div>
//       <div className="flex items-center">
//         <div className="flex items-center mr-4">
//           <Link to="/dashboard/cupouns" className="800px:block hidden">
//             <AiOutlineGift
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-events" className="800px:block hidden">
//             <MdOutlineLocalOffer
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-products" className="800px:block hidden">
//             <FiShoppingBag
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//           <Link to="/dashboard-orders" className="800px:block hidden">
//             <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
//           </Link>
//           <Link to="/dashboard-messages" className="800px:block hidden">
//             <BiMessageSquareDetail
//               color="#555"
//               size={30}
//               className="mx-5 cursor-pointer"
//             />
//           </Link>
//             <img
//               src={`${user?.avatar?.url}`}
//               alt=""
//               className="w-[50px] h-[50px] rounded-full object-cover"
//             />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminHeader
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineGift } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';

const AdminHeader = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    {/* <img src="./Img/" alt="" /> */}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link d-none d-lg-block" to="/dashboard/cupouns">
                                <AiOutlineGift color="#555" size={30} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-none d-lg-block" to="/dashboard-events">
                                <MdOutlineLocalOffer color="#555" size={30} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-none d-lg-block" to="/dashboard-products">
                                <FiShoppingBag color="#555" size={30} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-none d-lg-block" to="/dashboard-orders">
                                <FiPackage color="#555" size={30} />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-none d-lg-block" to="/dashboard-messages">
                                <BiMessageSquareDetail color="#555" size={30} />
                            </Link>
                        </li>
                        <li className="nav-item">
                        {/* <Nav.Link as={Link} > */}
            <img src={user?.avatar?.url} alt="" className="rounded-circle" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          {/* </Nav.Link> */}
                            {/* <img src={user?.avatar?.url} alt="" className="rounded-circle" style={{ width: '50px', height: '50px', border:"solid", borderColor:"black",borderWidth:"10px" }} /> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AdminHeader;
