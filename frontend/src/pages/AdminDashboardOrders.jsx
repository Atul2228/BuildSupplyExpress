


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






