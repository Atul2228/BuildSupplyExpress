

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { getAllProductsShop, deleteProduct } from '../../redux/actions/product';
import Loader from '../Layout/Loader';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller._id]);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(deleteProduct(id));
 
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mt-4">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Product Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Sold out</th>
                <th>Status</th>
                <th>Preview</th>
                <th>Delete</th>
                
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{`US$ ${product.discountPrice}`}</td>
                  <td>{product.stock}</td>
                  <td>{product.sold_out}</td>
                  <td>{product.status}</td>
                  <td>
                    <Link to={`/product/${product._id}`}>
                      <Button variant="outline-primary">
                        <AiOutlineEye size={20} />
                      </Button>
                    </Link>
                  </td>
                  <td>
                    <Button variant="outline-danger" onClick={() => handleDelete(product._id)}>
                      <AiOutlineDelete size={20} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default AllProducts;

