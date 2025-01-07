import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MdConnectWithoutContact } from "react-icons/md";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-full p-6 font-serif">
        <figure className="flex items-center justify-center pt-5">
          <img
            className="h-96 w-3/6"
            src="https://img.freepik.com/free-photo/talking-client_1098-13119.jpg?t=st=1736232676~exp=1736236276~hmac=a9044dc96f9659f56edf76d02d73f101b9bab4d837ebce5369907cb0770a5953&w=1060"
            alt=""
          />
        </figure>
        <div className="text-3xl font-semibold text-center items-center justify-center flex gap-6 mb-6">
          <span className="text-4xl text-red-700">
            <MdConnectWithoutContact />
          </span>
          <span>Contact Us</span>
        </div>

        <div className="text-center">
          <p className="text-lg mb-4">
            Have questions or need assistance with your reservation? We're here
            to help!<br></br>Feel free to contact us for any inquiries,
            feedback, or support.
          </p>

          <div className="text-lg">
            <p>
              <strong>Restaurant Booking Support:</strong>
            </p>
            <p>
              <strong>Phone:</strong> (+91) 91234 56789
            </p>
            <p>
              <strong>Email:</strong> support@restaurantbooking.com
            </p>
            <p>
              <strong>Operating Hours:</strong> Monday - Friday: 9 AM - 6 PM
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
