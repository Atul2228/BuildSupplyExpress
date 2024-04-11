import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AllProducts from "../components/Admin/AllProducts";
import ChangeProductStatuss from '../components/Admin/ChangeProductStatuss';

const AdminDashboardProductsStatus = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={5} />
        </div>
        <ChangeProductStatuss />
      </div>
    </div>
  </div>
  )
}

export default AdminDashboardProductsStatus

// import React from 'react'

// function AdminDashboardProductsStatus() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default AdminDashboardProductsStatus


