import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import img from "./images/abt.jpg";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-page min-h-full px-4 md:px-12 lg:px-24 pb-5 mb-3">
        {/* Hero Section */}
        <section className="relative w-full h-64 md:h-80 lg:h-96">
          {/* Image */}
          <img
            className="w-full h-full object-cover rounded-xl"
            src={img}
            alt="About Us Image"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl italic text-center px-4">
              Making Every Dining Experience Memorable
            </p>
          </div>
        </section>

        {/* About Us Title */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-center pt-5 text-pink-950 mb-8">
            About Us
          </h2>
        </section>

        {/* Main Content Container */}
        <div className="px-4 sm:px-8 md:px-12 max-w-5xl mx-auto flex flex-col gap-8">

          {/* Mission Section */}
          <section className="mission-section bg-gray-50 p-4 md:p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-bold text-center">Our Mission</h2>
            <p className="text-base md:text-lg text-center mt-2">
              At Restaurant Booking, we aim to simplify your dining experiences by helping you
              discover the best restaurants around you and make seamless reservations with ease.
              Whether you're craving an upscale meal or a casual outing, we bring all your dining
              options to your fingertips. Our mission is to connect food lovers with the finest
              restaurants to make every dining experience memorable.
            </p>
          </section>

          {/* Story Section */}
          <section className="history-section">
            <h2 className="text-xl md:text-2xl font-bold text-center">Our Story</h2>
            <p className="text-base md:text-lg text-center mt-2">
              Founded in 2024, Restaurant Booking was created to bring convenience and ease to
              dining out. As food enthusiasts ourselves, we understand the challenges of finding
              the perfect place to dine. We've partnered with top-rated restaurants to help you
              find exactly what you're looking for, whether it's a fine dining experience or a cozy
              café. Our platform makes it simple to browse, select, and book your reservation in
              just a few clicks.
            </p>
          </section>

          {/* Core Values Section */}
          <section className="core-values-section">
            <h2 className="text-xl md:text-2xl font-bold text-center">Our Core Values</h2>
            <ul className="text-base md:text-lg text-center mt-4 space-y-4">
              <li>
                <strong>Convenience:</strong> We strive to provide an effortless reservation
                process, helping you book your next meal in just minutes.
              </li>
              <li>
                <strong>Quality Dining:</strong> We only work with the best restaurants to ensure
                that our users have a fantastic experience every time.
              </li>
              <li>
                <strong>Customer Satisfaction:</strong> Your experience matters to us. We aim to
                provide a user-friendly platform that exceeds your expectations.
              </li>
              <li>
                <strong>Innovation:</strong> We are constantly improving our platform to offer new
                features that make booking and exploring restaurants even easier.
              </li>
            </ul>
          </section>

          {/* How It Works Section */}
          <section className="how-it-works-section">
            <h2 className="text-xl md:text-2xl font-bold text-center">How It Works</h2>
            <p className="text-base md:text-lg text-center mt-4">
              Using our platform is simple! Just follow these easy steps to book your next dining
              experience:
            </p>

            {/* Steps */}
            <div className="steps-container mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="step-item text-center p-4 border rounded-lg shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  1. Discover Restaurants
                </h3>
                <p className="text-base">
                  Browse through a curated list of top restaurants in your area, complete with
                  reviews, ratings, and menus.
                </p>
              </div>

              <div className="step-item text-center p-4 border rounded-lg shadow-sm">
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  2. Book Your Reservation
                </h3>
                <p className="text-base">
                  Once you've selected your restaurant and time, simply confirm your reservation
                  with a few clicks. It's that easy!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
