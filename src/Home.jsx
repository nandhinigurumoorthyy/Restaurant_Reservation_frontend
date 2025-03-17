import React from "react";
import Footer from "./Footer";
import Restaurants from "./Restaurants";
import HomeContent from "./HomeContent";
import FooterContent from "./FooterContent";
const Home = () => {
  return (
    <>
      <div className="min-h-screen">
        <HomeContent />
          <div className="pt-5">
            <Restaurants/>
          </div>
   <FooterContent/>
        <Footer />
      </div>
    </>
  );
};

export default Home;
