


// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Button, Table } from "react-bootstrap";
// import { getAllOrdersOfShop } from "../../redux/actions/order";
// import Loader from "../Layout/Loader";
// import { AiOutlineArrowRight } from "react-icons/ai";

// const AllOrders = () => {
//   const { orders, isLoading } = useSelector((state) => state.order);
//   const { seller } = useSelector((state) => state.seller);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllOrdersOfShop(seller._id));
//   }, [dispatch, seller._id]);

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="container mt-4">
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Name</th>
//                 <th>Status</th>
//                 <th>Items Qty</th>
//                 <th>Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((item) => (
//                 <tr key={item._id}>
//                   <td>{item._id}</td>
//                   <td>{item.cart.name}</td>
//                   <td className={item.status === "Delivered" ? "text-success" : "text-danger"}>
//                     {item.status}
//                   </td>
//                   <td>{item.cart.length}</td>
//                   <td>{`₹ ${item.totalPrice}`}</td>
//                   <td>
//                     <Link to={`/order/${item._id}`}>
//                       <Button variant="link">
//                         <AiOutlineArrowRight size={20} />
//                       </Button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </>
//   );
// };

// export default AllOrders;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Button, Table } from "react-bootstrap";
// import { getAllOrdersOfShop } from "../../redux/actions/order";
// import Loader from "../Layout/Loader";
// import { AiOutlineArrowRight } from "react-icons/ai";

// const AllOrders = () => {
//   const { orders, isLoading } = useSelector((state) => state.order);
//   const { seller } = useSelector((state) => state.seller);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllOrdersOfShop(seller._id));
//   }, [dispatch, seller._id]);

//   // Helper function to extract names from the cart array
//   const getProductNameList = (cartItems) => {
//     return cartItems.map(item => item.name).join(', '); // Join names with comma
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="container mt-4">
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Product Names</th>
//                 <th>Status</th>
//                 <th>Items Qty</th>
//                 <th>Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id}>
//                   <td>{order._id}</td>
//                   <td>{getProductNameList(order.cart)}</td>
//                   <td className={order.status === "Delivered" ? "text-success" : "text-danger"}>
//                     {order.status}
//                   </td>
//                   <td>{order.cart.reduce((total, item) => total + item.qty, 0)}</td> 
//                   <td>{`₹ ${order.totalPrice}`}</td>
//                   <td>
//                     <Link to={`/order/${order._id}`}>
//                       <Button variant="link">
//                         <AiOutlineArrowRight size={20} />
//                       </Button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       )}
//     </>
//   );
// };

// export default AllOrders;

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

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'Order ID', width: 220 },
    { field: 'productNames', headerName: 'Product Names', width: 350 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'itemsQty', headerName: 'Items Qty', width: 120 },
    { field: 'total', headerName: 'Total', width: 150 },
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

  // Map orders to rows for DataGrid
  const rows = orders.map((order) => ({
    id: order._id,
    productNames: order.cart.map(item => item.name).join(', '),
    status: order.status,
    itemsQty: order.cart.reduce((total, item) => total + item.qty, 0),
    total: `₹ ${order.totalPrice}`,
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
            // rowsPerPageOptions={[5, 10, 15]}
    
          />
        </div>
      )}
    </>
  );
};

export default AllOrders;


