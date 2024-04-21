// import React, { useEffect } from "react";
// import AdminHeader from "../components/Layout/AdminHeader";
// import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
// import { DataGrid } from "@material-ui/data-grid";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfAdmin } from "../redux/actions/order";

// const AdminDashboardOrders = () => {
//   const dispatch = useDispatch();

//   const { adminOrders, adminOrderLoading } = useSelector(
//     (state) => state.order
//   );

//   useEffect(() => {
//     dispatch(getAllOrdersOfAdmin());
//   }, []);

//   const columns = [
//     { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => {
//         return params.getValue(params.id, "status") === "Delivered"
//           ? "greenColor"
//           : "redColor";
//       },
//     },
//     {
//       field: "itemsQty",
//       headerName: "Items Qty",
//       type: "number",
//       minWidth: 130,
//       flex: 0.7,
//     },

//     {
//       field: "total",
//       headerName: "Total",
//       type: "number",
//       minWidth: 130,
//       flex: 0.8,
//     },
//     {
//         field: "createdAt",
//         headerName: "Order Date",
//         type: "number",
//         minWidth: 130,
//         flex: 0.8,
//       },
//   ];

//   const row = [];
//   adminOrders &&
//     adminOrders.forEach((item) => {
//       row.push({
//         id: item._id,
//         itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
//         total: item?.totalPrice + " ₹",
//         status: item?.status,
//         createdAt: item?.createdAt.slice(0,10),
//       });
//     });
//   return (
//     <div>
//       <AdminHeader />
//       <div className="w-full flex">
//         <div className="flex items-start justify-between w-full">
//           <div className="w-[80px] 800px:w-[330px]">
//             <AdminSideBar active={2} />
//           </div>

//           <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
//             <div className="w-[97%] flex justify-center">
//               <DataGrid
//                 rows={row}
//                 columns={columns}
//                 pageSize={4}
//                 disableSelectionOnClick
//                 autoHeight
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardOrders;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { DataGrid } from '@material-ui/data-grid';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
// import { getAllOrdersOfAdmin } from '../redux/actions/order';
// import AdminHeader from '../components/Layout/AdminHeader';
// import AdminSideBar from '../components/Admin/Layout/AdminSideBar';

// const AdminDashboardOrders = () => {
//   const dispatch = useDispatch();
//   const { adminOrders, adminOrderLoading } = useSelector(state => state.order);
//   const [chartData, setChartData] = useState({});

//   useEffect(() => {
//     dispatch(getAllOrdersOfAdmin());
//   }, [dispatch]);

//   useEffect(() => {
//     if (adminOrders && adminOrders.length > 0) {
//       setChartData(getCategoryData(adminOrders));
//     }
//   }, [adminOrders]);
//   const getCategoryData = (orders) => {
//     const categoryCounts = {};
  
//     orders.forEach(order => {
//       order.cart.forEach(item => {
//         const category = item.category || 'Unknown'; // Default category if none provided
//         categoryCounts[category] = categoryCounts[category] ? categoryCounts[category] + item.qty : item.qty;
//       });
//     });
  
//     const colors =categoryCounts && categoryCounts.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`);
//     const borderColors =colors && colors.map(color => color.replace('0.2', '1'));
  
//     return {
//       labels: Object.keys(categoryCounts),
//       datasets: [{
//         label: 'Orders by Category',
//         data: Object.values(categoryCounts),
//         backgroundColor: colors, // gradient or dynamic colors
//         borderColor: borderColors,
//         borderWidth: 1,
//         hoverBackgroundColor: borderColors,
//         hoverBorderColor: borderColors,
//         borderRadius: 5, // Rounded corners
//       }]
//     };
//   };
  
//   // Enhanced Chart Options
//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       tooltip: {
//         enabled: true,
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//           label: function(tooltipItem) {
//             return `${tooltipItem.dataset.label}: ${tooltipItem.raw} units`;
//           }
//         }
//       }
//     },
//     animation: {
//       animateScale: true,
//       animateRotate: true
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false
//         }
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           borderDash: [8, 4]
//         }
//       }
//     }
//   };
  
//   // In your component's return statement
//   <div className="chart-container" style={{ width: '100%', height: '400px' }}>
//     {chartData.labels && <Bar data={chartData} options={chartOptions} />}
//   </div>
  

//   // const getCategoryData = (orders) => {
//   //   const categoryCounts = {};

//   //   orders.forEach(order => {
//   //     order.cart.forEach(item => {
//   //       const category = item.category || 'Unknown'; // Default category if none provided
//   //       categoryCounts[category] = categoryCounts[category] ? categoryCounts[category] + item.qty : item.qty;
//   //     });
//   //   });

//   //   return {
//   //     labels: Object.keys(categoryCounts),
//   //     datasets: [{
//   //       label: 'Orders by Category',
//   //       data: Object.values(categoryCounts),
//   //       backgroundColor: [
//   //         'rgba(255, 99, 132, 0.2)',
//   //         'rgba(54, 162, 235, 0.2)',
//   //         'rgba(255, 206, 86, 0.2)',
//   //         'rgba(75, 192, 192, 0.2)',
//   //         'rgba(153, 102, 255, 0.2)',
//   //         'rgba(255, 159, 64, 0.2)'
//   //       ],
//   //       borderColor: [
//   //         'rgba(255, 99, 132, 1)',
//   //         'rgba(54, 162, 235, 1)',
//   //         'rgba(255, 206, 86, 1)',
//   //         'rgba(75, 192, 192, 1)',
//   //         'rgba(153, 102, 255, 1)',
//   //         'rgba(255, 159, 64, 1)'
//   //       ],
//   //       borderWidth: 1
//   //     }]
//   //   };
//   // };

//   const columns = [
//     { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
//     {
//       field: 'status',
//       headerName: 'Status',
//       minWidth: 130,
//       flex: 0.7,
//       cellClassName: (params) => params.getValue(params.id, 'status') === 'Delivered' ? 'greenColor' : 'redColor',
//     },
//     {
//       field: 'itemsQty',
//       headerName: 'Items Qty',
//       type: 'number',
//       minWidth: 130,
//       flex: 0.7,
//     },
//     {
//       field: 'total',
//       headerName: 'Total',
//       type: 'number',
//       minWidth: 130,
//       flex: 0.8,
//     },
//     {
//       field: 'createdAt',
//       headerName: 'Order Date',
//       type: 'number',
//       minWidth: 130,
//       flex: 0.8,
//     },
//   ];

//   const rows =adminOrders && adminOrders.map((item) => ({
//     id: item._id,
//     itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
//     total: item?.totalPrice + " ₹",
//     status: item?.status,
//     createdAt: item?.createdAt.slice(0,10),
//   }));

//   return (
//     <div>
//       <AdminHeader />
//       <div className="w-full flex">
//         <div className="flex items-start justify-between w-full">
//           <div className="w-[80px] 800px:w-[330px]">
//             <AdminSideBar active={2} />
//           </div>
//           <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
//             <div className="w-[97%] flex justify-center">
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 pageSize={4}
//                 disableSelectionOnClick
//                 autoHeight
//               />
//             </div>
//           </div>
         
//         </div>
//         <div className="chart-container" style={{ width: '600px', height: '400px' }}>
//             {chartData.labels && <Bar data={chartData} />}
//           </div>
//       </div>
     
//     </div>
//   );
// };


// export default AdminDashboardOrders;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfAdmin } from "../redux/actions/order";
// import AdminHeader from "../components/Layout/AdminHeader";
// import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
// import { DataGrid } from "@material-ui/data-grid";
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const AdminDashboardOrders = () => {
//     const dispatch = useDispatch();
//     const { adminOrders, adminOrderLoading } = useSelector(state => state.order);
//     const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//     useEffect(() => {
//         dispatch(getAllOrdersOfAdmin());
//     }, [dispatch]);

//     useEffect(() => {
//         if (adminOrders && adminOrders.length > 0) {
//             const dataMap = new Map();

//             // Calculate totals per day within the month
//             adminOrders.forEach(order => {
//                 const day = new Date(order.createdAt).getDate();
//                 const existingTotal = dataMap.get(day) || 0;
//                 dataMap.set(day, existingTotal + (order.totalPrice ? parseFloat(order.totalPrice) : 0));
//             });

//             const labels = Array.from(dataMap.keys()).sort((a, b) => a - b);
//             const data = labels.map(label => dataMap.get(label));

//             setChartData({
//                 labels,
//                 datasets: [{
//                     label: 'Total Sales per Day',
//                     data,
//                     borderColor: 'rgb(75, 192, 192)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.5)',
//                 }]
//             });
//         } else {
//             // Reset chart data if no orders are present
//             setChartData({ labels: [], datasets: [] });
//         }
//     }, [adminOrders]);

//     const columns = [
//         { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
//         { field: "status", headerName: "Status", minWidth: 130, flex: 0.7, cellClassName: (params) => params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor" },
//         { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
//         { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
//         { field: "createdAt", headerName: "Order Date", minWidth: 130, flex: 0.8 }
//     ];

//     const rows = adminOrders ? adminOrders.map((order) => ({
//         id: order._id,
//         itemsQty: order.cart ? order.cart.reduce((acc, item) => acc + item.qty, 0) : 0,
//         total: `${order.totalPrice} ₹`,
//         status: order.status,
//         createdAt: order.createdAt.slice(0, 10),
//     })) : [];

//     return (
//         <div>
//             <AdminHeader />
//             <div className="w-full flex">
//                 <AdminSideBar active={2} />
//                 <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
//                     <div className="w-[97%]">
//                         <DataGrid
//                             rows={rows}
//                             columns={columns}
//                             pageSize={4}
//                             disableSelectionOnClick
//                             autoHeight
//                         />
//                         {chartData.labels && chartData.labels.length > 0 && <Line data={chartData} />}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardOrders;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfAdmin } from "../redux/actions/order";
// import AdminHeader from "../components/Layout/AdminHeader";
// import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
// import { DataGrid } from "@material-ui/data-grid";
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const AdminDashboardOrders = () => {
//     const dispatch = useDispatch();
//     const { adminOrders, adminOrderLoading } = useSelector(state => state.order);
//     const [chartData, setChartData] = useState({ labels: [], datasets: [] });

//     useEffect(() => {
//         dispatch(getAllOrdersOfAdmin());
//     }, [dispatch]);

//     useEffect(() => {
//         if (adminOrders && adminOrders.length > 0) {
//             const dataMap = new Map();

//             for (let i = 1; i <= 12; i++) {
//                 dataMap.set(i, 0); // Initialize months with zero totals
//             }

//             adminOrders.forEach(order => {
//                 const month = new Date(order.createdAt).getMonth() + 1;
//                 const existingTotal = dataMap.get(month) || 0;
//                 dataMap.set(month, existingTotal + (order.totalPrice ? parseFloat(order.totalPrice) : 0));
//             });
//             const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//             const labels = Array.from(dataMap.keys()).map(month => months);
//             const data = Array.from(dataMap.values());

//             setChartData({
//                 labels,
//                 datasets: [{
//                     label: 'Total Sales per Month',
//                     data,
//                     borderColor: 'rgb(75, 192, 192)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.5)',
//                 }]
//             });
//         } else {
//             setChartData({ labels: [], datasets: [] });
//         }
//     }, [adminOrders]);

//     const columns = [
//         { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
//         { field: "status", headerName: "Status", minWidth: 130, flex: 0.7, cellClassName: (params) => params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor" },
//         { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
//         { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
//         { field: "createdAt", headerName: "Order Date", minWidth: 130, flex: 0.8 }
//     ];

//     const rows = adminOrders ? adminOrders.map((order) => ({
//         id: order._id,
//         itemsQty: order.cart ? order.cart.reduce((acc, item) => acc + item.qty, 0) : 0,
//         total: `${order.totalPrice} ₹`,
//         status: order.status,
//         createdAt: order.createdAt.slice(0, 10),
//     })) : [];

//     return (
//         <div>
//             <AdminHeader />
            


//             <div className="w-full flex">

//                 {/* <AdminSideBar active={2} /> */}
//                 <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
//                     <div className="w-[97%]">
//                         <DataGrid
//                             rows={rows}
//                             columns={columns}
//                             pageSize={4}
//                             disableSelectionOnClick
//                             autoHeight
//                         />
//                         {chartData.labels && chartData.labels.length > 0 && <Line data={chartData} />}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardOrders;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfAdmin } from "../redux/actions/order";
// import AdminHeader from "../components/Layout/AdminHeader";
// import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
// import { DataGrid } from "@material-ui/data-grid";
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const AdminDashboardOrders = () => {
//     const dispatch = useDispatch();
//     const { adminOrders, adminOrderLoading } = useSelector(state => state.order);
//     const [chartData, setChartData] = useState({ labels: [], datasets: [] });
//     const monthNames = ["January", "February", "March", "April", "May", "June", 
//                         "July", "August", "September", "October", "November", "December"];

//     useEffect(() => {
//         dispatch(getAllOrdersOfAdmin());
//     }, [dispatch]);

//     useEffect(() => {
//         if (adminOrders && adminOrders.length > 0) {
//             const dataMap = new Map();

//             for (let i = 1; i <= 12; i++) {
//                 dataMap.set(i, 0);
//             }

//             adminOrders.forEach(order => {
//                 const month = new Date(order.createdAt).getMonth() + 1;
//                 const existingTotal = dataMap.get(month) || 0;
//                 dataMap.set(month, existingTotal + (order.totalPrice ? parseFloat(order.totalPrice) : 0));
//             });

//             const labels = Array.from(dataMap.keys()).map(monthIndex => monthNames[monthIndex - 1]);
//             const data = Array.from(dataMap.values());

//             setChartData({
//                 labels,
//                 datasets: [{
//                     label: 'Total Sales per Month',
//                     data,
//                     borderColor: 'rgb(75, 192, 192)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.5)',
//                 }]
//             });
//         } else {
//             setChartData({ labels: [], datasets: [] });
//         }
//     }, [adminOrders]);

//     const columns = [
//         { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
//         // { field: "name", headerName: "Produc Name", minWidth: 150, flex: 0.7 },
//         { field: "status", headerName: "Status", minWidth: 130, flex: 0.7, cellClassName: (params) => params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor" },
//         { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
//         { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
//         { field: "createdAt", headerName: "Order Date", minWidth: 130, flex: 0.8 }
//     ];

//     const rows = adminOrders ? adminOrders.map((order) => ({
//         id: order._id,
//         // name: order.name,
//         itemsQty: order.cart ? order.cart.reduce((acc, item) => acc + item.qty, 0) : 0,
//         total: `${order.totalPrice} ₹`,
//         status: order.status,
//         createdAt: order.createdAt.slice(0, 10),
//     })) : [];

//     return (
//         <div>
//             <AdminHeader />
//             <div className="w-full flex">
//             <div className="w-[80px] 800px:w-[330px]">
//             <AdminSideBar active={2} />
//           </div>
//                 <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
//                     <div className="w-[97%]">
//                         <DataGrid
//                             rows={rows}
//                             columns={columns}
//                             pageSize={4}
//                             disableSelectionOnClick
//                             autoHeight
//                         />
//                         {chartData.labels && chartData.labels.length > 0 && <Line data={chartData} />}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardOrders;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfAdmin } from "../redux/actions/order";
// import AdminHeader from "../components/Layout/AdminHeader";
// import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
// import { DataGrid } from "@material-ui/data-grid";
// import { Line, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

// const AdminDashboardOrders = () => {
//     const dispatch = useDispatch();
//     const { adminOrders, adminOrderLoading } = useSelector(state => state.order);
//     const [chartData, setChartData] = useState({ labels: [], datasets: [] });
//     const [categoryChartData, setCategoryChartData] = useState({ labels: [], datasets: [] });
//     const monthNames = ["January", "February", "March", "April", "May", "June", 
//                         "July", "August", "September", "October", "November", "December"];

//     useEffect(() => {
//         dispatch(getAllOrdersOfAdmin());
//     }, [dispatch]);

//     useEffect(() => {
//         if (adminOrders && adminOrders.length > 0) {
//             const dataMap = new Map();
//             const categoryCounts = {};

//             for (let i = 1; i <= 12; i++) {
//                 dataMap.set(i, 0); // Initialize months with zero totals
//             }

//             adminOrders.forEach(order => {
//                 const month = new Date(order.createdAt).getMonth() + 1;
//                 const existingTotal = dataMap.get(month) || 0;
//                 dataMap.set(month, existingTotal + (order.totalPrice ? parseFloat(order.totalPrice) : 0));

//                 order.cart.forEach(item => {
//                     const category = item.category || 'Unknown'; // Handle items without category
//                     categoryCounts[category] = (categoryCounts[category] || 0) + item.qty;
//                 });
//             });

//             const labels = Array.from(dataMap.keys()).map(monthIndex => monthNames[monthIndex - 1]);
//             const data = Array.from(dataMap.values());
//             setChartData({
//                 labels,
//                 datasets: [{
//                     label: 'Total Sales per Month',
//                     data,
//                     borderColor: 'rgb(75, 192, 192)',
//                     backgroundColor: 'rgba(75, 192, 192, 0.5)',
//                 }]
//             });

//             const categoryLabels = Object.keys(categoryCounts);
//             const categoryData = Object.values(categoryCounts);
//             setCategoryChartData({
//                 labels: categoryLabels,
//                 datasets: [{
//                     label: 'Items Sold per Category',
//                     data: categoryData,
//                     backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                     borderColor: 'rgba(54, 162, 235, 1)',
//                 }]
//             });
//         }
//     }, [adminOrders]);

//     const columns = [
//         { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
//         { field: "status", headerName: "Status", minWidth: 130, flex: 0.7, cellClassName: (params) => params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor" },
//         { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
//         { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
//         { field: "createdAt", headerName: "Order Date", minWidth: 130, flex: 0.8 }
//     ];

//     const rows = adminOrders ? adminOrders.map(order => ({
//         id: order._id,
//         itemsQty: order.cart ? order.cart.reduce((acc, item) => acc + item.qty, 0) : 0,
//         total: `${order.totalPrice} ₹`,
//         status: order.status,
//         createdAt: order.createdAt.slice(0, 10),
//     })) : [];

//     return (
//         <div>
//             <AdminHeader />
//             <div className="w-full flex">
//                          <div className="w-[80px] 800px:w-[330px]">
//              <AdminSideBar active={2} />           </div>
//                 <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
//                     <div className="w-[97%]">
//                         <DataGrid
//                             rows={rows}
//                             columns={columns}
//                             pageSize={4}
//                             disableSelectionOnClick
//                             autoHeight
//                         />
//                         {chartData.labels && chartData.labels.length > 0 && <Line data={chartData} />}
//                         {categoryChartData.labels && categoryChartData.labels.length > 0 && <Bar data={categoryChartData} options={{
//                             scales: {
//                                 y: {
//                                     beginAtZero: true
//                                 }
//                             }
//                         }} />}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminDashboardOrders;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../redux/actions/order";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import { DataGrid } from "@material-ui/data-grid";
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const AdminDashboardOrders = () => {
    const dispatch = useDispatch();
    const { adminOrders, adminOrderLoading } = useSelector(state => state.order);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });
    const [categoryChartData, setCategoryChartData] = useState({ labels: [], datasets: [] });
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const categories = [
        'Cement', 'Bricks', 'Tiles', 'Sand', 'Paint', 'TMT Steels', 
        'Bathroom Accessories', 'Hardware Fixtures', 'Plumbing', 'Electrical'
    ];

    useEffect(() => {
        dispatch(getAllOrdersOfAdmin());
    }, [dispatch]);

    useEffect(() => {
        if (adminOrders && adminOrders.length > 0) {
            const dataMap = new Map();
            const categoryCounts = categories.reduce((acc, category) => ({...acc, [category]: 0}), {});

            for (let i = 1; i <= 12; i++) {
                dataMap.set(i, 0); // Initialize months with zero totals
            }

            adminOrders.forEach(order => {
                const month = new Date(order.createdAt).getMonth() + 1;
                const existingTotal = dataMap.get(month) || 0;
                dataMap.set(month, existingTotal + (order.totalPrice ? parseFloat(order.totalPrice) : 0));

                order.cart.forEach(item => {
                    const category = item.category || 'Unknown';
                    if (category in categoryCounts) {
                        categoryCounts[category] += item.qty;
                    }
                });
            });

            const labels = Array.from(dataMap.keys()).map(monthIndex => monthNames[monthIndex - 1]);
            const data = Array.from(dataMap.values());
            setChartData({
                labels,
                datasets: [{
                    label: 'Total Sales per Month',
                    data,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                }]
            });

            const categoryData = Object.values(categoryCounts);
            setCategoryChartData({
                labels: Object.keys(categoryCounts),
                datasets: [{
                    label: 'Items Sold per Category',
                    data: categoryData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                }]
            });
        }
    }, [adminOrders]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        { field: "status", headerName: "Status", minWidth: 130, flex: 0.7, cellClassName: (params) => params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor" },
        { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 130, flex: 0.7 },
        { field: "total", headerName: "Total", type: "number", minWidth: 130, flex: 0.8 },
        { field: "createdAt", headerName: "Order Date", minWidth: 130, flex: 0.8 }
    ];

    const rows = adminOrders ? adminOrders.map(order => ({
        id: order._id,
        itemsQty: order.cart ? order.cart.reduce((acc, item) => acc + item.qty, 0) : 0,
        total: ` ₹${order.totalPrice} `,
        status: order.status,
        createdAt: order.createdAt.slice(0, 10),
    })) : [];

    return (
        <div>
            <AdminHeader />
            <div className="w-full flex">
            <div className="w-[80px] 800px:w-[330px]">
             <AdminSideBar active={2} />           </div>
                <div className="w-full min-h-[45vh] pt-5 rounded flex justify-center">
                    <div className="w-[97%]">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            autoHeight
                        />
                        <div  >
                        {chartData.labels && chartData.labels.length > 0 && <Line data={chartData} />}
                        {categoryChartData.labels && categoryChartData.labels.length > 0 && <Bar data={categoryChartData} options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true
                                }
                            }
                        }} />}
                        
</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardOrders;






