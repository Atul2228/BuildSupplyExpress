import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
// import Sponsored from "../components/Route/Sponsored";
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
      
        {/* <Events /> */}
        {/* <FeaturedProduct /> */}
        {/* <Sponsored /> */}
        <Footer />
    </div>
  )
}

export default HomePage