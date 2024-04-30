

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../server';
import { Alert, Container } from 'react-bootstrap';
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';

const ChangeProductStatus = () => {
  const [pendingProducts, setPendingProducts] = useState([]);
  const [error, setError] = useState('');

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

  const columns = [
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'discountPrice', headerName: 'Discount Price', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <div>
          <Button color="success" variant="contained" onClick={() => approveProduct(params.row._id)} style={{ marginRight: 10,backgroundColor:"green" }}>
            Approve
          </Button>
          {/* <Button variant="danger"  onClick={() => rejectProduct(params.row._id)} style={{ marginRight: 10 }}>
            Reject
          </Button> */}
          <Button variant="danger" onClick={() =>rejectProduct(params.row._id)} style={{ marginRight: "10" ,backgroundColor:"red"  }} className="m-2 bg-red">
                 Reject </Button>
          <Link to={`/productSa/${params.row._id}`}>
            <Button variant="outlined">
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        </div>
      )
    },
  ];

  const rows = pendingProducts.map(product => ({
    id: product._id, // DataGrid requires a unique 'id' field for each row
    name: product.name,
    discountPrice: `₹${product.discountPrice}`,
    _id: product._id
  }));

  return (
    <Container>
      <h2>Pending Products</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div style={{ height: "450px", width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </Container>
  );
};

export default ChangeProductStatus;



