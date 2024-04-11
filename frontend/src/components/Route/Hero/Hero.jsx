
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="position-relative min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:"url(/Images/slide_2.png)", 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container text-center text-lg-start">
        <h1 className="display-4 fw-bold text-dark">
          Best Collection for <br /> building material
        </h1>
        <p className="mt-3 mb-4"></p>
        <Link to="/products" className="btn btn-info  btn-lg">
          Shop Now
        </Link>
      </div>
    </div>
  //   <div>
  //   <img src="/Images/slide_2.png" className="w-100" alt="" />
  // </div>
  );
};

export default Hero;
