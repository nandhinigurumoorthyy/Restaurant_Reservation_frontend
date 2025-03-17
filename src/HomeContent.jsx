import React from "react";
import pic1 from "./images/signup_img1.jpg";
import pic2 from "./images/landing-img-1.png";
import pic3 from "./images/landing-img-2.png";
import pic4 from "./images/landing-img-3.png";
import Navbar from "./Navbar";
import "./index.css";

const HomeContent = () => {
    return (
            <div style={{ backgroundColor: "#341920" }} >
              <Navbar />
              
              {/* Container with Relative Positioning */}
              <div className="flex justify-center items-center pt-10 relative px-2">
  {/* Images Wrapper */}
  <div className="flex  flex-wrap justify-evenly gap-4 md:gap-2 lg:gap-4 w-full pt-9 relative">
    <img
      src={pic2}
      alt="image1"
      className="animate-fadeInUp delay-200 transition-transform duration-500 ease-in hover:scale-105 
                h-40 sm:h-60 md:h-72 lg:h-96 lg:w-56 
                w-1/2 sm:w-44 md:w-40 
                rounded-tr-full object-contain md:object-cover lg:object-cover"
    />
    <img
      src={pic1}
      alt="image2"
      className="animate-fadeInUp delay-200 transition-transform duration-500 ease-in hover:scale-105 
                h-40 sm:h-60 md:h-72 lg:h-96  lg:w-56 
                w-1/2 sm:w-44 md:w-40  
                rounded-t-full object-contain md:object-cover lg:object-cover"
    />
    <img
      src={pic3}
      alt="image3"
      className="animate-fadeInUp delay-200 transition-transform duration-500 ease-in hover:scale-105 
                h-40 sm:h-60 md:h-72 lg:h-96 lg:w-56  
                w-1/2 sm:w-44 md:w-40  
                rounded-t-full object-contain md:object-cover lg:object-cover"
    />
    <img
      src={pic4}
      alt="image4"
      className="animate-fadeInUp delay-200 transition-transform duration-500 ease-in hover:scale-105 
                h-40 sm:h-60 md:h-72 lg:h-96 lg:w-56  
                w-1/2 sm:w-44 md:w-40  
                rounded-tl-full object-contain md:object-cover lg:object-cover"
    />
  </div>
</div>

            </div>
      );
      
};

export default HomeContent;
