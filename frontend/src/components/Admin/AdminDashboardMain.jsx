import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";
import { getAllUsers } from '../../redux/actions/user'; // Make sure to have this action available
import { Bar } from 'react-chartjs-2';
import AdminMainDashboardChart from "./AdminMainDashboardChart";


const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders,adminOrderLoading } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllUsers());
  }, [dispatch]);

   const adminEarning = adminOrders && adminOrders.reduce((acc,item) => acc + item.totalPrice * .10, 0);


   const adminBalance = adminEarning?.toFixed(2);


   const { users, userLoading } = useSelector(state => state.user);
  
 
 
   // Process data to aggregate orders, earnings, and user registrations by month
   const processData = (orders, users) => {
     const months = Array(12).fill(0);
     const earnings = Array(12).fill(0.0);
     const userCounts = Array(12).fill(0);
 
     orders.forEach(order => {
       const date = new Date(order.createdAt);
       const month = date.getMonth();
       months[month]++;
       earnings[month] += order.totalPrice * 0.10;
     });
 
     users.forEach(user => {
       const date = new Date(user.createdAt);
       const month = date.getMonth();
       userCounts[month]++;
     });
 
     return { months, earnings, userCounts };
   };
 
   const { months, earnings, userCounts } = adminOrders && users ? processData(adminOrders, users) : { months: [], earnings: [], userCounts: [] };
 
   const data = {
     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
     datasets: [
       {
         label: 'Number of Orders',
         data: months,
         backgroundColor: 'rgba(54, 162, 235, 0.6)',
         borderColor: 'rgba(54, 162, 235, 1)',
         borderWidth: 1,
       },
       {
         label: 'Earnings (10%)',
         data: earnings.map(e => parseFloat(e.toFixed(2))),
         backgroundColor: 'rgba(255, 206, 86, 0.6)',
         borderColor: 'rgba(255, 206, 86, 1)',
         borderWidth: 1,
       },
       {
         label: 'Number of Users',
         data: userCounts,
         backgroundColor: 'rgba(75, 192, 192, 0.6)',
         borderColor: 'rgba(75, 192, 192, 1)',
         borderWidth: 1,
       }
     ]
   };
 
   const options = {
     scales: {
       y: {
         beginAtZero: true
       }
     },
     responsive: true,
     maintainAspectRatio: false
   };
 
  
 
 

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrders &&
  adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " ₹",
        status: item?.status,
        createdAt: item?.createdAt.slice(0,10),
      });
    });

  return (
   <>
    {
      adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
        <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
        <div className="w-full block 800px:flex items-center justify-between">
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                fill="#00000085"
              />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                Total Earning
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">₹ {adminBalance}</h5>
          </div>
  
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <MdBorderClear size={30} className="mr-2" fill="#00000085" />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Sellers
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{sellers && sellers.length}</h5>
            <Link to="/admin-sellers">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Sellers</h5>
            </Link>
          </div>
  
          <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
            <div className="flex items-center">
              <AiOutlineMoneyCollect
                size={30}
                className="mr-2"
                fill="#00000085"
              />
              <h3
                className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
              >
                All Orders
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{adminOrders && adminOrders.length}</h5>
            <Link to="/admin-orders">
              <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
            </Link>
          </div>
        </div>
        <div>
        <div style={{ height: '300px', width: '100%' }}>
              <Bar data={data} options={options} />
            </div>
        </div>
  
        <br />
        <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={4}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
      )
    }
   </>
  );
};




export default AdminDashboardMain;


