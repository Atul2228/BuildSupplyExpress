

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";


const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <Navbar bg="white" variant="light" sticky="top" className="shadow-sm">
      <Container fluid className="justify-content-between">
        <Link to="/dashboard" className="navbar-brand">
          <img src="/Image/image2.png" alt="" height="50" />
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

