



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
// import { server } from '../../server';
// import {  AiOutlineEye } from 'react-icons/ai';
// import { Link } from 'react-router-dom';

// const ChangeProductStatuss = () => {
//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [error, setError] = useState('');
//   //  const [open, setOpen] = useState(false);

//   const fetchPendingProducts = async () => {
//     try {
//       const response = await axios.get(`${server}/product/admin/products/pending`, {withCredentials: true});
//       //  await axios.get('/api/admin/products/pending');
//       setPendingProducts(response.data.products);
//     } catch (err) {
//       setError('Failed to fetch pending products');
//       console.log(err);
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
//     <Row>
//       <Col>
//         <h2>Pending Products</h2>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <ListGroup>
//           {pendingProducts && pendingProducts.map(product => (
//             <ListGroup.Item key={product._id}>
//               {product.name} - ${product.discountPrice}
//               <Button variant="success" onClick={() => approveProduct(product._id)} className="m-2">
//                 Approve
//               </Button>
//               <Button variant="danger" onClick={() => rejectProduct(product._id)} className="m-2">
//                 Reject
//               </Button>
//               {/* Link to view the product */}
//               <Link to={`/product/${product._id}`}>
//                 <Button variant="outline-primary">
//                   <AiOutlineEye size={20} />
//                 </Button>
//               </Link>
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//       </Col>
//     </Row>
//   </Container>
//   );
// };

// export default ChangeProductStatuss;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Container, Table, Alert } from 'react-bootstrap';
// import { server } from '../../server';
// import { AiOutlineEye } from 'react-icons/ai';
// import { Link } from 'react-router-dom';

// const ChangeProductStatus = () => {
//   const [pendingProducts, setPendingProducts] = useState([]);
//   const [error, setError] = useState('');

//   const fetchPendingProducts = async () => {
//     try {
//       const response = await axios.get(`${server}/product/admin/products/pending`, { withCredentials: true });
//       setPendingProducts(response.data.products);
//     } catch (err) {
//       setError('Failed to fetch pending products');
//       console.error(err);
//     }
//   };

//   const approveProduct = async (id) => {
//     try {
//       await axios.post(`${server}/product/admin/products/approve/${id}`, {}, { withCredentials: true });
//       fetchPendingProducts(); // Refresh the list
//     } catch (err) {
//       setError('Failed to approve product');
//     }
//   };

//   const rejectProduct = async (id) => {
//     try {
//       await axios.post(`${server}/product/admin/products/reject/${id}`, {}, { withCredentials: true });
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
//       <h2>Pending Products</h2>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Product Name</th>
//             <th>Discount Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pendingProducts.map(product => (
//             <tr key={product._id}>
//               <td>{product.name}</td>
//               <td>${product.discountPrice}</td>
//               <td>
//                 <Button variant="success" onClick={() => approveProduct(product._id)} className="m-2">
//                   Approve
//                 </Button>
//                 <Button variant="danger" onClick={() => rejectProduct(product._id)} className="m-2">
//                   Reject
//                 </Button>
//                 <Link to={`/product/${product._id}`}>
//                   <Button variant="outline-primary">
//                     <AiOutlineEye size={20} />
//                   </Button>
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ChangeProductStatus;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Table, Alert, Pagination } from 'react-bootstrap';
import { server } from '../../server';
import { AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const ChangeProductStatus = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const fetchPendingProducts = async () => {
    try {
      const response = await axios.get(`${server}/product/admin/products/pending`, { withCredentials: true });
      setPendingProducts(response.data.products);
    } catch (err) {
      setError('Failed to fetch pending products');
      console.error(err);
    }
  };

  const approveProduct = async (id) => {
    try {
      await axios.post(`${server}/product/admin/products/approve/${id}`, {}, { withCredentials: true });
      fetchPendingProducts(); // Refresh the list
    } catch (err) {
      setError('Failed to approve product');
    }
  };

  const rejectProduct = async (id) => {
    try {
      await axios.post(`${server}/product/admin/products/reject/${id}`, {}, { withCredentials: true });
      fetchPendingProducts(); // Refresh the list
    } catch (err) {
      setError('Failed to reject product');
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  // Calculate total pages
  const lastPageIndex = currentPage * productsPerPage;
  const firstPageIndex = lastPageIndex - productsPerPage;
  const currentProducts = pendingProducts.slice(firstPageIndex, lastPageIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalProducts = pendingProducts.length;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <h2>Pending Products</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Discount Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>₹{product.discountPrice}</td>
              <td>
                <Button variant="success" onClick={() => approveProduct(product._id)} className="m-2">
                  Approve
                </Button>
                <Button variant="danger" onClick={() => rejectProduct(product._id)} className="m-2">
                  Reject
                </Button>
                <Link to={`/product/${product._id}`}>
                  <Button variant="outline-primary">
                    <AiOutlineEye size={20} />
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="justify-content-center">
        {pageNumbers.map(number => (
          <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default ChangeProductStatus;


