// import React from 'react'
// import { useNavigate } from "react-router-dom";
import styles from "./CategoriesDropDown.module.css";
// import { categoriesData } from "../static/data";
import {  categoriesData } from "../../static/data";
import { Link } from "react-router-dom";
// import Categories from "../components/Route/Categories/Categories";

// import categoriesData from "../static/data.js";

function CategoriesDropDown() {
  // const navigate = useNavigate();
  // const submitHandle = (item) => {
  //   navigate(`/product?category=${item.title}`);
  //   // window.location.reload();
  // };

  return (
    <div className={styles.dropdown}>
      <p className={styles.dropbtn}>
        Categories
        <i className="fa fa-caret-down"></i>
      </p>
      <div className={styles.dropdownContent}>
        {categoriesData &&
          categoriesData.map((item) => (
            <Link
            to={`/products?category=${item.title}`}
              key={item.id}
              // onClick={() => submitHandle(item)}
            >
              {item.title}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default CategoriesDropDown;
