


// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import ProductCard from "../components/Route/ProductCard/ProductCard";
// import { useSelector } from "react-redux";
// import Header from "../components/Layout/Header";

// const Products = () => {
//   const { allProducts = [] } = useSelector((state) => state.products);
//   const [searchParams] = useSearchParams();
//   const categoryData = searchParams.get("category");
//   const brandData = searchParams.get("brand");
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

  

//   // useEffect(() => {
   
//   //   const filteredByCategory = categoryData
//   //     ? allProducts.filter((product) => product.category === categoryData && product.status === 'Approved')
//   //     : allProducts.filter((product) => product.status === 'Approved');

//   //   setData(filteredByCategory);
//   // }, [allProducts, categoryData]);
//   useEffect(() => {
//     // Filtering logic now includes brand
//     const filteredProducts = allProducts.filter((product) => {
//       // Check if the product status is 'Approved'
//       const isApproved = product.status === 'Approved';
  
//       // Check if the product matches the selected category (if any)
//       const matchesCategory = categoryData ? product.category === categoryData : true;
  
//       // Check if the product matches the selected brand (if any)
//       const matchesBrand = brandData ? product.brand === brandData : true;
  
//       // The product must be approved and match both category and brand (if specified)
//       return isApproved && matchesCategory && matchesBrand;
//     });
  
//     setData(filteredProducts);
//   }, [allProducts, categoryData, brandData]); // Include brandData in the dependency array
  

  
//   const searchAndFilterData = data.filter((val) => {
//     if (searchTerm === "") {
//       return val;
//     } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
//       return val;
//     }
//     return false;
//   });

//   return (
//     <>
//        <Header activeHeading={1} />
//       <div className="templateContainer">
//         <center>
//           <form className="" role="search" style={{marginTop:"20px"}}>
//             <input
//               type="search"
//               className="form-control item-center"
//               placeholder="Search here..."
//               onChange={(event) => setSearchTerm(event.target.value)}
//               aria-label="Search"
//               style={{width:"50%", height:"50px", backgroundColor:"lightblue" , position: ''}}
//               // style={{
//               //   position: 'fixed',
//               //   // top: 10,
//               //   // width: '100%',
//               //   // backgroundColor: '#f9f9f9',
//               //   padding: '10px 0',
//               //   // zIndex: 1000,
//               //   // borderBottom: '1px solid #ccc'
//               // }}
//             />
//           </form>
//         </center>
//         <div className="container my-4">
//           <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 g-3">
//             {searchAndFilterData.length > 0 ? (
//               searchAndFilterData.map((val, index) => (
//                 <ProductCard data={val} key={index} />
//               ))
//             ) : (
              
//                 <h5>No products found.</h5>
             
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;

// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import ProductCard from "../components/Route/ProductCard/ProductCard";
// import { useSelector } from "react-redux";
// import Header from "../components/Layout/Header";

// const Products = () => {
//   const { allProducts = [] } = useSelector((state) => state.products);
//   const [searchParams] = useSearchParams();
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedBrand, setSelectedBrand] = useState('');

//   useEffect(() => {
//     const filteredProducts = allProducts.filter(product => {
//       const price = parseFloat(product.discountPrice); // Make sure product.price is treated as a number
//       const min = parseFloat(minPrice) || 0;  // Ensure minPrice is parsed as number, default to 0
//       const max = parseFloat(maxPrice) || Infinity; // Ensure maxPrice is parsed as number, default to Infinity

//       const isApproved = product.status === 'Approved';
//       const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
//       const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
//       const withinPriceRange = (!minPrice || price >= min) && (!maxPrice || price <= max);

//       return isApproved && matchesCategory && matchesBrand && withinPriceRange;
//     });

//     setData(filteredProducts);
//   }, [allProducts, selectedCategory, selectedBrand, minPrice, maxPrice]);

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const searchAndFilterData = data.filter(product => {
//     return searchTerm === "" || product.name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   return (
//     <>
//       <Header activeHeading={1} />
//       <div className="templateContainer">
//         <div className="sidebar" style={{ float: "left", width: "20%", padding: "10px" }}>
//           <input type="number" placeholder="Min Price" onChange={(e) => setMinPrice(e.target.value)} />
//           <input type="number" placeholder="Max Price" onChange={(e) => setMaxPrice(e.target.value)} />
//           <select onChange={(e) => setSelectedCategory(e.target.value)}>
//             <option value="">All Categories</option>
//             {Array.from(new Set(allProducts.map(p => p.category))).map((category, index) => (
//               <option key={index} value={category}>{category}</option>
//             ))}
//           </select>
//           <select onChange={(e) => setSelectedBrand(e.target.value)}>
//             <option value="">All Brands</option>
//             {Array.from(new Set(allProducts.map(p => p.brand))).map((brand, index) => (
//               <option key={index} value={brand}>{brand}</option>
//             ))}
//           </select>
//         </div>
//         <div className="main-content" style={{ float: "right", width: "80%" }}>
//           <center>
//             <form role="search">
//               <input type="search" className="form-control" placeholder="Search here..." onChange={handleSearch} aria-label="Search" style={{ width: "50%", height: "50px", backgroundColor: "lightblue" }} />
//             </form>
//           </center>
//           <div className="container my-4">
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 g-3">
//               {searchAndFilterData.length > 0 ? (
//                 searchAndFilterData.map((product, index) => (
//                   <ProductCard data={product} key={index} />
//                 ))
//               ) : (
//                 <h5>No products found.</h5>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;




// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import ProductCard from "../components/Route/ProductCard/ProductCard";
// import { useSelector } from "react-redux";
// import Header from "../components/Layout/Header";

// const Products = () => {
//   const { allProducts = [] } = useSelector((state) => state.products);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(4500);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedBrand, setSelectedBrand] = useState('');

//   useEffect(() => {
//     const filteredProducts = allProducts.filter(product => {
//       const price = parseFloat(product.discountPrice || product.price);
//       return product.status === 'Approved' &&
//         (!selectedCategory || product.category === selectedCategory) && 
//        (!selectedBrand || product.brand === selectedBrand) &&
//         price >= minPrice && price <= maxPrice;
//     });
//     setData(filteredProducts);
//   }, [allProducts, selectedCategory, selectedBrand, minPrice, maxPrice]);

//   return (
//     <>
//       <Header activeHeading={1} />
//       <div className="templateContainer" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
//         <div className="sidebar" style={{ position: 'sticky', top: '10px', width: '20%', padding: '10px', height: '100vh', overflowY: 'auto' }}>
//         <div className="sidebar" style={{
//   position: 'sticky', 
//   top: '10px', 
//   // width: '20%', 
//   padding: '20px', 
//   height: '100vh', 
//   overflowY: 'auto', 
//   background: '#f7f7f7', 
//   boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
// }}>
//   <div style={{ }}>
//     <label htmlFor="min-price" style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Min Price: ₹{minPrice}</label>
//     <input type="range" id="min-price" min="0" max="1000" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} style={{ width: '100%' }} />
//   </div>
//   <div style={{ marginBottom: '20px' }}>
//     <label htmlFor="max-price" style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Max Price: ₹{maxPrice}</label>
//     <input type="range" id="max-price" min="0" max="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%' }} />
//   </div>
//   <div style={{ marginBottom: '20px' }}>
//     <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Category</label>
//     <select onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
//       <option value="">All Categories</option>
//       {Array.from(new Set(allProducts.map(p => p.category))).map((category, index) => (
//         <option key={index} value={category}>{category}</option>
//       ))}
//     </select>
//   </div>
//   <div>
//     <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Brand</label>
//     <select onChange={(e) => setSelectedBrand(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
//       <option value="">All Brands</option>
//       {Array.from(new Set(allProducts.map(p => p.brand))).map((brand, index) => (
//         <option key={index} value={brand}>{brand}</option>
//       ))}
//     </select>
//   </div>
// </div>

//         </div>
//         <div className="main-content" style={{ flex: 1, padding: '10px' }}>
//           <div style={{ position: 'sticky', top: '72px', zIndex: 1000, backgroundColor: '#fff', padding: '10px',  }}>
//             <center>
//               <form role="search">
//                 <input type="search" className="form-control" placeholder="Search here..." onChange={(event) => setSearchTerm(event.target.value)} aria-label="Search" style={{ width: "50%", height: "50px", backgroundColor: "lightblue" }} />
//               </form>
//             </center>
//           </div>
//           <div className="container my-4">
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 g-3">
//               {data.length > 0 ? (
//                 data.map((product, index) => (
//                   <ProductCard data={product} key={index} />
//                 ))
//               ) : (
//                 <h5>No products found.</h5>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;





// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import ProductCard from "../components/Route/ProductCard/ProductCard";
// import Header from "../components/Layout/Header";

// const Products = () => {
//   const { allProducts = [] } = useSelector((state) => state.products);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(4500);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedBrand, setSelectedBrand] = useState('');

//   useEffect(() => {
//     const filteredProducts = allProducts.filter(product => {
//       const price = parseFloat(product.discountPrice || product.price);
//       const priceInRange = price >= minPrice && price <= maxPrice;
//       const categoryMatch = !selectedCategory || product.category === selectedCategory;
//       const brandMatch = !selectedBrand || product.brand === selectedBrand;
//       const searchTermMatch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                               product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
//       return product.status === 'Approved' && categoryMatch && brandMatch && priceInRange && searchTermMatch;
//     });

//     setData(filteredProducts);
//   }, [allProducts, selectedCategory, selectedBrand, minPrice, maxPrice, searchTerm]);

//   return (
//     <>
//       <Header activeHeading={1} />
//       <div className="templateContainer" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
//         <div className="sidebar" style={{ position: 'sticky', top: '10px', width: '20%', padding: '10px', height: '100vh', overflowY: 'auto', background: '#f7f7f7', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
//           <div style={{ marginBottom: '20px' }}>
//             <label htmlFor="min-price" style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Min Price: ₹{minPrice}</label>
//             <input type="range" id="min-price" min="0" max="4500" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} style={{ width: '100%' }} />
//           </div>
//           <div style={{ marginBottom: '20px' }}>
//             <label htmlFor="max-price" style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Max Price: ₹{maxPrice}</label>
//             <input type="range" id="max-price" min="0" max="4500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%' }} />
//           </div>
//           <div style={{ marginBottom: '20px' }}>
//             <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Category</label>
//             <select onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
//               <option value="">All Categories</option>
//               {Array.from(new Set(allProducts.map(p => p.category))).map((category, index) => (
//                 <option key={index} value={category}>{category}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>Brand</label>
//             <select onChange={(e) => setSelectedBrand(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
//               <option value="">All Brands</option>
//               {Array.from(new Set(allProducts.map(p => p.brand))).map((brand, index) => (
//                 <option key={index} value={brand}>{brand}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="main-content" style={{ flex: 1, padding: '10px' }}>
//           <div style={{ position: 'sticky', top: '72px', zIndex: 1000, backgroundColor: '#fff', padding: '10px' }}>
//             <center>
//               <form role="search">
//                 <input type="search" className="form-control" placeholder="Search here..." onChange={(event) => setSearchTerm(event.target.value)} aria-label="Search" style={{ width: "50%", height: "50px", backgroundColor: "lightblue" }} />
//               </form>
//             </center>
//           </div>
//           <div className="container my-4">
//             <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 g-3">
//               {data.length > 0 ? data.map((product, index) => (
//                 <ProductCard data={product} key={index} />
//               )) : (
//                 <h5>No products found.</h5>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Products;


import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";

const Products = () => {
  const { allProducts = [] } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  const initialMinPrice = 0;
  const initialMaxPrice = 4500;
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);

  // Read category and brand from URL or default to empty string if not present
  const initialCategory = searchParams.get("category") || '';
  const initialBrand = searchParams.get("brand") || '';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);

  // Update URL search parameters when filters change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    if (selectedCategory) newSearchParams.set("category", selectedCategory);
    if (selectedBrand) newSearchParams.set("brand", selectedBrand);
    setSearchParams(newSearchParams);
  }, [selectedCategory, selectedBrand, setSearchParams]);

  useEffect(() => {
    const filteredProducts = allProducts.filter(product => {
      const price = parseFloat(product.discountPrice || product.price);
      const priceInRange = price >= minPrice && price <= maxPrice;
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      const brandMatch = !selectedBrand || product.brand === selectedBrand;
      const searchTermMatch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return product.status === 'Approved' && categoryMatch && brandMatch && priceInRange && searchTermMatch;
    });

    setData(filteredProducts);
  }, [allProducts, selectedCategory, selectedBrand, minPrice, maxPrice, searchTerm]);

  return (
    <>
      <Header activeHeading={1} />
      <div className="templateContainer" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <div className="sidebar" style={{ position: 'sticky', top: '10px', width: '20%', padding: '10px', height: '100vh', overflowY: 'auto', background: '#f7f7f7', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          {/* Price Filter */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="min-price">Min Price: ₹{minPrice}</label>
            <input type="range" id="min-price" min="0" max="4500" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="max-price">Max Price: ₹{maxPrice}</label>
            <input type="range" id="max-price" min="0" max="4500" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          {/* Category Filter */}
          <div style={{ marginBottom: '20px' }}>
            <label>Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
              <option value="">All Categories</option>
              {Array.from(new Set(allProducts.map(p => p.category))).map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          {/* Brand Filter */}
          <div>
            <label>Brand</label>
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px' }}>
              <option value="">All Brands</option>
              {Array.from(new Set(allProducts.map(p => p.brand))).map((brand, index) => (
                <option key={index} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Main Content */}
        <div className="main-content" style={{ flex: 1, padding: '10px' }}>
          <div style={{ position: 'sticky', top: '72px', zIndex: 1000, backgroundColor: '#fff', padding: '10px' }}>
            <center>
              <form role="search">
                <input type="search" className="form-control" placeholder="Search here..." onChange={(event) => setSearchTerm(event.target.value)} aria-label="Search" style={{ width: "50%", height: "50px", backgroundColor: "lightblue" }} />
              </form>
            </center>
          </div>
          <div className="container my-4">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-5 g-3">
              {data.length > 0 ? data.map((product, index) => (
                <ProductCard data={product} key={index} />
              )) : (
                <h5>No products found.</h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;

