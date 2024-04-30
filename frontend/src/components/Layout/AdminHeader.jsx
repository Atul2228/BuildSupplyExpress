
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
