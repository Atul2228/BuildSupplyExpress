import React, { useState } from 'react';
import ProductCard from '../Route/ProductCard/ProductCard';

const ProductList = ({ searchAndFilterData }) => {
    // Pagination settings
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

   
    const indexOfLastItem = currentPage * itemsPerPage;
    
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const currentItems = searchAndFilterData.slice(indexOfFirstItem, indexOfLastItem);

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

   
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(searchAndFilterData.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {currentItems && currentItems.length > 0 ? (
                currentItems.map((val, index) => (
                    <ProductCard data={val} key={index} />
                ))
            ) : (
                <h5>No products found.</h5>
            )}
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={() => paginate(number)} href='#!' className='page-link'>
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default ProductList;
