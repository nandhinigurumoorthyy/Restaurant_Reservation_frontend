import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiDirectionSign } from "react-icons/gi";
import { IoLogIn, IoRestaurant } from "react-icons/io5";
import "./index.css";

// Import your slider images
import Image1 from "../src/images/image1.jpg";
import Image2 from "../src/images/image2.jpg";
import Image3 from "../src/images/image3.jpg";
import Image4 from "../src/images/image4.jpg";
import Image5 from "../src/images/image5.jpg";

const images = [Image1, Image2, Image3, Image4, Image5];

const Frontpage = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div className="flex flex-row h-screen overflow-hidden bg-white">
      {/* Left side - Image Slider */}
      <div className="w-1/2 h-full relative overflow-hidden flex justify-center items-center">
        {/* Background Color Bar (only height h-72 and full width) */}
        <div
          className="absolute w-full h-72"
          style={{ backgroundColor: "#341920" }}
        ></div>

        {/* Full Height Image Slider */}
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out relative z-10"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0 rounded-full"
            />
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${current === index ? "bg-white" : "bg-gray-500"
                }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Right side - Content */}
      <div className="flex justify-center items-center w-1/2  gap-1">
        <div
          className="flex justify-center items-center relative w-full h-72"
          style={{ backgroundColor: "#341920" }}
        >
          {/* Background Logo as Watermark (Optional) */}
          {/* <IoRestaurant className="absolute text-[400px] md:text-[500px] text-white opacity-10 z-0" /> */}

          {/* Foreground Content */}
          <div className="flex flex-col items-center justify-center w-full h-full gap-1">
            {/* Title with Logo - Centered */}
            <div className="flex gap-4 text-4xl md:text-5xl text-white items-center justify-center animate-fadeInUp">
              <IoRestaurant className="text-5xl" />
              <span className="dancing-script-regular text-center">
                Reserve & Dine
              </span>
            </div>

            {/* Right-Aligned Welcome Message */}
            <div className="w-full animate-fadeInUp delay-200 pr-24">
              <h3 className="flex justify-end">
                <span className="big-shoulders text-xs md:text-base text-white italic">
                  Welcome to your dining destination!
                </span>
              </h3>
            </div>

            {/* Tagline */}
            <div className="mt-4 text-lg text-center text-gray-300 animate-fadeInUp delay-500">
              <p>Your table is waiting — reserve moments that matter...</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-6 flex-wrap justify-center animate-fadeInUp delay-700">
              <Link
                to="/create"
                className="rounded-md px-6 py-2 text-lg border-2 border-white hover:rounded-xl text-white flex gap-2 items-center no-underline justify-center"
              >
                <GiDirectionSign className="text-2xl" />
                SignUp
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 text-lg border-2 border-white rounded-md hover:rounded-xl text-white flex gap-2 items-center no-underline justify-center"
              >
                <IoLogIn className="text-2xl" />
                LogIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frontpage;
