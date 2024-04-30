


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

