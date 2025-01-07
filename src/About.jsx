import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-page min-h-full px-4 mx-4 font-serif">
        <section>
          <figure className="flex items-center justify-center pt-5">
            <img
              className="h-96 w-3/6"
              src="https://m.media-amazon.com/images/I/716ZNYmUOfL._AC_UF1000,1000_QL80_.jpg"
              alt="about img"
            />
          </figure>
        </section>
        <section className="mission-section py-12 bg-gray-50">
          <h2 className="text-4xl font-bold text-center">Our Mission</h2>
          <p className="text-xl text-center mt-4 px-8 max-w-3xl mx-auto">
            At Restaurant Booking, we aim to simplify your dining experiences by
            helping you discover the best restaurants around you and make
            seamless reservations with ease. Whether you're craving an upscale
            meal or a casual outing, we bring all your dining options to your
            fingertips. Our mission is to connect food lovers with the finest
            restaurants to make every dining experience memorable.
          </p>
        </section>

        <section className="history-section py-12 ">
          <h2 className="text-4xl font-bold text-center">Our Story</h2>
          <p className="text-xl text-center mt-4 px-8 max-w-3xl mx-auto">
            Founded in 2024, Restaurant Booking was created to bring convenience
            and ease to dining out. As food enthusiasts ourselves, we understand
            the challenges of finding the perfect place to dine. We’ve partnered
            with top-rated restaurants to help you find exactly what you're
            looking for, whether it's a fine dining experience or a cozy café.
            Our platform makes it simple to browse, select, and book your
            reservation in just a few clicks.
          </p>
        </section>

        <section className="core-values-section py-12 bg-gray-50">
          <h2 className="text-4xl font-bold text-center">Our Core Values</h2>
          <ul className="text-xl text-center mt-4 px-8 max-w-3xl mx-auto">
            <li className="mb-4">
              <strong>Convenience:</strong> We strive to provide an effortless
              reservation process, helping you book your next meal in just
              minutes.
            </li>
            <li className="mb-4">
              <strong>Quality Dining:</strong> We only work with the best
              restaurants to ensure that our users have a fantastic experience
              every time.
            </li>
            <li className="mb-4">
              <strong>Customer Satisfaction:</strong> Your experience matters to
              us. We aim to provide a user-friendly platform that exceeds your
              expectations.
            </li>
            <li className="mb-4">
              <strong>Innovation:</strong> We are constantly improving our
              platform to offer new features that make booking and exploring
              restaurants even easier.
            </li>
          </ul>
        </section>

        <section className="how-it-works-section py-12">
          <h2 className="text-4xl font-bold text-center">How It Works</h2>
          <p className="text-xl text-center mt-4 px-8 max-w-3xl mx-auto">
            Using our platform is simple! Just follow these easy steps to book
            your next dining experience:
          </p>

          <div className="steps-container mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 justify-items-center items-center">
            <div className="step-item text-center">
              <h3 className="text-2xl font-semibold">
                1. Discover Restaurants
              </h3>
              <p className="text-lg mt-2">
                Browse through a curated list of top restaurants in your area,
                complete with reviews, ratings, and menus.
              </p>
            </div>

            <div className="step-item text-center">
              <h3 className="text-2xl font-semibold">
                2. Book Your Reservation
              </h3>
              <p className="text-lg mt-2">
                Once you’ve selected your restaurant and time, simply confirm
                your reservation with a few clicks. It’s that easy!
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default About;
