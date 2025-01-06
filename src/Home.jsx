import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import pic1 from "../src/images/pic1.jpg";
import pic2 from "../src/images/pic2.jpg";
const Home = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="pt-4">
          <SearchBar />
        </div>
        <div className="h-screen">
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

          <div>hi</div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
