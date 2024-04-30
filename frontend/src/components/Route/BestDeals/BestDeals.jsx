
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
 
  useEffect(() => {
    
    const filteredAndSortedProducts =allProducts && allProducts
      .filter(product => product.status === 'Approved') 
      .sort((a, b) => b.sold_out - a.sold_out) 
      .slice(0, 5); 

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

