import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MdConnectWithoutContact } from "react-icons/md";
import "./index.css";
import img from "../src/images/contact.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main Wrapper */}
      <div className="flex flex-col px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-10 flex-grow">

        {/* Title Section */}
        <div className="py-8 text-2xl sm:text-3xl font-semibold text-center flex gap-3 justify-center items-center">
          <span className="text-4xl text-pink-950">
            <MdConnectWithoutContact />
          </span>
          <span>Contact Us</span>
        </div>

        {/* Main Content (Image + Text) */}
        <div className="flex flex-col md:flex-row gap-8 items-center">

          {/* Image */}
          <figure className="w-full md:w-1/2 px-2">
            <img
              className="w-full h-64 sm:h-96  md:h-[400px] lg:h-[500px] object-cover  rounded-2xl shadow-lg"
              src={img}
              alt="Contact"
            />
          </figure>

          {/* Contact Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center gap-6 text-center">
            <p className="text-base sm:text-lg leading-relaxed">
              Have questions or need assistance with your reservation? We're here to help!
              <br />
              Feel free to contact us for any inquiries, feedback, or support.
            </p>

            <div className="text-base sm:text-lg space-y-2">
              <p><strong>Restaurant Booking Support</strong></p>
              <p>📞 Phone: (+91) 91234 56789</p>
              <p>📧 Email: support@restaurantbooking.com</p>
              <p>🕒 Operating Hours: Monday - Friday (9 AM - 6 PM)</p>
            </div>
          </div>
        </div>

        {/* Optional Spacer */}
        <div className="flex-grow"></div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
