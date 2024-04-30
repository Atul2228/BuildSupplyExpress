
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "@material-ui/core";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AllUsers = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector(state => state.user);
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const handleDelete = async (id) => {
        await axios.delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
        .then((res) => {
            toast.success(res.data.message);
            dispatch(getAllUsers());
        })
        .catch(error => toast.error("Error deleting user"));
    };

    const columns = [
        { field: "id", headerName: "User ID", width: 150 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "role", headerName: "Role", width: 120 },
        { field: "joinedAt", headerName: "Joined At", width: 160 },
        {
            field: "delete",
            headerName: "Delete User",
            sortable: false,
            renderCell: (params) => (
                <Button onClick={() => { setUserId(params.id); setOpen(true); }} size="small">
                    <AiOutlineDelete />
                </Button>
            ),
            width: 130
        }
    ];

    
    const rows = users ? users.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        joinedAt: user.createdAt.slice(0, 10)
    })) : [];

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthData = months.reduce((acc, month) => ({...acc, [month]: 0}), {});

    if (users) {
        users.forEach(user => {
            const month = new Date(user.createdAt).toLocaleString('default', { month: 'long' });
            monthData[month] = (monthData[month] || 0) + 1;
        });
    }

    const userDataForChart = {
        labels: months,
        datasets: [{
            label: 'Users Joined per Month',
            data: months.map(month => monthData[month]),
            fill: false,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales: { y: { beginAtZero: true } },
        maintainAspectRatio: 2
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading users.</div>;

    return (
        <div style={{ height: 650, width: '100%' }}>
            {/* <DataGrid rows={rows} columns={columns} pageSize={10}  /> */}
            {/* <Line data={userDataForChart} options={options} />
             */}
                     <div className="w-full min-h-[45vh] bg-white rounded">
          {/* <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          /> */}
          <DataGrid
  rows={rows}
  columns={columns}
  pageSize={10} // This controls the number of rows per page
  pagination
  autoHeight
  disableSelectionOnClick
/>
        </div>
                 <div style={{ height: 500, width: '100%' }}> {/* Adjust chart container size here */}
            <Line data={userDataForChart} options={options} />
        </div>

        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you wanna delete this user?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() =>  setOpen(false) || handleDelete(userId)}
                >
                  confirm
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
    );
};

export default AllUsers;




