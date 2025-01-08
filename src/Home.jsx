import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import pic1 from "./images/pic1.JPG";
import Restaurants from "./Restaurants";
const Home = () => {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <div>
          <div className="flex justify-center items-center pt-4">
            <div className="flex justify-center items-center gap-3 h-5/6 w-3/4">
              <div className="w-1/3 text-gray-500 text-center text-xl">
                The time has come to bring those ideas and plans to life. This
                is where we really begin to visualize your napkin sketches and
                make them into beautiful pixels. Now that your brand is all
                dressed up and ready to party.
              </div>

              <div className="w-5/6 flex justify-center items-center">
                <img src={pic1} alt="pic1" className="h-3/4 w-2/3" />
              </div>
            </div>
          </div>
          <div className="pt-5">
            <Restaurants />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
