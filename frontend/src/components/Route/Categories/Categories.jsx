// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { brandingData, categoriesData } from "../../../static/data";
// import styles from "../../../styles/styles";

// const Categories = () => {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div className={`${styles.section} hidden sm:block`}>
//         <div
//           className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
//         >
//           {brandingData &&
//             brandingData.map((i, index) => (
//               <div className="flex items-start" key={index}>
//                 {i.icon}
//                 <div className="px-3">
//                   <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
//                   <p className="text-xs md:text-sm">{i.Description}</p>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>

//       <div
//         className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
//         id="categories"
//       >
//         <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
//           {categoriesData &&
//             categoriesData.map((i) => {
//               const handleSubmit = (i) => {
//                 navigate(`/products?category=${i.title}`);
//               };
//               return (
//                 <div
//                   className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
//                   key={i.id}
//                   onClick={() => handleSubmit(i)}
//                 >
//                   <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
//                   <img
//                     src={i.image_Url}
//                     className="w-[120px] object-cover"
//                     alt=""
//                   />
//                 </div>
//               );
//             })}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;

// import React from 'react'
import styles from "./Cardcategory.module.css";
import { Link, useNavigate } from "react-router-dom";
// import { categoriesData } from "../static/data";
import { brandingData, categoriesData } from "../../../static/data";

function Cardcategory() {
  const navigate = useNavigate();

  return (
    <>

<div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      
    <div className="container">
    <h1>Categories</h1>
    
      <div className="row my-lg-4 my-0">
        {categoriesData.map((item) => {
          const hadleSubmit = (item) =>
            navigate(`/products?category=${item.title}`);

          return (
            <div
              key={item.id}
              className="col-md-3"
              onClick={() => hadleSubmit(item)}
            >
              <div className={styles.block}>
                <div
                  className="card    my-lg-0 my-3"
                  style={{ position: "static" }}
                >
                  <div className="card-body  d-flex justify-content-center ">
                    <img
                      src={item.image_Url}
                      alt="card1"
                      className={styles.image}
                    />
                  </div>
                  <Link
                 
                    className="btn mt-auto bg-info w-100 "
                  >
                    {item.title}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default Cardcategory;

