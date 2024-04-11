// import React from "react";
// import AdminHeader from "../components/Layout/AdminHeader";
// import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
// import AdminDashboardMain from "../components/Admin/AdminDashboardMain";

// const AdminDashboardPage = () => {
//   return (
//     <div>
//       <AdminHeader />
//       <div className="w-full flex">
//         <div className="flex items-start justify-between w-full">
//           <div className="w-[80px] 800px:w-[330px]">
//             <AdminSideBar active={1} />
//           </div>
//           <AdminDashboardMain />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboardPage;
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

