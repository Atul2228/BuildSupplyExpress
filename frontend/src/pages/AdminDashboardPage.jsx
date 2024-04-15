
import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />
      <div className="container-fluid p-0">
        <div className="row no-gutters">

          <div className="col-12 col-md-3">
            <AdminSideBar active={1} />
          </div>

          <div className="col">
            <AdminDashboardMain />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

