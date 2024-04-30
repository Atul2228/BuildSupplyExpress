
import styles from "./Cardcategory.module.css";
import { Link, useNavigate } from "react-router-dom";

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

