

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { getAllProductsShop, deleteProduct } from '../../redux/actions/product';
import Loader from '../Layout/Loader';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';

const AllProducts = () => {
  const { products, isLoading } = useSelector(state => state.products);
  const { seller } = useSelector(state => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    console.log('Deleting product with id:', id);
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: 'id', headerName: 'Product ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'discountPrice', headerName: 'Price', width: 130, valueGetter: (params) => `₹ ${params.row.discountPrice}` },
    { field: 'stock', headerName: 'Stock', width: 100 },
    { field: 'sold_out', headerName: 'Sold Out', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'preview',
      headerName: 'Preview',
      width: 100,
      renderCell: (params) => (
        <Link to={`/productSa/${params.id}`}>
          <Button variant="outlined">
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
    },
    {
      field: 'update',
      headerName: 'Update',
      width: 120,
      renderCell: (params) => (
        <Link to={`/update-product/${params.id}`}>
          <Button variant="outlined">
            Update
          </Button>
        </Link>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: (params) => (
        <Button variant="outlined" color="error" onClick={() => handleDelete(params.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
    },
  ];

  const rows = products.map((product) => ({
    id: product._id,
    name: product.name,
    discountPrice: product.discountPrice,
    stock: product.stock,
    sold_out: product.sold_out,
    status: product.status,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPage={10}
            // rowsPerPageOptions={[10 ]}
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;

