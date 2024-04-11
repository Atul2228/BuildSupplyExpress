

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <Navbar bg="white" variant="light" sticky="top" className="shadow-sm">
      <Container fluid className="justify-content-between">
        <Link to="/dashboard" className="navbar-brand">
          {/* <img src="" alt="" height="50" /> */}
        </Link>
        <Nav className="align-items-center">
        
         
        
         
         
          <Nav.Link as={Link} to={`/shop/${seller._id}`}>
            <img src={seller.avatar?.url} alt="" className="rounded-circle" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default DashboardHeader;

