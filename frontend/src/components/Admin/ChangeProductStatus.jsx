// import React from 'react'
// import { Button } from "@material-ui/core";
// import { AiOutlineEye, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
// import { Link } from "react-router-dom";

// function ChangeProductStatus() {

 
//     const columns = [
//         { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
//         {
//           field: "name",
//           headerName: "Name",
//           minWidth: 180,
//           flex: 1.4,
//         },
//         {
//           field: "price",
//           headerName: "Price",
//           minWidth: 100,
//           flex: 0.6,
//         },
//         {
//           field: "Stock",
//           headerName: "Stock",
//           type: "number",
//           minWidth: 80,
//           flex: 0.5,
//         },
    
//         // {
//         //   field: "sold",
//         //   headerName: "Sold out",
//         //   type: "number",
//         //   minWidth: 130,
//         //   flex: 0.6,
//         // },
        
//         // Your existing columns...
      
//         // Add a column for approve and reject actions
//         {
//           field: "actions",
//           headerName: "Actions",
//           minWidth: 150,
//           flex: 1,
//           sortable: false,
//           renderCell: (params) => {
//             return (
//               <>
//                 <Button
//                   onClick={() => handleApprove(params.id)}
//                   style={{ marginRight: 16 }}
//                 >
//                   <AiOutlineCheck /> Approve
//                 </Button>
//                 <Button
//                   onClick={() => handleReject(params.id)}
//                 >
//                   <AiOutlineClose /> Reject
//                 </Button>
//               </>
//             );
//           },
//         },
//       ];
      
// //   return (
// //     <div>
      
// //     </div>
// //   )
// }

// export default ChangeProductStatus




//  // Include approval and rejection icons

// // Inside your component...

// const handleApprove = async (productId) => {
//   // Implement product approval logic here
// };

// const handleReject = async (productId) => {
//   // Implement product rejection logic here
// };

// const columns = [
//   // Your existing columns...

//   // Add a column for approve and reject actions
//   {
//     field: "actions",
//     headerName: "Actions",
//     minWidth: 150,
//     flex: 1,
//     sortable: false,
//     renderCell: (params) => {
//       return (
//         <>
//           <Button
//             onClick={() => handleApprove(params.id)}
//             style={{ marginRight: 16 }}
//           >
//             <AiOutlineCheck /> Approve
//           </Button>
//           <Button
//             onClick={() => handleReject(params.id)}
//           >
//             <AiOutlineClose /> Reject
//           </Button>
//         </>
//       );
//     },
//   },
// ];
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
// import { server } from '../../server';

// const ChangeProductStatus = () => {
//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [error, setError] = useState('');

//   const fetchPendingProducts = async () => {
//     try {
//       const response = await axios.get('/api/admin/products/pending');
//       setPendingProducts(response.data.products);
//     } catch (err) {
//       setError('Failed to fetch pending products');
//     }
//   };

//   const approveProduct = async (id) => {
//     try {
//     //   await axios.post(`/api/admin/products/approve/${id}`);
//     await axios.post(`${server}/product/admin/products/approve/${id}`, {}, {withCredentials: true});
//       fetchPendingProducts(); // Refresh the list
//     } catch (err) {
//       setError('Failed to approve product');
//     }
//   };

//   const rejectProduct = async (id) => {
//     try {
//     //   await axios.post(`/api/admin/products/reject/${id}`);
//       await axios.post(`${server}/product/admin/products/reject/${id}`, {}, {withCredentials: true});
//       fetchPendingProducts(); // Refresh the list
//     } catch (err) {
//       setError('Failed to reject product');
//     }
//   };

//   useEffect(() => {
//     fetchPendingProducts();
//   }, []);

//   return (
//     <Container>
//       <Row>
//         <Col>
//           <h2>Pending Products</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <ListGroup>
//             {pendingProducts.map(product => (
//               <ListGroup.Item key={product._id}>
//                 {product.name} - ${product.discountPrice}
//                 <Button variant="success" onClick={() => approveProduct(product._id)} className="m-2">
//                   Approve
//                 </Button>
//                 <Button variant="danger" onClick={() => rejectProduct(product._id)}>
//                   Reject
//                 </Button>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ChangeProductStatus;
import React from 'react'

function ChangeProductStatus() {
  return (
    <div>
      hello
    </div>
  )
}

export default ChangeProductStatus



