


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { AiOutlineArrowRight } from "react-icons/ai";


const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  
  const columns = [
    { field: 'id', headerName: 'Order ID', width: 220 },
    { field: 'productNames', headerName: 'Product Names', width: 350 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'itemsQty', headerName: 'Items Qty', width: 120 },
    { field: 'total', headerName: 'Total', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 180 },
    {
      field: 'action',
      headerName: 'Action',
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <Link to={`/order/${params.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
    },
  ];

  
  const rows = orders.map((order) => ({
    id: order._id,
    productNames: order.cart.map(item => item.name).join(', '),
    status: order.status,
    itemsQty: order.cart.reduce((total, item) => total + item.qty, 0),
    total: `₹ ${order.totalPrice}`,
    createdAt: order.createdAt.slice(0, 10)
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
          />
        </div>
      )}
    </>
  );
};

export default AllOrders;


