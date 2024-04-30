
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div
      className="position-relative min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage:"url(http://yesofcorsa.com/wp-content/uploads/2018/02/Construction-Wallpaper-1080p.jpg)", 
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

  );
};

export default Hero;
