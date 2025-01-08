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
        `http://localhost:10000/restaurants/${restaurantId}/review`,
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
        `Review submitted successfully! Check your profile to view or modify it, ${username}.`
      );

      // Reset form
      setFormData({ comments: "", photosLink: "", starRatings: "" });
    } catch (err) {
      console.error("Error creating review:", err);
      alert("Failed to submit the review. Please try again.");
    }
  };

  return (
    <div className="h-full font-serif">
      <Navbar />
      <div className="px-4 mx-4 pt-4">
        <h1 className="text-3xl font-bold mb-4">Make a Review</h1>

        {/* Show Username and Email */}
        <div className="flex items-center gap-2 pb-2">
          <span className="font-semibold text-xl">User Name:</span>
          <span className="text-xl font-medium">{username}</span>
        </div>
        <div className="flex items-center gap-2 pb-4">
          <span className="font-semibold text-xl">User Email:</span>
          <span className="text-xl font-medium">{email}</span>
        </div>

        {/* Restaurant Details */}
        <div className="mb-3">
          <h2 className="text-2xl font-semibold">Restaurant Details</h2>
          {restaurant.name ? (
            <>
              <p className="text-xl">{restaurant.name}</p>
              <p className="text-gray-600">{restaurant.cuisine}</p>
              <p className="text-xl">{restaurant.location}</p>
            </>
          ) : (
            <p className="text-red-500">Restaurant data not available.</p>
          )}
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="comments" className="block text-lg font-medium">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="border-2 p-2 w-full"
              required
              placeholder="The food was so delicious, and the service was excellent!"
            />
          </div>

          <div>
            <label htmlFor="photosLink" className="block text-lg font-medium">
              Photos Link
            </label>
            <input
              type="url"
              id="photosLink"
              name="photosLink"
              value={formData.photosLink}
              onChange={handleChange}
              className="border-2 p-2 w-full"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <label htmlFor="starRatings" className="block text-lg font-medium">
              Star Ratings:
            </label>
            <input
              type="number"
              id="starRatings"
              name="starRatings"
              value={formData.starRatings}
              onChange={handleChange}
              className="border-2 p-2 w-full"
              placeholder="1 (lowest) to 5 (highest)"
              required
              min="1"
              max="5"
            />
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="w-full bg-red-700 text-white px-3 py-2 rounded-xl hover:bg-red-800 hover:font-medium hover:border-2 hover:border-gray-500"
            >
              Create a Review
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewPage;
