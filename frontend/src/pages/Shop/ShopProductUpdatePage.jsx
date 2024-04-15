// import React, { useEffect, useState } from 'react'
// import UpdateProduct from '../../components/Shop/UpdateProduct'
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// function ShopProductUpdatePage() {
//     const { allProducts } = useSelector((state) => state.products);
//     // const { allEvents } = useSelector((state) => state.events);
//     const { id } = useParams();
//     const [data, setData] = useState(null);
//     // const [searchParams] = useSearchParams();
//     // const eventData = searchParams.get("isEvent");
  
//     useEffect(() => {
//       // if (eventData !== null) {
//       //   // const data = allEvents && allEvents.find((i) => i._id === id);
//       //   // setData(data);
//       // } 
//       // else {
//         const data = allProducts && allProducts.find((i) => i._id === id);
//         setData(data);
//         // alert(data)
//       // }
//     }, [allProducts]);
//   return (
//     <div>
//       {/* <UpdateProduct d={data}/> */}
//       {
//         <li>{data.name}</li>
//       }
//     </div>
//   )
// }

// export default ShopProductUpdatePage
// // 6618c82b0d8389068e44f855

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { useSelector } from "react-redux";
import ProductDetails from "../../components/Products/ProductDetails";
import UpdateProduct from "../../components/Shop/UpdateProduct";
// import ProductDetails from "../../components/Products/ProductDetails";
// import UpdateProduct from "../../components/Shop/UpdateProduct";=
// import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";

const ShopProductUpdatePage = () => {
  const { allProducts } = useSelector((state) => state.products);
 
  const { id } = useParams();
  const [data, setData] = useState(null);
  

  useEffect(() => {
   
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);

  }, [allProducts]);

  return (
    <div>
    
     
  {
    data ?(   <UpdateProduct data={data} />):null
  }
    
    </div>
  );
};
// const UpdateProduct = ({data}) => {
//   console.log(data.name);
// }


export default ShopProductUpdatePage;

