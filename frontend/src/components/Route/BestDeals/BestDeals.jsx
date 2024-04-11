// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import styles from "../../../styles/styles";
// import ProductCard from "../ProductCard/ProductCard";

// const BestDeals = () => {
//   const [data, setData] = useState([]);
//   const { allProducts } = useSelector((state) => state.products);
//   useEffect(() => {
//     const allProductsData = allProducts ? [...allProducts] : [];
//     const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
//     const firstFive = sortedData && sortedData.slice(0, 5);
//     setData(firstFive);
//   }, [allProducts]);
  

//   return (
//     <div>
//       <div className={`${styles.section}`}>
//         <div className={`${styles.heading}`}>
//           <h1>Best Deals</h1>
//         </div>
//         <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
//            {
//             data && data.length !== 0 &&(
//               <>
//                {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
//               </>
//             )
//            }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BestDeals;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  // useEffect(() => {
  //   const allProductsData = allProducts ? [...allProducts] : [];
  //   const sortedData = allProductsData.sort((a, b) => b.sold_out - a.sold_out);
  //   const firstFive = sortedData.slice(0, 5);
  //   setData(firstFive);
  // }, [allProducts]);
  useEffect(() => {
    // Assuming allProducts already contains the list of products
    // Filter to include only approved products, then sort them by the sold_out property
    const filteredAndSortedProducts =allProducts && allProducts
      .filter(product => product.status === 'Approved') // Include only approved products
      .sort((a, b) => b.sold_out - a.sold_out) // Sort by sold_out in descending order
      .slice(0, 5); // Take the first five products

    setData(filteredAndSortedProducts);
  }, [allProducts]);
  

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Best Deals</h1>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 g-3">
        {data && data.length !== 0 &&
          data.map((item, index) => (
            <div className="col" key={index}>
              <ProductCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default BestDeals;

