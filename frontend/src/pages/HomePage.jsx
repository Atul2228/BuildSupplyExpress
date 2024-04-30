import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";

import Footer from "../components/Layout/Footer";
import Brands from '../components/Route/Brands/Brands';

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
       
        <Categories />
        <Brands />
        <BestDeals />
      
      
        <Footer />
    </div>
  )
}

export default HomePage