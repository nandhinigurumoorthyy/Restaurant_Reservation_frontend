import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  // Sample data for the user profile (this could come from an API or context)
  const [user, setUser] = useState({
    username: "John Doe",
    age:21,
    contactDetails: "john.doe@example.com",
    bookings: [
      {
        id: 1,
        restaurant: "The Gourmet Kitchen",
        date: "2025-01-15",
        partySize: 4,
        status: "Confirmed",
      },
      {
        id: 2,
        restaurant: "Pasta Paradise",
        date: "2025-01-20",
        partySize: 2,
        status: "Pending",
      },
    ],
    reviews: [
      {
        restaurant: "The Gourmet Kitchen",
        review: "Excellent food and ambiance!",
        rating: 5,
      },
      {
        restaurant: "Pasta Paradise",
        review: "Good pasta, but the service was slow.",
        rating: 3,
      },
    ],
  });

  useEffect(() => {
    // You can fetch user data from an API here
    // For now, using static data in the state
  }, []);

  return (
    <div className="profile-page">
      <Navbar />
      <div className="min-h-full px-4 mx-4 pt-4">
        <div className="profile-header">
          <h1 className="text-3xl font-bold">Profile: {user.username}</h1>
          <p className="text-xl">Age: {user.age}</p>
          <p className="text-xl">Contact: {user.contactDetails}</p>
        </div>
        <div className="bookings-section mt-10">
          <h2 className="text-2xl font-semibold mb-3">Your Bookings:</h2>
          {user.bookings.length > 0 ? (
            <ul className="list-disc pl-5">
              {user.bookings.map((booking, index) => (
                <li key={index} className="mb-2">
                  <p>
                    <strong>Restaurant:</strong> {booking.restaurant}
                  </p>
                  <p>
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p>
                    <strong>Party Size:</strong> {booking.partySize}
                  </p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  <hr className="my-4" />
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no bookings yet.</p>
          )}
        </div>
        <div className="reviews-section mt-10">
          <h2 className="text-2xl font-semibold mb-3">Your Reviews:</h2>
          {user.reviews.length > 0 ? (
            <ul className="list-disc pl-5">
              {user.reviews.map((review, index) => (
                <li key={index} className="mb-2">
                  <p>
                    <strong>Restaurant:</strong> {review.restaurant}
                  </p>
                  <p>
                    <strong>Review:</strong> {review.review}
                  </p>
                  <p>
                    <strong>Rating:</strong> {review.rating} ⭐
                  </p>
                  <hr className="my-4" />
                </li>
              ))}
            </ul>
          ) : (
            <p>You have not written any reviews yet.</p>
          )}
        </div>
      </div>
      <Link
        to="/login"
        className="w-full text-center bg-sky-600 text-white py-2 px-4 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
        type="submit"
      >
        LogOut
      </Link>
      <Footer />
    </div>
  );
};

export default ProfilePage;
