// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import styles from "../../styles/styles";
// import ProductCard from "../Route/ProductCard/ProductCard";
// import Ratings from "../Products/Ratings";
// import { getAllEventsShop } from "../../redux/actions/event";

// const ShopProfileData = ({ isOwner }) => {
//   const { products } = useSelector((state) => state.products);
//   const { events } = useSelector((state) => state.events);
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllProductsShop(id));
//     dispatch(getAllEventsShop(id));
//   }, [dispatch]);

//   const [active, setActive] = useState(1);

//   const allReviews =
//     products && products.map((product) => product.reviews).flat();

//   return (
//     <div className="w-full">
//       <div className="flex w-full items-center justify-between">
//         <div className="w-full flex">
//           <div className="flex items-center" onClick={() => setActive(1)}>
//             <h5
//               className={`font-[600] text-[20px] ${
//                 active === 1 ? "text-red-500" : "text-[#333]"
//               } cursor-pointer pr-[20px]`}
//             >
//               Shop Products
//             </h5>
//           </div>
//           <div className="flex items-center" onClick={() => setActive(2)}>
//             <h5
//               className={`font-[600] text-[20px] ${
//                 active === 2 ? "text-red-500" : "text-[#333]"
//               } cursor-pointer pr-[20px]`}
//             >
//               Running Events
//             </h5>
//           </div>

//           <div className="flex items-center" onClick={() => setActive(3)}>
//             <h5
//               className={`font-[600] text-[20px] ${
//                 active === 3 ? "text-red-500" : "text-[#333]"
//               } cursor-pointer pr-[20px]`}
//             >
//               Shop Reviews
//             </h5>
//           </div>
//         </div>
//         <div>
//           {isOwner && (
//             <div>
//               <Link to="/dashboard">
//                 <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
//                   <span className="text-[#fff]">Go Dashboard</span>
//                 </div>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>

//       <br />
//       {active === 1 && (
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
//           {products &&
//             products.map((i, index) => (
//               <ProductCard data={i} key={index} isShop={true} />
//             ))}
//         </div>
//       )}

//       {active === 2 && (
//         <div className="w-full">
//           <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
//             {events &&
//               events.map((i, index) => (
//                 <ProductCard
//                   data={i}
//                   key={index}
//                   isShop={true}
//                   isEvent={true}
//                 />
//               ))}
//           </div>
//           {events && events.length === 0 && (
//             <h5 className="w-full text-center py-5 text-[18px]">
//               No Events have for this shop!
//             </h5>
//           )}
//         </div>
//       )}

//       {active === 3 && (
//         <div className="w-full">
//           {allReviews &&
//             allReviews.map((item, index) => (
//               <div className="w-full flex my-4">
//                 <img
//                   src={`${item.user.avatar?.url}`}
//                   className="w-[50px] h-[50px] rounded-full"
//                   alt=""
//                 />
//                 <div className="pl-2">
//                   <div className="flex w-full items-center">
//                     <h1 className="font-[600] pr-2">{item.user.name}</h1>
//                     <Ratings rating={item.rating} />
//                   </div>
//                   <p className="font-[400] text-[#000000a7]">{item?.comment}</p>
//                   <p className="text-[#000000a7] text-[14px]">{"2days ago"}</p>
//                 </div>
//               </div>
//             ))}
//           {allReviews && allReviews.length === 0 && (
//             <h5 className="w-full text-center py-5 text-[18px]">
//               No Reviews have for this shop!
//             </h5>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShopProfileData;


// import { getAllEventsShop } from "../../redux/actions/event";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { getAllProductsShop } from "../../redux/actions/product";
import { Container, Row, Col, Nav, Card } from "react-bootstrap";
import Ratings from "../Products/Ratings";
import ProductCard from "../Route/ProductCard/ProductCard";

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  // const products=productss && productss.filter(product => product.status === 'Approved')
  
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

      {/* {activeKey === 'products' && (
        <Row>
          {products && products.map((product, index) => (
            <Col sm={12} md={6} lg={4} xl={3} key={index}>
              
              <ProductCard data={product} isShop={true} />
            </Col>
          ))}
        </Row>
      )} */}

  

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

