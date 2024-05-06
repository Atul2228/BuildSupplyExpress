
import styles from "./CategoriesDropDown.module.css";

import {  categoriesData } from "../../static/data";
import { Link } from "react-router-dom";


function CategoriesDropDown() {


  return (
    <div className={styles.dropdown}>
      <p className={styles.dropbtn} style={{color:"white"}}>
        Categories
        <i className="fa fa-caret-down"></i>
      </p>
      <div className={styles.dropdownContent}>
        {categoriesData &&
          categoriesData.map((item) => (
            <Link
            to={`/products?category=${item.title}`}
              key={item.id}
             
            >
              {item.title}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default CategoriesDropDown;
