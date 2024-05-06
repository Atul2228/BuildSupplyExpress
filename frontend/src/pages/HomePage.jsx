import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";

import Footer from "../components/Layout/Footer";
import Brands from '../components/Route/Brands/Brands';

const HomePage = () => {

  const images = [
  
    "/Images/s1.jpg",
    "/Images/s2.jpg",  
    "/Images/s3.jpg",
    "/Images/s4.jpg",
    "/Images/s5.jpg",
  ];
  return (
    <div>
        <Header activeHeading={1} />
        <Hero images={images} />
       
        <Categories />
        <Brands />
        <BestDeals />
      
      
        <Footer />
    </div>
  )
}

export default HomePage