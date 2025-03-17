import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import restaurantData from "./Restaurant.json";
import axios from "axios";

const ReviewPage = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState({
    name: "",
    cuisine: "",
    location: "",
  });
  const [formData, setFormData] = useState({
    comments: "",
    photosLink: "",
    starRatings: "",
  });

  // Fetch username and email from localStorage
  const username = localStorage.getItem("username") || "Guest";
  const email = localStorage.getItem("email") || "Not Provided";

  useEffect(() => {
    const foundRestaurant = restaurantData.find(
      (rst) => rst.id === parseInt(restaurantId, 10)
    );

    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    } else {
      console.error("Restaurant not found!");
    }
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://restaurant-reservation-backend-a4q3.onrender.com/restaurants/${restaurantId}/review`,
        {
          comments: formData.comments,
          photosLink: formData.photosLink,
          starRatings: formData.starRatings,
          restaurantId,
          username,
          email,
          restaurantName: restaurant.name,
          restaurantLocation: restaurant.location,
        },
        { withCredentials: true }
      );

      console.log("Review response:", response.data);
      alert(
        `Review submitted successfully! Check your profile to modify it, ${username}.`
      );

      // Reset form
      setFormData({ comments: "", photosLink: "", starRatings: "" });
    } catch (err) {
      console.error("Error creating review:", err);
      alert("Failed to submit the review. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pl-4 pr-4 sm:pl-6 sm:pr-4 md:pl-14 md:pr-14 lg:pl-14 lg:pr-14 py-10 mt-2 flex-grow">

        {/* Header */}
        <div className="flex flex-col mx-auto text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">💬 Make a Review</h1>
          <p className="text-base sm:text-lg italic mt-1">We value your feedback! Share your experience.</p>
        </div>

        {/* User Info */}
        <div className="space-y-2 mb-4">
          <p className="text-lg font-semibold">👤 Your Information</p>
          <div className="flex flex-wrap gap-3">
            <span className="font-medium">User Name: <span className="text-gray-700">{username}</span></span>
            <span className="font-medium">User Email: <span className="text-gray-700">{email}</span></span>
          </div>
        </div>

        {/* Restaurant Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">🍽️ Restaurant Details</h2>
          {restaurant.name ? (
            <div className="mt-1">
              <p className="text-lg font-semibold">{restaurant.name}</p>
              <p className="text-base text-gray-700">{restaurant.cuisine} | {restaurant.location}</p>
            </div>
          ) : (
            <p className="text-gray-700">Restaurant data not available.</p>
          )}
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Comments */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="comments" className="text-lg font-medium w-32">Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full md:w-72 border-2 rounded-lg p-2 min-h-[100px]"
              required
              placeholder="The food was so delicious, and the service was excellent!"
            />
          </div>

          {/* Photo Link */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="photosLink" className="text-lg font-medium w-32">Photo Link</label>
            <input
              type="url"
              id="photosLink"
              name="photosLink"
              value={formData.photosLink}
              onChange={handleChange}
              className="w-full border-2 rounded-lg p-2 md:w-72"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Star Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label htmlFor="starRatings" className="text-lg font-medium w-32">Star Rating</label>
            <input
              type="number"
              id="starRatings"
              name="starRatings"
              value={formData.starRatings}
              onChange={handleChange}
              className="w-full sm:w-40 border-2 rounded-lg p-2"
              placeholder="1 to 5"
              required
              min="1"
              max="5"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-pink-950 text-white px-8 py-2 rounded-xl hover:bg-pink-800 hover:scale-105 transition-all duration-300"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewPage;
