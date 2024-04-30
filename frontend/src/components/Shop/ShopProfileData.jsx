
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getAllProductsShop } from "../../redux/actions/product";
import { Container, Row, Col, Nav, Card } from "react-bootstrap";
import Ratings from "../Products/Ratings";
import ProductCard from "../Route/ProductCard/ProductCard";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
 
  
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    
  }, [dispatch, id]);

  const [activeKey, setActiveKey] = useState('reviews');

  const allReviews =products && products.flatMap((product) => product.reviews);

  return (
    <Container className="mt-4">
      <Nav variant="tabs" activeKey={activeKey} onSelect={(k) => setActiveKey(k)} className="mb-3">
        {/* <Nav.Item>
          <Nav.Link eventKey="products">Shop Products</Nav.Link>
        </Nav.Item> */}
       
        <Nav.Item>
          <Nav.Link eventKey="reviews">Shop Reviews</Nav.Link>
        </Nav.Item>
        {isOwner && (
          <Nav.Item className="ms-auto">
            <Link to="/dashboard" className="nav-link">
              Go Dashboard
            </Link>
          </Nav.Item>
        )}
      </Nav>

   

  

      {activeKey === 'reviews' && (
        <div>
          { allReviews && allReviews.length > 0 ? allReviews.map((review, index) => (
            <Card className="mb-3" key={index}>
              <Card.Body>
                <Card.Title>{review.user.name}</Card.Title>
                <Ratings rating={review.rating} />
                <Card.Text>{review.comment}</Card.Text>
              </Card.Body>
            </Card>
          )) : <p>No Reviews have for this shop!</p>}
        </div>
      )}
    </Container>
  );
};

export default ShopProfileData;

