


import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";

const Products = () => {
  const { allProducts = [] } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const brandData = searchParams.get("brand");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  

  // useEffect(() => {
   
  //   const filteredByCategory = categoryData
  //     ? allProducts.filter((product) => product.category === categoryData && product.status === 'Approved')
  //     : allProducts.filter((product) => product.status === 'Approved');

  //   setData(filteredByCategory);
  // }, [allProducts, categoryData]);
  useEffect(() => {
    // Filtering logic now includes brand
    const filteredProducts = allProducts.filter((product) => {
      // Check if the product status is 'Approved'
      const isApproved = product.status === 'Approved';
  
      // Check if the product matches the selected category (if any)
      const matchesCategory = categoryData ? product.category === categoryData : true;
  
      // Check if the product matches the selected brand (if any)
      const matchesBrand = brandData ? product.brand === brandData : true;
  
      // The product must be approved and match both category and brand (if specified)
      return isApproved && matchesCategory && matchesBrand;
    });
  
    setData(filteredProducts);
  }, [allProducts, categoryData, brandData]); // Include brandData in the dependency array
  

  
  const searchAndFilterData = data.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
    return false;
  });

  return (
    <>
       <Header activeHeading={1} />
      <div className="templateContainer">
        <center>
          <form className="" role="search" style={{marginTop:"20px"}}>
            <input
              type="search"
              className="form-control item-center"
              placeholder="Search here..."
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search"
              style={{width:"50%", height:"50px", backgroundColor:"lightblue"}}
            />
          </form>
        </center>
        <div className="container my-4">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 g-3">
            {searchAndFilterData.length > 0 ? (
              searchAndFilterData.map((val, index) => (
                <ProductCard data={val} key={index} />
              ))
            ) : (
              
                <h5>No products found.</h5>
             
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;





