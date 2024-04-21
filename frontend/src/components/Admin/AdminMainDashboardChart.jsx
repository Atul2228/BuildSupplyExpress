
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
const AdminMainDashboardChart = () => {
    const dispatch = useDispatch();
    const { adminOrders, adminOrderLoading } = useSelector(state => state.order);
    const { users, userLoading } = useSelector(state => state.user);
  
    useEffect(() => {
      dispatch(getAllOrdersOfAdmin());
      dispatch(getAllUsers());
    }, [dispatch]);
  
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
  
   
  
    return (
      <>
     
          <div className="w-full p-4">
            <h3 className="text-[22px] font-Poppins pb-2">Monthly Overview</h3>
            <div style={{ height: '500px', width: '100%' }}>
              <Bar data={data} options={options} />
            </div>
          </div>
 
      </>
    );
  };

  export default AdminMainDashboardChart